// Contient les fonctions qui gèrent l'état du jeu et les interactions avec l'interface utilisateur.
import { BlackjackGame } from './game.js';
import { Deck } from './deck.js';
import { createCardElement, displayMessage, updateControls, updateScoreDisplay } from './ui.js';

let game = null;

// Retourne l'objet game actuel
export function getGame() {
    return game;
}

/**
 * Met à jour l'interface utilisateur du jeu
 * @param {boolean} hideSecondDealerCard - Indique si la deuxième carte du croupier doit être cachée
 */
export function updateUI(hideSecondDealerCard = true) {
    const playerCardsEl = document.getElementById('player-cards');
    const dealerCardsEl = document.getElementById('dealer-cards');
    const playerScoreEl = document.getElementById('player-score');
    const dealerScoreEl = document.getElementById('dealer-score');
    
    // Met à jour les cartes du joueur
    playerCardsEl.innerHTML = game.playerHand.map(card => 
        createCardElement(card)
    ).join('');
    
    // Met à jour les cartes du croupier
    dealerCardsEl.innerHTML = game.dealerHand.map((card, index) => 
        index === 1 && hideSecondDealerCard && !game.gameOver ? 
            createCardElement(card, true) : 
            createCardElement(card)
    ).join('');
    
    // Calcule et affiche le score du joueur
    const playerScore = game.calculateScore(game.playerHand);
    // Calcule et affiche le score du croupier
    const dealerScore = hideSecondDealerCard && !game.gameOver ? 
        game.dealerHand[0].getScore() : 
        game.calculateScore(game.dealerHand);
    
    playerScoreEl.textContent = `Score: ${playerScore}`;
    dealerScoreEl.textContent = `Score: ${dealerScore}`;

    // Met à jour l'affichage des scores
    updateScoreDisplay(game.getScoreState());
}

// Démarre une nouvelle partie
export function startNewGame() {
    const currentScoring = game?.scoring || null;
    game = new BlackjackGame(updateUI, currentScoring);
    game.deck = new Deck();
    game.gameOver = false;
    game.dealInitialCards();
    updateControls(false);
    displayMessage('');
}

// Gère l'action "Stand" du joueur
export async function handleStand() {
    if (!game || game.gameOver) return;
    
    game.gameOver = true;
    updateControls(true);
    updateUI(false);
    
    await game.dealerPlay();
    
    const result = game.determineWinner();
    let message = '';

    // Affiche le message en fonction du résultat de la partie
    switch(result.winner) {
        case 'player':
            message = `Vous avez gagné ! (${result.points > 0 ? '+' : ''}${result.points} points)`;
            break;
        case 'dealer':
            message = `Le croupier gagne ! (${result.points} points)`;
            break;
        case 'tie':
            message = 'Égalité !';
            break;
    }

    if (result.globalPointEarned) {
        message += '\n🌟 Félicitations ! Vous avez gagné un point global !';
    }

    displayMessage(message);
    updateScoreDisplay(result.scoreState);
}

// Gère le stay du joueur
export function handleHit() {
    if (!game || game.gameOver) return;
    
    const result = game.playerHit();
    
    // Si le joueur dépasse 21, il perd
    if (result === 'bust') {
        game.gameOver = true;
        const finalResult = game.determineWinner();
        displayMessage(`Perdu ! Vous avez dépassé 21. (${finalResult.points} points)`);
        updateControls(true);
        updateUI(false);
        updateScoreDisplay(finalResult.scoreState);
    } else {
        updateUI();
    }
}