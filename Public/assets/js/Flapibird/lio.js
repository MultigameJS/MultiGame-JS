document.addEventListener("DOMContentLoaded", () => {
  // Récupération des données de session pour l'utilisateur et le jeton CSRF
  const userId = document.getElementById("id")?.textContent.trim();
  const csrfToken = document.getElementById("csrf")?.textContent.trim();


  let move_speed = 5, gravity = 0.2; // Vitesse de déplacement des tuyaux et gravité pour l'oiseau
  let bird = document.querySelector(".bird");
  let img = document.getElementById("bird-1");

  // Récupération des dimensions de l'oiseau et de l'arrière-plan
  let bird_props = bird.getBoundingClientRect();
  let background = document.querySelector(".background").getBoundingClientRect();

  // Références aux éléments d'affichage des scores et des messages
  let score_val = document.querySelector(".score_val");
  let message = document.querySelector(".message");
  let score_title = document.querySelector(".score_title");

  // Identification des éléments de la navbar et du footer
  const navbar = document.getElementById("navbar");
  const footer = document.getElementById("footer");

  let game_state = "Start";
  img.style.display = "none";
  message.classList.add("messageStyle");

  // Écouter les touches pour démarrer le jeu
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && game_state === "Start") {
      startGame();
    }
  });

  // Démarrage du jeux
  function startGame() {
    game_state = "Play";
    message.innerText = "";
    score_title.innerText = "Score : ";
    score_val.innerText = "0";
    message.classList.remove("messageStyle");

    // Masquage de la navbar et le footer pendant le jeu
    if (navbar) navbar.style.display = "none";
    if (footer) footer.style.display = "none";

    // Réinitialiser les tuyaux et positionner l'oiseau
    document.querySelectorAll(".pipe_sprite").forEach((e) => e.remove());
    bird.style.top = "50vh";
    img.style.display = "block";

    play();
  }


  function play() {

    function move() {
      if (game_state !== "Play") return;

      let pipe_sprite = document.querySelectorAll(".pipe_sprite");
      pipe_sprite.forEach((element) => {
        let pipe_sprite_props = element.getBoundingClientRect();
        bird_props = bird.getBoundingClientRect();

        // Supprimer les tuyaux hors écran
        if (pipe_sprite_props.right <= 0) {
          element.remove();
        } else {
          // Vérifier les collisions entre l'oiseau et les tuyaux
          if (
            bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
            bird_props.left + bird_props.width > pipe_sprite_props.left &&
            bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
            bird_props.top + bird_props.height > pipe_sprite_props.top
          ) {
            endGame(); // Terminer le jeu en cas de collision
            return;
          } else {
            // Incrémenter le score si l'oiseau passe un tuyau
            if (
              pipe_sprite_props.right < bird_props.left &&
              pipe_sprite_props.right + move_speed >= bird_props.left &&
              element.increase_score === "1"
            ) {
              score_val.innerText = +score_val.innerText + 1;
            }
            element.style.left = pipe_sprite_props.left - move_speed + "px";
          }
        }
      });
      requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bird_dy = 0;

    // Appliquer la gravité et gérer les sauts
    function apply_gravity() {
      if (game_state !== "Play") return;
      bird_dy += gravity;
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

      // Terminer le jeu si l'oiseau touche le haut ou le bas
      if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
        endGame();
        return;
      }
      bird.style.top = bird_props.top + bird_dy + "px";
      bird_props = bird.getBoundingClientRect();
      requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_separation = 0;
    let pipe_gap = 45; // Espacement vertical entre les tuyaux

    // Créer de nouveaux tuyaux
    function create_pipe() {
      if (game_state !== "Play") return;

      if (pipe_separation > 130) {
        pipe_separation = 0;

        let pipe_posi = Math.floor(Math.random() * 43) + 8;

        // Tuyau supérieur
        let pipe_sprite_inv = document.createElement("div");
        pipe_sprite_inv.className = "pipe_sprite";
        pipe_sprite_inv.style.top = pipe_posi - 70 + "vh";
        pipe_sprite_inv.style.left = "100vw";

        document.body.appendChild(pipe_sprite_inv);

        // Tuyau inférieur
        let pipe_sprite = document.createElement("div");
        pipe_sprite.className = "pipe_sprite";
        pipe_sprite.style.top = pipe_posi + pipe_gap + "vh";
        pipe_sprite.style.left = "100vw";
        pipe_sprite.increase_score = "1";

        document.body.appendChild(pipe_sprite);
      }
      pipe_separation++;
      requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
  }

  // Fonction pour terminer le jeu
  function endGame() {
    game_state = "End";
    message.innerText = "Game Over\nPress Enter To Restart";
    message.classList.add("messageStyle");
    img.style.display = "none";

    const finalScore = parseInt(score_val.innerText, 10);
    sendScoreToServer(finalScore);

    // Réinitialiser le jeu lorsqu'on appuie sur "Entrée"
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        window.location.reload();
      }
    });
  }


  function sendScoreToServer(score) {
    if (!userId || !csrfToken) {
      console.error("Données de session manquantes.");
      return;
    }

    const data = {
      id_user: userId,
      score: score,
      csrf_token: csrfToken,
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
});