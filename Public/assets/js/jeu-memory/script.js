// script.js
import { setTheme, selectLevel, createBoard, updateTimer, resetUI, startTimer, selectedLevel } from './functions.js';

// Fonction pour démarrer le jeu
const startGame = () => {
    resetUI();  // Réinitialiser le jeu
    createBoard();  // Créer le plateau de jeu

    // Définir le temps de chaque niveau
    const countdowns = {
        'easy': 60,
        'medium': 45,
        'hard': 30
    };

    const localCountdown = countdowns[selectedLevel];  // Récupérer le temps en fonction du niveau
    startTimer(localCountdown);  // Utiliser startTimer pour démarrer le chronomètre
};

// Fonction pour envoyer le score avec le token CSRF
export const submitScore = (score) => {
    const csrfToken = document.getElementById('csrfToken')?.value;
    if (!csrfToken) return console.error('Le jeton CSRF est manquant.');

    const scoreData = { score };

    fetch('/Memory/submitScore', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(scoreData)
    })
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            console.log(data);  // Affiche la réponse du serveur
        } catch (error) {
            console.error('Erreur lors de l\'analyse JSON:', error);
        }
    })
    .catch(error => console.error('Erreur:', error));
};

// Exemple de la fonction pour commencer le jeu
document.addEventListener('DOMContentLoaded', () => {
    fetch('/assets/js/jeu-memory/themes.json')
        .then(response => response.json())
        .then(data => {
            window.themes = data;

            const themeButtons = document.querySelectorAll('.btn-theme');
            const easyBtn = document.querySelector('.btn-easy');
            const mediumBtn = document.querySelector('.btn-medium');
            const hardBtn = document.querySelector('.btn-hard');
            const startBtn = document.getElementById('startButton');
            const closeBtnEvent = document.querySelector('.close-event');
            const closeBtnRules = document.querySelector('.close-rules');
            const rulesBtn = document.getElementById('rulesButton');

            // Associer un thème à chaque bouton
            themeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const themeName = button.getAttribute('data-theme');
                    setTheme(themeName, window.themes);  // Appliquer le thème choisi
                });
            });

            // Sélectionner le niveau de difficulté
            easyBtn.addEventListener('click', () => selectLevel('easy'));
            mediumBtn.addEventListener('click', () => selectLevel('medium'));
            hardBtn.addEventListener('click', () => selectLevel('hard'));

            // Démarrer le jeu lorsqu'on clique sur le bouton Start
            startBtn.addEventListener('click', () => {
                startGame();
            });

            // Fermer la modal de l'événement
            if (closeBtnEvent) {
                closeBtnEvent.addEventListener('click', () => {
                    const eventModal = document.getElementById('eventModal');
                    if (eventModal) {
                        eventModal.style.display = 'none';
                    }
                });
            }

            // Fermer la modal des règles
            if (closeBtnRules) {
                closeBtnRules.addEventListener('click', () => {
                    const rulesModal = document.getElementById('rulesModal');
                    if (rulesModal) {
                        rulesModal.style.display = 'none';
                    }
                });
            }

            // Afficher les règles
            rulesBtn.addEventListener('click', () => {
                const rulesModal = document.getElementById('rulesModal');
                if (rulesModal) {
                    rulesModal.style.display = 'block';
                }
            });

            // Script pour gérer le menu déroulant des scores
            const dropdownBtn = document.querySelector('.dropdown-btn');
            const scoreList = document.querySelector('.score-list');

            dropdownBtn.addEventListener('click', function() {
            // Afficher ou cacher la liste de scores
                scoreList.style.display = (scoreList.style.display === 'none' || scoreList.style.display === '') ? 'block' : 'none';
            });
        })
        .catch(error => console.error('Erreur lors du chargement des thèmes :', error));
});
