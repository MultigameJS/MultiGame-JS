// Gestion du système de points et de la cagnotte
export class ScoringSystem {
    constructor() {
        this.wallet = 30; // Cagnotte de départ
        this.globalPoints = 0; // Points globaux
        this.TARGET_WALLET = 100; // Objectif de cagnotte pour gagner un point global
        this.STARTING_WALLET = 20; // Montant initial de la cagnotte
        this.MIN_WALLET = 0; // Montant minimum avant réinitialisation
    }

    // Calcule les points gagnés/perdus pour une manche
    calculatePoints(playerScore, dealerScore, playerCards, isBlackjack) {
        if (playerScore > 21) {
            return -15; // Défaite par dépassement
        }

        if (isBlackjack && playerCards.length === 2) {
            return 30; // Blackjack naturel
        }

        if (dealerScore > 21 || playerScore > dealerScore) {
            // Bonus de risque pour avoir tiré avec 15 ou plus
            const riskBonus = (playerScore >= 15 && playerCards.length > 2) ? 5 : 0;
            return 15 + riskBonus;
        }

        if (playerScore === dealerScore) {
            return 0; // Égalité
        }

        return -10; // Défaite normale
    }

    // Met à jour la cagnotte et les points globaux
    updateScore(points) {
        this.wallet += points;
        
        // Vérifie si le joueur a atteint l'objectif
        if (this.wallet >= this.TARGET_WALLET) {
            this.globalPoints += 1;
            this.wallet = this.STARTING_WALLET;
            return true; // Indique qu'un point global a été gagné
        }

        // Si la cagnotte descend trop bas, on la réinitialise
        if (this.wallet <= this.MIN_WALLET) {
            this.wallet = this.STARTING_WALLET;
        }

        return false;
    }

    // Retourne l'état actuel des scores
    getScoreState() {
        return {
            wallet: this.wallet,
            globalPoints: this.globalPoints,
            target: this.TARGET_WALLET
        };
    }
}