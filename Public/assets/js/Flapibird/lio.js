let move_speed = 5, gravity = 0.2; // Vitesse des pipes et gravité de l'oiseau
let bird = document.querySelector(".bird");
let img = document.getElementById("bird-1");
let sound_point = new Audio(""); 
let sound_die = new Audio("");

let bird_props = bird.getBoundingClientRect();
let background = document.querySelector(".background").getBoundingClientRect();

let score_val = document.querySelector(".score_val");
let message = document.querySelector(".message");
let score_title = document.querySelector(".score_title");

let game_state = "Start";
img.style.display = "none";
message.classList.add("messageStyle");

let pseudo = null;

// Gestion du formulaire de pseudo
document.getElementById("pseudoForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche le rechargement de la page

  // Récupérer le pseudo saisi
  pseudo = document.getElementById("playerPseudo").value.trim();

  if (pseudo) {
    // Masquer le formulaire modal
    document.getElementById("pseudoFormModal").style.display = "none";

    // Afficher la consigne pour démarrer le jeu
    message.innerText = "Appuyez sur Entrée pour démarrer";
  } else {
    alert("Veuillez entrer un pseudo valide.");
  }
});

// Vérifier que le pseudo est saisi avant de démarrer le jeu
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && pseudo && game_state !== "Play") {
    // Masquer la navbar et le footer
    document.getElementById("navbar").style.display = "none";
    document.getElementById("footer").style.display = "none";

    // Réinitialiser le jeu
    document.querySelectorAll(".pipe_sprite").forEach((e) => e.remove());

    img.style.display = "block";
    bird.style.top = "40vh";
    game_state = "Play";
    message.innerText = "";
    score_title.innerText = "Score : ";
    score_val.innerText = "0";
    message.classList.remove("messageStyle");

    play();
  }
});

// Fonction principale du jeu
function play() {
  function move() {
    if (game_state !== "Play") return;

    let pipe_sprite = document.querySelectorAll(".pipe_sprite");
    pipe_sprite.forEach((element) => {
      let pipe_sprite_props = element.getBoundingClientRect();
      bird_props = bird.getBoundingClientRect();

      if (pipe_sprite_props.right <= 0) {
        element.remove();
      } else {
        if (
          bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
          bird_props.left + bird_props.width > pipe_sprite_props.left &&
          bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
          bird_props.top + bird_props.height > pipe_sprite_props.top
        ) {
          game_state = "End";
          message.innerText = "Game Over\nPress Enter To Restart";
          message.classList.add("messageStyle");
          img.style.display = "none";
          sound_die.play();

          // Récupérer et envoyer le score
          let finalScore = parseInt(score_val.innerText, 10);
          console.log("Final Score:", finalScore);
          sendScoreToServer(finalScore, pseudo);

          return;
        } else {
          if (
            pipe_sprite_props.right < bird_props.left &&
            pipe_sprite_props.right + move_speed >= bird_props.left &&
            element.increase_score === "1"
          ) {
            score_val.innerText = +score_val.innerText + 1;
            sound_point.play();
          }
          element.style.left = pipe_sprite_props.left - move_speed + "px";
        }
      }
    });
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  let bird_dy = 0;
  function apply_gravity() {
    if (game_state !== "Play") return;
    bird_dy = bird_dy + gravity;
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp" || e.key === " ") {
        img.src = "/assets/images/Bird-2.png";
        bird_dy = -7.6;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp" || e.key === " ") {
        img.src = "/assets/images/Bird.png";
      }
    });

    if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
      game_state = "End";
      message.style.left = "28vw";
      window.location.reload();
      message.classList.remove("messageStyle");
      return;
    }
    bird.style.top = bird_props.top + bird_dy + "px";
    bird_props = bird.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);

  let pipe_seperation = 0;
  let pipe_gap = 45; // Espacement horizontal entre les pipes

  function create_pipe() {
    if (game_state !== "Play") return;

    if (pipe_seperation > 130) {
      pipe_seperation = 0;

      let pipe_posi = Math.floor(Math.random() * 43) + 8;

      // Pipe au plafond
      let pipe_sprite_inv = document.createElement("div");
      pipe_sprite_inv.className = "pipe_sprite";
      pipe_sprite_inv.style.top = pipe_posi - 70 + "vh";
      pipe_sprite_inv.style.left = "100vw";

      document.body.appendChild(pipe_sprite_inv);

      // Pipe au sol
      let pipe_sprite = document.createElement("div");
      pipe_sprite.className = "pipe_sprite";
      pipe_sprite.style.top = pipe_posi + pipe_gap + "vh";
      pipe_sprite.style.left = "100vw";
      pipe_sprite.increase_score = "1";

      document.body.appendChild(pipe_sprite);
    }
    pipe_seperation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}

// Fonction pour envoyer les données au serveur
function sendScoreToServer(score, pseudo) {
  // Créez un objet avec les données
  let data = {
    score: score,
    pseudo: pseudo,
  };


  fetch("/Lio/saveScore", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      console.log("Score enregistré avec succès :", result);
    })
    .catch((error) => {
      console.error("Erreur lors de l'enregistrement du score :", error);
    });
}