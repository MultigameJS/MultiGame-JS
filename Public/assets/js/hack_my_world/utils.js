// utils.js - Fonctions utilitaires

/**
 * Met à jour les messages affichés à l'utilisateur.
 * @param {string} text - Le message à afficher.
 * @param {string} type - Le type de message ('info', 'success', 'error').
 */
export function updateMessage(text, type = 'info') {
    const messageElement = document.getElementById('messages');
    if (!messageElement) return;

    messageElement.textContent = text;
    messageElement.className = `messages ${type}`;
}

/**
 * Met à jour le score affiché à l'écran.
 * @param {number} score - Le score actuel du joueur.
 */
export function updateScore(score) {
    const scoreElement = document.getElementById('player-score');
    if (!scoreElement) return;

    scoreElement.textContent = score;
}

/**
 * Affiche une modale avec un titre et un contenu dynamique.
 * @param {string} title - Le titre de la modale.
 * @param {string} content - Le contenu à afficher dans la modale.
 */
export function showModal(title, content) {
    const modalTitle = document.getElementById('scoreModalLabel');
    const modalBody = document.getElementById('scoreModalBody');

    if (!modalTitle || !modalBody) return;

    modalTitle.textContent = title;
    modalBody.innerHTML = content;

    const scoreModal = new bootstrap.Modal(document.getElementById('scoreModal'));
    scoreModal.show();
}
