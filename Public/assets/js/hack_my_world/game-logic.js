// game-logic.js - Gestion de la logique du jeu

import { playErrorSound, playVictorySound } from './sounds.js';
import { updateMessage, updateScore } from './utils.js';
import { saveScoreToServer } from './scores.js';

let currentWord = "";
let discoveredLetters = [];
let errors = 0;
let score = 0;
const maxErrors = 6;

/**
 * Initialise le jeu avec un thème et un mot sélectionné.
 * @param {string} theme - Le nom du thème sélectionné.
 * @param {string} word - Le mot à deviner.
 */
export function initializeGame(theme, word) {
    currentWord = word;
    discoveredLetters = Array(word.length).fill(false);
    errors = 0;
    score = 0;

    updateScore(score);
    updateMessage(`Thème : ${theme}. Devinez le mot !`, "info");

    generateWordDisplay(word);
    generateAlphabetButtons();
    resetHourglass();
}

/**
 * Génère les cubes représentant les lettres du mot à deviner.
 * @param {string} word - Le mot à deviner.
 */
function generateWordDisplay(word) {
    const wordDisplay = document.getElementById("word-display");
    if (!wordDisplay) return;

    wordDisplay.innerHTML = "";
    word.split("").forEach((char, index) => {
        const cube = document.createElement("div");
        cube.className = "cube";
        cube.dataset.index = index;
        cube.innerHTML = `
            <div class="cube-inner">
                <div class="cube-front">_</div>
                <div class="cube-back">${char}</div>
            </div>`;
        wordDisplay.appendChild(cube);
    });
}

/**
 * Génère les boutons de l'alphabet.
 */
function generateAlphabetButtons() {
    const lettersContainer = document.querySelector(".letters");
    if (!lettersContainer) return;

    lettersContainer.innerHTML = "";

    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement("button");
        button.className = "letter-button";
        button.textContent = letter;

        button.addEventListener("click", () => handleLetterClick(letter, button));

        lettersContainer.appendChild(button);
    }
}

/**
 * Gère le clic sur une lettre.
 * @param {string} letter - La lettre sélectionnée.
 * @param {HTMLElement} button - Le bouton correspondant.
 */
export function handleLetterClick(letter, button) {
    button.disabled = true;
    button.classList.add("disabled");

    if (currentWord.includes(letter)) {
        revealLetter(letter);
        score += 10;
        updateScore(score);
        updateMessage(`Bonne réponse : ${letter} !`, "success");
    } else {
        errors++;
        playErrorSound();
        updateHourglass();
        updateMessage(`Mauvaise réponse : ${letter}.`, "error");
        if (errors >= maxErrors) handleEndGame(false);
    }

    if (isWordComplete()) handleEndGame(true);
}

/**
 * Révèle les lettres trouvées dans le mot.
 * @param {string} letter - La lettre correcte trouvée.
 */
function revealLetter(letter) {
    const cubes = document.querySelectorAll(".cube");

    currentWord.split("").forEach((char, index) => {
        if (char === letter) {
            discoveredLetters[index] = true;
            const cube = cubes[index];
            if (cube) cube.classList.add("flip");
        }
    });
}

/**
 * Vérifie si le mot est entièrement découvert.
 * @returns {boolean} - Retourne true si le mot est complet.
 */
function isWordComplete() {
    return discoveredLetters.every((letter) => letter);
}

/**
 * Gère la fin de partie (victoire ou défaite).
 * @param {boolean} isWin - Indique si le joueur a gagné.
 */
export function handleEndGame(isWin) {
    if (isWin) {
        playVictorySound();
        score += 50;
        saveScoreToServer(score, discoveredLetters.filter(Boolean).length);
        updateMessage(`Félicitations ! Vous avez trouvé le mot !`, "success");
    } else {
        updateMessage(`Dommage ! Le mot était : ${currentWord}.`, "error");
    }

    disableAllLetters();
}

/**
 * Désactive tous les boutons de lettres.
 */
function disableAllLetters() {
    const buttons = document.querySelectorAll(".letter-button");
    buttons.forEach((button) => {
        button.disabled = true;
        button.classList.add("disabled");
    });
}

/**
 * Réinitialise le sablier.
 */
function resetHourglass() {
    const hourglassFill = document.getElementById("hourglass-fill");
    if (hourglassFill) {
        hourglassFill.style.height = "0%";
        hourglassFill.style.backgroundColor = "#058682";
    }
}

/**
 * Met à jour le sablier en fonction du nombre d'erreurs.
 */
function updateHourglass() {
    const hourglassFill = document.getElementById("hourglass-fill");
    if (hourglassFill) {
        const fillHeight = (errors / maxErrors) * 100;
        hourglassFill.style.height = `${fillHeight}%`;

        if (errors >= maxErrors) {
            hourglassFill.style.backgroundColor = "#f44336";
        }
    }
}
