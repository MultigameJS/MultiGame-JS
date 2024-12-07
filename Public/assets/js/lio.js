const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ajuster la hauteur et la largeur du canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 1; // Limite la hauteur à 90% de la fenêtre

// Recalculer les dimensions lors du redimensionnement de la fenêtre
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.9;
});

// Images
const spaceshipImg = new Image();
spaceshipImg.src = "/assets/images/choong-deng-xiang-sjVcFSYK37E-unsplash-removebg-preview.png";

const enemyImg = new Image();
        enemyImg.src = "/assets/images/1242771-un-asteroide-illustration-removebg-preview.png";

// Système de mouvement fluide
const movement = {
    left: false,
    right: false,
    smoothness: 0.2, // Facteur de lissage
    currentSpeed: 0,
    maxSpeed: 7
};

const scoreElement = document.getElementById("score");
const gameOverElement = document.getElementById("game-over");
const levelElement = document.getElementById("level");

class Spaceship {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 120;
    }

    draw() {
        ctx.drawImage(spaceshipImg, this.x, this.y, this.width, this.height);
    }

    move() {
        // Gestion du mouvement horizontal ultra-lisse
        if (movement.left) {
            // Accélération progressive vers la gauche
            movement.currentSpeed = Math.max(
                -movement.maxSpeed,
                movement.currentSpeed - movement.smoothness
            );
        } else if (movement.right) {
            // Accélération progressive vers la droite
            movement.currentSpeed = Math.min(
                movement.maxSpeed,
                movement.currentSpeed + movement.smoothness
            );
        } else {
            // Ralentissement progressif quand aucune touche n'est pressée
            movement.currentSpeed *= 0.9;
        }

        // Mise à jour de la position
        this.x += movement.currentSpeed;

        // Limiter les mouvements dans les limites du canvas
        this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
    }
}

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 10;
        this.color = "red";
        this.speed = -5;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
    }

    isOutOfBounds() {
        return this.y < 0;
    }
}

class Enemy {
    constructor(x, y, speed, imgSrc) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.image = new Image;
        this.image.src = imgSrc || "/assets/images/1242771-un-asteroide-illustration-removebg-preview.png";
        this.speed = speed || 2;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
    }

    isOutOfBounds() {
        return this.y > canvas.height;
    }
}

let spaceship, bullets = [], enemies = [];
let score = 0, gameOver = false, level = 1;
let enemySpawnInterval, enemySpawnRate = 1000;

// Initialisation du jeu
function init() {
    spaceship = new Spaceship(canvas.width / 2 - 40, canvas.height - 120);
    bullets = [];
    enemies = [];
    score = 0;
    gameOver = false;
    level = 1;
    movement.currentSpeed = 0;

    scoreElement.textContent = "Score: 0";
    levelElement.textContent = "Level: 1";
    gameOverElement.style.display = "none";

    // Réinitialiser le taux de génération des ennemis
    if (enemySpawnInterval) clearInterval(enemySpawnInterval);
    enemySpawnRate = 1000;

    // Génération des ennemis
    enemySpawnInterval = setInterval(spawnEnemy, enemySpawnRate);

    animate();
}

// Fonction pour générer des ennemis
function spawnEnemy() {
    if (!gameOver) {
        const x = Math.random() * (canvas.width - 40);

        let imgSrc = "/assets/images/1242771-un-asteroide-illustration-removebg-preview.png"; // Par défaut pour le niveau 1

        if (level === 2) {
            const images = [
                "/assets/images/1242771-un-asteroide-illustration-removebg-preview.png",
                "/assets/images/nasa-N3BQHYOVq5E-unsplash-removebg-preview.png"
            ];
            imgSrc = images[Math.floor(Math.random() * images.length)];
        } else if (level >= 3) {
            const images = [
                "/assets/images/1242771-un-asteroide-illustration-removebg-preview.png",
                "/assets/images/nasa-ScBkW9AKgcA-unsplash-removebg-preview.png",
                "/assets/images/nasa-N3BQHYOVq5E-unsplash-removebg-preview.png"
            ];
            imgSrc = images[Math.floor(Math.random() * images.length)];
        }

        const speed = Math.random() * 2 + level; // Ennemis plus rapides selon le niveau
        enemies.push(new Enemy(x, -40, speed, imgSrc));
    }
}

// Gérer les collisions
function detectCollisions() {
    enemies.forEach((enemy, enemyIndex) => {
        // Collision avec le vaisseau
        if (
            spaceship.x < enemy.x + enemy.width &&
            spaceship.x + spaceship.width > enemy.x &&
            spaceship.y < enemy.y + enemy.height &&
            spaceship.y + spaceship.height > enemy.y
        ) {
            endGame();
        }

        // Collision avec les balles
        bullets.forEach((bullet, bulletIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                // Supprimer l'ennemi et la balle
                enemies.splice(enemyIndex, 1);
                bullets.splice(bulletIndex, 1);
                score++;
                scoreElement.textContent = `Score: ${score}`;

                // Système de niveaux
                checkLevelProgression();
            }
        });
    });
}

// Vérifier et mettre à jour le niveau
function checkLevelProgression() {
    if (score >= 20 && level === 1) {
        level = 2;
        levelElement.textContent = `Level: ${level}`;

        // Accélérer la génération des ennemis
        clearInterval(enemySpawnInterval);
        enemySpawnRate = 800;
        enemySpawnInterval = setInterval(spawnEnemy, enemySpawnRate);

        // Effet visuel ou sonore pour le passage de niveau
        flashScreen("blue");
    } else if (score >= 40 && level === 2) {
        level = 3;
        levelElement.textContent = `Level: ${level}`;

        // Encore accélérer la génération des ennemis
        clearInterval(enemySpawnInterval);
        enemySpawnRate = 600;
        enemySpawnInterval = setInterval(spawnEnemy, enemySpawnRate);

        // Effet visuel ou sonore pour le passage de niveau
        flashScreen("green");
    }
}

// Effet de flash à l'écran
function flashScreen(color) {
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
}

// Fin du jeu
function endGame() {
    gameOver = true;
    gameOverElement.style.display = "block";
    clearInterval(enemySpawnInterval);
}

// Boucle principale
function animate() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Déplacement de la fusée
    spaceship.move();
    spaceship.draw();

    bullets.forEach((bullet, index) => {
        bullet.update();
        bullet.draw();
        if (bullet.isOutOfBounds()) {
            bullets.splice(index, 1);
        }
    });

    enemies.forEach((enemy, index) => {
        enemy.update();
        enemy.draw();
        if (enemy.isOutOfBounds()) {
            enemies.splice(index, 1);
        }
    });

    detectCollisions();

    requestAnimationFrame(animate);
}

// Contrôles
window.addEventListener("keydown", (e) => {
    if (gameOver) return;

    switch(e.key) {
        case "ArrowLeft":
            movement.left = true;
            movement.right = false;
            break;
        case "ArrowRight":
            movement.right = true;
            movement.left = false;
            break;
        case " ":
            bullets.push(new Bullet(spaceship.x + spaceship.width / 2 - 2.5, spaceship.y));
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch(e.key) {
        case "ArrowLeft":
            movement.left = false;
            break;
        case "ArrowRight":
            movement.right = false;
            break;
    }
});

window.addEventListener("click", () => {
    if (gameOver) {
        init();
    }
});

// Charger l'image avant d'initialiser
spaceshipImg.onload = () => {
    init();
};