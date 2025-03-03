import { ScoringSystem } from './scoring.js';

// Classe représentant une partie de Blackjack
export class BlackjackGame {
    constructor(updateUI, existingScoring = null) {
        this.deck = null; // Le paquet de cartes
        this.playerHand = []; // La main du joueur
        this.dealerHand = []; // La main du croupier
        this.updateUI = updateUI; // Fonction pour mettre à jour l'interface utilisateur
        this.gameOver = false; // Indicateur de fin de partie
        this.scoring = existingScoring || new ScoringSystem(); // Système de score
    }

    // Calculer le score d'une main
    calculateScore(hand) {
        let score = 0;
        let aces = 0;

        // Compter d'abord les cartes non-As
        for (const card of hand) {
            if (card.value === 1) {
                aces += 1;
            } else {
                score += card.getScore();
            }
        }

        // Ajouter les As en dernier pour optimiser leur valeur
        for (let i = 0; i < aces; i++) {
            if (score + 11 <= 21) {
                score += 11;
            } else {
                score += 1;
            }
        }

        return score;
    }

    // Distribuer les cartes initiales
    dealInitialCards() {
        this.playerHand = [this.deck.draw(), this.deck.draw()];
        this.dealerHand = [this.deck.draw(), this.deck.draw()];
        this.updateUI();
    }

    // Action du joueur pour tirer une carte
    playerHit() {
        if (this.gameOver) return;
        
        this.playerHand.push(this.deck.draw());
        const score = this.calculateScore(this.playerHand);
        
        if (score > 21) {
            return 'bust'; // Le joueur a dépassé 21
        }
        
        return 'continue'; // Le joueur peut continuer
    }

    // Action du croupier pour jouer
    async dealerPlay() {
        const playerScore = this.calculateScore(this.playerHand);
        let dealerScore = this.calculateScore(this.dealerHand);

        while (dealerScore < 21) {
            if (playerScore > 16) {
                if (dealerScore <= playerScore) {
                    this.dealerHand.push(this.deck.draw());
                    dealerScore = this.calculateScore(this.dealerHand);
                    this.updateUI();
                    await new Promise(resolve => setTimeout(resolve, 500));
                } else {
                    break;
                }
            } else if (dealerScore < 17) {
                this.dealerHand.push(this.deck.draw());
                dealerScore = this.calculateScore(this.dealerHand);
                this.updateUI();
                await new Promise(resolve => setTimeout(resolve, 500));
            } else {
                break;
            }

            if (dealerScore > 21) {
                break;
            }
        }
    }

    // Déterminer le gagnant de la partie
    determineWinner() {
        const playerScore = this.calculateScore(this.playerHand);
        const dealerScore = this.calculateScore(this.dealerHand);
        const isBlackjack = playerScore === 21 && this.playerHand.length === 2;

        // Calculer les points gagnés/perdus
        const points = this.scoring.calculatePoints(playerScore, dealerScore, this.playerHand, isBlackjack);
        
        // Mettre à jour la cagnotte et vérifier si un point global est gagné
        const globalPointEarned = this.scoring.updateScore(points);
        
        // Déterminer le gagnant
        let winner;
        if (playerScore > 21) winner = 'dealer';
        else if (dealerScore > 21) winner = 'player';
        else if (playerScore > dealerScore) winner = 'player';
        else if (dealerScore > playerScore) winner = 'dealer';
        else winner = 'tie';

        return {
            winner,
            points,
            globalPointEarned,
            scoreState: this.scoring.getScoreState()
        };
    }

    // Obtenir l'état actuel du score
    getScoreState() {
        return this.scoring.getScoreState();
    }
}