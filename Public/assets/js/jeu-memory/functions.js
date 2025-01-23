// functions.js
import { submitScore } from './script.js'; 

// Variables globales
export let selectedTheme, selectedLevel, cardsChosen = [], cardsChosenId = [], cardsWon = [], score = 0, gameOver = false, timer;

// Fonction de mélange (shuffle)
export const shuffle = array => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

// Mise à jour du score
export const updateScore = () => document.getElementById('scoreBoard').innerText = `Score : ${score}`;


// Mise à jour du chronomètre
export const updateTimer = countdown => {
    document.getElementById('timer').innerText = countdown !== null ? `Temps restant: ${countdown}` : '';
};

// Sélectionner et appliquer un thème
export const setTheme = (theme, themes) => {
    selectedTheme = themes[theme];
    createBoard();
};

// Sélectionner le niveau de difficulté
export const selectLevel = level => {
    selectedLevel = level;
    document.getElementById('startButtonContainer').style.display = 'flex'; // Afficher le bouton Start
};

// Créer le plateau de jeu
export const createBoard = () => {
    if (!selectedTheme?.length) {
        console.error('Le thème sélectionné n\'est pas défini ou est vide.');
        return;
    }

    const gameBoard = document.querySelector('.memory-game');
    gameBoard.innerHTML = '';

    // Déterminer le nombre de colonnes en fonction du nombre de cartes
    const columns = selectedTheme.length === 6 ? 6 : Math.ceil(Math.sqrt(selectedTheme.length * 2));
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 100px)`;  // Ajuster la grille

    // Créer les cartes
    shuffle([...selectedTheme, ...selectedTheme]).forEach((item, index) => {
        const card = document.createElement('img');
        card.src = '/assets/js/jeu-memory/images/Logo.jpg'; // Image de l'arrière des cartes
        card.dataset.id = index.toString();
        card.dataset.name = item.name;
        card.dataset.img = item.img;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
};

// Retourner la carte
export const flipCard = function () {
    if (gameOver) return;  // Si le jeu est terminé, ne pas permettre de retourner les cartes
    
    const cardId = this.dataset.id;
    if (cardsChosenId.includes(cardId) || cardsChosenId.length === 2) return;

    cardsChosen.push(this.dataset.name);
    cardsChosenId.push(cardId);
    this.src = this.dataset.img; // Afficher l'image de la carte retournée

    if (cardsChosen.length === 2) setTimeout(checkForMatch, 200); // Vérifier la correspondance après un délai
};

// Vérifier si les cartes retournées correspondent
export const checkForMatch = () => {
    if (gameOver) return;  // Si le jeu est terminé, ne pas vérifier la correspondance

    const cards = document.querySelectorAll('.memory-game img');
    const [cardOne, cardTwo] = [cards[cardsChosenId[0]], cards[cardsChosenId[1]]];

    // Vérifier si les cartes correspondent
    if (cardsChosen[0] === cardsChosen[1]) {
        [cardOne, cardTwo].forEach(card => card.removeEventListener('click', flipCard)); // Désactiver le clic sur les cartes correspondantes
        cardsWon.push([...cardsChosen]);

        // Ne pas ajouter de points si le jeu est terminé
        if (!gameOver) {
            score += 10;  // Ajouter 10 points pour une paire correcte
        }
    } else {
        setTimeout(() => {
            [cardOne, cardTwo].forEach(card => card.src = '/assets/js/jeu-memory/images/Logo.jpg'); // Retourner les cartes
        }, 200);
    }

    updateScore(score);  // Mettre à jour l'affichage du score
    cardsChosen = [];
    cardsChosenId = [];

    // Vérifier si le jeu est terminé
    if (cardsWon.length === selectedTheme.length) {
        clearInterval(timer);  // Arrêter le chronomètre
        setTimeout(() => {
            alert(`Félicitations, vous avez terminé le jeu ! Votre score est ${score}`);
            submitScore(score);  // Envoi du score à la fin du jeu
        }, 500);
    }
};

// Gérer le timer
export const startTimer = (initialTime) => {
    let countdown = initialTime; // Le temps initial
    updateTimer(countdown); // Mettre à jour l'affichage du timer

    timer = setInterval(() => {
        countdown--;  // Décrémenter le temps
        updateTimer(countdown);  // Mettre à jour l'affichage du timer
        if (countdown <= 0) {
            clearInterval(timer);  // Arrêter le timer
            gameOver = true;  // Marquer le jeu comme terminé
            updateTimer(0);  // Afficher le 0 final
            alert('Dommage, le temps s\'est écoulé. Réessayez!');
            submitScore(score);  // Envoi du score à la fin du jeu
        }
    }, 1000);
};

// Réinitialiser l'interface utilisateur
export const resetUI = () => {
    score = 0;
    gameOver = false;  // Réinitialiser l'état du jeu
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    updateScore(score);  // Réinitialiser l'affichage du score
    updateTimer('');  // Réinitialiser l'affichage du chronomètre
    clearInterval(timer);  // Arrêter le chronomètre
};

