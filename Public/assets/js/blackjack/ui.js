// Gestion de l'interface utilisateur du jeu

// Crée un élément de carte HTML en fonction de la carte et si elle doit être cachée
export function createCardElement(card, hidden = false) {
    if (hidden) {
        // Retourne une carte cachée
        return `
            <div class="card hidden">
                <div class="card-back"></div>
            </div>
        `;
    }

    // Obtient les valeurs d'affichage, le symbole et la couleur de la carte
    const displayValue = card.getDisplayValue();
    const suitSymbol = card.getSuitSymbol();
    const color = card.getColor();
    
    // Retourne l'élément HTML de la carte avec les informations appropriées
    return `
        <div class="card ${color}">
            <span class="card-value top-left">${displayValue}${suitSymbol}</span>
            <span class="card-suit">${suitSymbol}</span>
            <span class="card-value bottom-right">${displayValue}${suitSymbol}</span>
        </div>
    `;
}

// Affiche un message à l'utilisateur
export function displayMessage(message) {
    const messageEl = document.getElementById('message');
    
    // Détermine la classe CSS du message en fonction de son contenu
    let messageClass = '';
    if (message.includes('gagné')) {
        messageClass = 'message-win';
    } else if (message.includes('croupier')) {
        messageClass = 'message-dealer';
    } else if (message.includes('Égalité')) {
        messageClass = 'message-tie';
    } else if (message.includes('Perdu')) {
        messageClass = 'message-lose';
    }
    
    // Met à jour la classe et le contenu HTML de l'élément de message
    messageEl.className = `message ${messageClass}`;
    messageEl.innerHTML = `
        <div class="message-icon">
            ${getMessageIcon(message)}
        </div>
        <div class="message-text">${message}</div>
    `;
}


function getMessageIcon(message) {
    if (message.includes('gagné')) {
        return '<i class="fas fa-trophy"></i>';
    } else if (message.includes('croupier')) {
        return '<i class="fas fa-user-tie"></i>';
    } else if (message.includes('Égalité')) {
        return '<i class="fas fa-handshake"></i>';
    } else if (message.includes('Perdu')) {
        return '<i class="fas fa-times-circle"></i>';
    }
    return '';
}

// Met à jour les boutons du jeu
export function updateControls(disable) {
    document.getElementById('hit-button').disabled = disable;
    document.getElementById('stand-button').disabled = disable;
}

// Met à jour l'affichage du score avec les informations du portefeuille, des points globaux et de l'objectif
export function updateScoreDisplay({ wallet, globalPoints, target }) {
    const walletDisplay = document.getElementById('wallet-display');
    walletDisplay.innerHTML = `
        <div class="score-info">
            <div class="wallet">
                <i class="fas fa-coins"></i>
                Cagnotte: ${wallet} / ${target} points
            </div>
            <div class="global-points">
                <i class="fas fa-star"></i>
                Points Globaux: ${globalPoints}
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: ${(wallet / target) * 100}%"></div>
            </div>
        </div>
    `;
}