// main.js - Fichier principal

// Importation des fonctions nécessaires
import { initializeThemes, selectTheme } from './themes.js';
import { initializeGame, handleLetterClick, handleEndGame } from './game-logic.js';
import { setupSoundControls } from './sounds.js';
import { updateMessage } from './utils.js';

/**
 * Gère les événements pour les boutons de thèmes.
 */
function attachThemeButtonListeners() {
    const themeButtons = document.querySelectorAll("[data-theme-index]");
    if (!themeButtons.length) {
        console.error("Aucun bouton de thème détecté.");
        return;
    }

    console.log("Boutons des thèmes détectés :", themeButtons);

    themeButtons.forEach((themeButton) => {
        themeButton.addEventListener("click", () => {
            console.log("Bouton cliqué :", themeButton.textContent);
            const themeIndex = parseInt(themeButton.dataset.themeIndex, 10);
            selectTheme(themeIndex, (theme, word) => {
                console.log("Thème sélectionné :", theme, "Mot généré :", word);
                initializeGame(theme, word);
                updateMessage(`Thème sélectionné : ${theme}`, "info");
            });
        });
    });
}

/**
 * Initialise l'application.
 */
function initializeApp() {
    console.log("Hack My World - Initialisation...");

    // Initialisation des thèmes et attachement des événements
    initializeThemes(() => {
        attachThemeButtonListeners(); // Réattache les événements après la génération des boutons
    });

    // Configuration des contrôles de son
    setupSoundControls();

    // Gestion des lettres cliquées pendant le jeu
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("letter-button")) {
            const letter = event.target.textContent;
            handleLetterClick(letter, event.target, handleEndGame);
        }
    });

    // Vérification de la présence du bouton "Recommencer"
    const restartButton = document.getElementById("restart-btn");
    if (restartButton) {
        restartButton.addEventListener("click", () => {
            const restartChoice = confirm("Voulez-vous recommencer ou continuer avec un autre thème ?\nCliquez sur OK pour continuer ou Annuler pour recommencer.");
            if (restartChoice) {
                document.getElementById("themes-container").style.display = "flex"; // Affiche les thèmes
                initializeThemes(() => {
                    attachThemeButtonListeners(); // Réattache les événements pour les nouveaux boutons
                });
            } else {
                location.reload(); // Recharge la page pour recommencer
            }
        });
    } else {
        console.error("Le bouton 'Recommencer' est introuvable dans le DOM.");
    }
}

// Lorsque le DOM est chargé, on initialise l'application
document.addEventListener("DOMContentLoaded", initializeApp);
