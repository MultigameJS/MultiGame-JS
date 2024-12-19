// Fichier principal: main.js
// Ce fichier coordonne tous les modules pour initialiser et gérer le jeu.

// Importation des modules nécessaires
import { initializeThemes, setupRestartButton } from "./game-init.js"; // Gère les thèmes et le redémarrage
import { initializeGame, handleLetterClick } from "./game-logic.js"; // Logique principale du jeu
import { updateMessage, updateScore } from "./game-utils.js"; // Utilitaires pour les messages et le score
import { updateVolume, stopAllSounds } from "./game-sounds.js"; // Gestion des sons
import { saveScoreToServer, getBestScore } from "./game-server.js"; // Interaction avec le serveur

// Variables globales
let currentWord = ""; // Le mot actuellement sélectionné
let currentTheme = ""; // Le thème actuellement sélectionné

// Fonction principale pour initialiser l'application
function initializeApp() {
    console.log("Hack My World - Chargement...");

    // Étape 1 : Afficher les thèmes et gérer la sélection
    // initializeThemes charge les thèmes et appelle un callback lorsque l'utilisateur sélectionne un thème
    initializeThemes((selectedTheme) => {
        currentTheme = selectedTheme.name; // Enregistre le nom du thème
        currentWord = selectedTheme.words[Math.floor(Math.random() * selectedTheme.words.length)].toUpperCase(); // Sélectionne un mot aléatoire en majuscules

        // Cache les boutons de sélection des thèmes et démarre le jeu
        document.getElementById("themes-container").style.display = "none";
        initializeGame(currentWord); // Initialise le jeu avec le mot sélectionné

        // Mise à jour de l'interface utilisateur
        updateMessage(`Thème : ${currentTheme}. Choisissez une lettre !`, "info");
        updateScore(0); // Réinitialise le score à zéro
    });

    // Étape 2 : Configurer le bouton "Recommencer"
    setupRestartButton(() => {
        document.getElementById("themes-container").style.display = "flex"; // Réaffiche les thèmes
        initializeThemes((selectedTheme) => {
            currentTheme = selectedTheme.name; // Re-sélection d'un thème
            currentWord = selectedTheme.words[Math.floor(Math.random() * selectedTheme.words.length)].toUpperCase(); // Nouveau mot

            // Cache les thèmes et redémarre le jeu
            document.getElementById("themes-container").style.display = "none";
            initializeGame(currentWord);
            updateMessage(`Thème : ${currentTheme}. Choisissez une lettre !`, "info");
            updateScore(0);
        });
    });

    // Étape 3 : Gestion des clics sur les lettres du clavier
    // Lorsqu'un bouton de lettre est cliqué, on appelle handleLetterClick
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("letter-button")) {
            const letter = event.target.textContent; // Récupère la lettre cliquée
            handleLetterClick(letter, event.target); // Gère la logique associée à cette lettre
        }
    });

    // Étape 4 : Configuration du contrôle du volume
    const volumeControl = document.getElementById("volume-control"); // Slider pour ajuster le volume
    const muteToggle = document.getElementById("mute-toggle"); // Bouton pour couper le son

    // Gestion du slider de volume
    volumeControl?.addEventListener("input", (e) => updateVolume(parseFloat(e.target.value))); // Met à jour le volume en fonction de la valeur du slider

    // Gestion du bouton muet
    muteToggle?.addEventListener("click", () => {
        stopAllSounds(); // Arrête tous les sons en cours
        updateVolume(0); // Réinitialise le volume à zéro
        muteToggle.textContent = "🔇"; // Met à jour l'icône du bouton
    });

    // Étape 5 : Affichage du message de bienvenue
    updateMessage("Bienvenue dans Hack My World ! Sélectionnez un thème pour commencer.", "info");

    // Étape 6 : Récupérer et afficher le meilleur score
    getBestScore().then((bestScore) => {
        if (bestScore) {
            console.log(`Meilleur score : ${bestScore.score}, Streak : ${bestScore.streak}`);
            updateMessage(`Meilleur score : ${bestScore.score} | Série : ${bestScore.streak}`, "info");
        }
    });
}

// Lors de la fin de partie, sauvegarde le score
function handleEndGame(isWin) {
    if (isWin) {
        saveScoreToServer(score, streak); // Sauvegarde le score et la série sur le serveur
        updateMessage(`Félicitations ! Votre score (${score}) a été enregistré.`, "success");
    } else {
        updateMessage(`Dommage ! Le mot était : ${currentWord}.`, "error");
    }
}

// Lorsque le DOM est chargé, on initialise l'application
document.addEventListener("DOMContentLoaded", initializeApp);