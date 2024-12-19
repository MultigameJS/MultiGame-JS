// Ce fichier contient des fonctions utilitaires pour la mise à jour des messages, du score, et l'affichage des modaux.

/**
 * Met à jour les messages affichés à l'utilisateur.
 * @param {string} text - Le texte du message à afficher.
 * @param {string} type - Le type de message ("info", "success", "error").
 */
export function updateMessage(text, type) {
    const messageDiv = document.getElementById("messages"); // Récupère l'élément contenant les messages
    if (messageDiv) {
        messageDiv.textContent = text; // Modifie le texte du message
        messageDiv.className = `messages ${type}`; // Applique une classe CSS en fonction du type (pour la couleur, etc.)
    } else {
        console.warn("Élément 'messages' introuvable dans le DOM.");
    }
}

/**
 * Met à jour le score affiché à l'écran.
 * @param {number} score - Le score actuel à afficher.
 */
export function updateScore(score) {
    const scoreElement = document.getElementById("player-score"); // Récupère l'élément contenant le score
    if (scoreElement) {
        scoreElement.textContent = score; // Met à jour le contenu avec le score actuel
    } else {
        console.warn("Élément 'player-score' introuvable dans le DOM.");
    }
}

/**
 * Affiche un modal avec un titre et un message.
 * @param {string} title - Le titre du modal.
 * @param {string} message - Le message à afficher dans le corps du modal.
 */
export function showModal(title, message) {
    const modalTitle = document.getElementById('scoreModalLabel'); // Récupère le titre du modal
    const modalBody = document.getElementById('scoreModalBody'); // Récupère le corps du modal

    if (modalTitle && modalBody) {
        modalTitle.textContent = title; // Définit le titre
        modalBody.textContent = message; // Définit le message

        // Initialise et affiche le modal (nécessite Bootstrap ou un équivalent)
        const scoreModal = new bootstrap.Modal(document.getElementById('scoreModal'));
        scoreModal.show();
    } else {
        console.warn("Éléments du modal introuvables dans le DOM.");
    }
}