// Ce fichier contient la logique principale du jeu (gestion des lettres, conditions de victoire, etc.).

// Variables globales pour gérer l'état du jeu
let currentWord = ""; // Mot à deviner
let score = 0; // Score actuel du joueur
let streak = 0; // Série actuelle de mots trouvés à la suite
let errors = 0; // Nombre d'erreurs actuelles
const maxErrors = 6; // Nombre maximal d'erreurs autorisées

/**
 * Initialise une nouvelle partie avec le mot donné.
 * @param {string} word - Le mot à deviner.
 */
export function initializeGame(word) {
    currentWord = word; // Définit le mot actuel
    resetGame(); // Réinitialise les compteurs et visuels
    generateWordCubes(word); // Génère les cubes pour le mot
    generateAlphabetButtons(); // Génère les boutons pour les lettres
    updateScore(0); // Réinitialise le score
    updateMessage(`Le jeu commence ! Mot à deviner dans le thème sélectionné.`, "info");
}

/**
 * Réinitialise le jeu pour une nouvelle partie.
 */
function resetGame() {
    score = 0; // Remet le score à zéro
    streak = 0; // Réinitialise la série
    errors = 0; // Réinitialise les erreurs
    resetHourglass(); // Réinitialise l'état du sablier
    resetEndGameDisplay(); // Réinitialise l'affichage de fin de partie
}

/**
 * Réinitialise l'affichage du sablier.
 */
export function resetHourglass() {
    const hourglassFill = document.getElementById("hourglass-fill");
    if (hourglassFill) {
        hourglassFill.style.height = "0%"; // Vide le sablier
        hourglassFill.style.backgroundColor = "#058682"; // Couleur initiale
    }
}

/**
 * Réinitialise l'affichage de fin de partie (image de victoire ou défaite).
 */
export function resetEndGameDisplay() {
    const endGameImage = document.getElementById("endgame-image");
    if (endGameImage) {
        endGameImage.src = ""; // Vide l'image
        endGameImage.style.display = "none"; // Cache l'image
    }
}

/**
 * Génère les cubes représentant les lettres du mot à deviner.
 * @param {string} word - Le mot à deviner.
 */
function generateWordCubes(word) {
    const wordDisplay = document.getElementById("word-display");
    if (wordDisplay) {
        wordDisplay.innerHTML = ""; // Vide l'affichage actuel

        word.split("").forEach((char, index) => {
            const cube = document.createElement("div");
            cube.classList.add("cube");
            cube.dataset.index = index;

            const cubeInner = document.createElement("div");
            cubeInner.classList.add("cube-inner");

            const front = document.createElement("div");
            front.classList.add("cube-front");
            front.textContent = "_"; // Placeholder pour les lettres

            const back = document.createElement("div");
            back.classList.add("cube-back");
            back.textContent = char.toUpperCase(); // Lettre réelle

            cubeInner.appendChild(front);
            cubeInner.appendChild(back);
            cube.appendChild(cubeInner);
            wordDisplay.appendChild(cube); // Ajoute le cube au conteneur
        });
    }
}

/**
 * Génère les boutons de l'alphabet pour que le joueur puisse sélectionner une lettre.
 */
function generateAlphabetButtons() {
    const container = document.querySelector(".letters");
    if (container) {
        container.innerHTML = ""; // Vide les boutons actuels

        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i); // Convertit le code ASCII en lettre
            const button = document.createElement("button");
            button.textContent = letter;
            button.className = "letter-button";

            // Ajoute un gestionnaire de clic pour chaque bouton
            button.addEventListener("click", () => handleLetterClick(letter, button));
            container.appendChild(button);
        }
    }
}

/**
 * Gère le clic sur une lettre.
 * @param {string} letter - La lettre cliquée.
 * @param {HTMLButtonElement} button - Le bouton cliqué.
 */
export function handleLetterClick(letter, button) {
    if (!currentWord) return; // Vérifie que le mot est défini

    button.disabled = true; // Désactive le bouton pour éviter plusieurs clics

    if (currentWord.includes(letter)) {
        revealLetterInWord(letter); // Révèle la lettre dans le mot
        score += 10; // Ajoute des points pour une lettre correcte
        updateScore(score);
        updateMessage(`Bien joué ! La lettre '${letter}' est correcte.`, "success");
    } else {
        errors += 1; // Incrémente les erreurs
        updateHourglass(); // Met à jour l'affichage du sablier
        score = Math.max(0, score - 5); // Réduit le score (minimum 0)
        updateScore(score);
        updateMessage(`Oups ! La lettre '${letter}' est incorrecte.`, "error");
    }

    // Vérifie les conditions de fin de partie
    if (isWordComplete()) {
        endGame(true);
    } else if (errors >= maxErrors) {
        endGame(false);
    }
}

/**
 * Révèle les occurrences d'une lettre correcte dans le mot.
 * @param {string} letter - La lettre correcte.
 */
function revealLetterInWord(letter) {
    const cubes = document.querySelectorAll(".cube");
    currentWord.split("").forEach((char, index) => {
        if (char === letter) {
            const cube = cubes[index];
            if (cube) cube.classList.add("flip"); // Applique l'effet de retournement
        }
    });
}

/**
 * Vérifie si toutes les lettres du mot ont été découvertes.
 * @returns {boolean} - True si le mot est complété, sinon False.
 */
function isWordComplete() {
    const cubes = document.querySelectorAll(".cube");
    return Array.from(cubes).every((cube) => cube.classList.contains("flip"));
}

/**
 * Gère la fin de la partie.
 * @param {boolean} isWin - True si le joueur a gagné, sinon False.
 */
function endGame(isWin) {
    if (isWin) {
        streak += 1; // Incrémente la série en cas de victoire
        score += 50; // Bonus de victoire
        updateMessage(`Félicitations ! Vous avez trouvé le mot. Série : ${streak}.`, "success");
    } else {
        updateMessage(`Dommage ! Le mot était : ${currentWord}.`, "error");
    }

    disableAllLetters(); // Désactive tous les boutons des lettres
}

/**
 * Désactive tous les boutons de lettres après la fin de la partie.
 */
export function disableAllLetters() {
    const buttons = document.querySelectorAll(".letter-button");
    buttons.forEach((button) => {
        button.disabled = true;
        button.classList.add("disabled");
    });
}