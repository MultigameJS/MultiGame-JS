const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startForm = document.getElementById("startForm");
const startGameButton = document.getElementById("startGameButton");
const playerNameInput = document.getElementById("playerName");

let playerName = ""; // Pseudo du joueur
let pipes = [];
let pipeWidth = 80;
let pipeGap = 350;
let pipeSpeed = 1.5;
let frame = 0;
let score = 0;
let gameOver = false;
let scoreSent = false; // Pour vérifier si le score a été envoyé

// Dimensions du canvas
canvas.width = 1000;
canvas.height = 800;

// Variables pour l'oiseau
const bird = {
    x: 50,
    y: canvas.height / 2,
    size: 20,
    gravity: 0.1,
    lift: -4,
    velocity: 0,
    maxVelocity: 4
};

// Gestion du formulaire de pseudo
startGameButton.addEventListener("click", () => {
    playerName = playerNameInput.value.trim();
    if (playerName === "") {
        alert("Veuillez entrer un pseudo !");
        return;
    }
    startForm.style.display = "none";
    canvas.style.display = "block";
    gameLoop();
});

// Gestion des touches pour faire voler l'oiseau ou redémarrer le jeu
document.addEventListener("keydown", () => {
    if (!gameOver) {
        bird.velocity = bird.lift;
    } else {
        resetGame(); // Réinitialiser le jeu après un Game Over
        gameLoop();  // Relancer la boucle de jeu
    }
});

// Dessiner l'oiseau
function drawBird() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.size, 0, Math.PI * 2);
    ctx.fill();
}

// Dessiner les tuyaux
function drawPipes() {
    ctx.fillStyle = "green";
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);
    });
}

// Mettre à jour les tuyaux
function updatePipes() {
    if (frame % 200 === 0) {
        const topHeight = Math.random() * (canvas.height - pipeGap - 50);
        pipes.push({ x: canvas.width, top: topHeight, scored: false });
    }

    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);

    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;

        // Détection de collision
        if (
            bird.x + bird.size > pipe.x &&
            bird.x - bird.size < pipe.x + pipeWidth &&
            (bird.y - bird.size < pipe.top || bird.y + bird.size > pipe.top + pipeGap)
        ) {
            gameOver = true;
        }

        // Ajouter un point si l'oiseau passe complètement le tuyau
        if (!pipe.scored && pipe.x + pipeWidth < bird.x) {
            score++;
            pipe.scored = true;
        }
    });
}

// Mettre à jour l'oiseau
function updateBird() {
    bird.velocity += bird.gravity;
    bird.velocity = Math.min(bird.velocity, bird.maxVelocity);
    bird.y += bird.velocity;

    if (bird.y + bird.size > canvas.height || bird.y - bird.size < 0) {
        gameOver = true;
    }
}

// Afficher le score et le pseudo
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Pseudo: ${playerName}`, 10, 20);
    ctx.fillText(`Score: ${score}`, 10, 50);
}

// Réinitialiser le jeu
function resetGame() {
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    frame = 0;
    gameOver = false;
    scoreSent = false; // Réinitialiser l'envoi du score
}

// Fonction pour enregistrer le score
function saveScore(pseudo, score) {
    fetch('/../Lio/saveScore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pseudo, score }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
        })
        .catch(error => console.error('Erreur lors de l\'enregistrement du score :', error));
}

// Boucle principale du jeu
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameOver) {
        // Afficher l'écran de fin
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 75, canvas.height / 2 - 20);
        ctx.fillText(`Score: ${score}`, canvas.width / 2 - 50, canvas.height / 2 + 20);
        ctx.fillText("Appuyez sur une touche pour rejouer", canvas.width / 2 - 150, canvas.height / 2 + 60);

        // Envoyer le score une seule fois
        if (!scoreSent) {
            saveScore(playerName, score); // Enregistrer le score
            scoreSent = true; // Marquer comme envoyé
        }

        return; // Arrêter la boucle de jeu
    }

    drawBird();
    drawPipes();
    drawScore();

    updateBird();
    updatePipes();

    frame++;
    requestAnimationFrame(gameLoop);
}