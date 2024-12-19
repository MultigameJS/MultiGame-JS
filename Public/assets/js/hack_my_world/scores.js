// scores.js - Gestion des scores

import { updateMessage } from './utils.js';

/**
 * Enregistre le score actuel sur le serveur.
 * @param {number} score - Le score actuel à enregistrer.
 * @param {number} streak - Le nombre de mots trouvés consécutivement.
 */
export function saveScoreToServer(score, streak) {
    const csrfToken = document.getElementById('csrf_token').value;

    fetch('/HackMyWorld/saveScore', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            score: score,
            streak: streak,
            csrf_token: csrfToken
        })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors de l'enregistrement du score.");
            }
            return response.json();
        })
        .then((data) => {
            if (data.status === 'success') {
                updateMessage(`Score enregistré avec succès : ${data.score}`, 'success');
            } else {
                updateMessage(data.message, 'info');
            }
        })
        .catch((error) => {
            console.error('Erreur réseau :', error);
            updateMessage("Impossible d'enregistrer le score. Veuillez réessayer.", 'error');
        });
}

/**
 * Récupère les 5 meilleurs scores depuis le serveur.
 * @returns {Promise<Array>} Une promesse contenant un tableau des meilleurs scores.
 */
export async function getBestScores() {
    try {
        const response = await fetch('/HackMyWorld/getBestScore', { method: 'GET' });
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des meilleurs scores.");
        }
        const data = await response.json();

        if (data.status === 'success') {
            return data.scores;
        } else {
            updateMessage(data.message, 'info');
            return [];
        }
    } catch (error) {
        console.error('Erreur réseau :', error);
        updateMessage("Impossible de récupérer les meilleurs scores.", 'error');
        return [];
    }
}

/**
 * Affiche les 5 meilleurs scores dans la modale.
 * @param {Array} scores - Tableau des meilleurs scores.
 */
export function displayBestScores(scores) {
    const modalBody = document.getElementById('scoreModalBody');
    if (!modalBody) return;

    modalBody.innerHTML = ""; // Réinitialise le contenu de la modale

    if (scores.length === 0) {
        modalBody.innerHTML = "<p>Aucun score disponible.</p>";
        return;
    }

    const list = document.createElement('ul');
    list.className = 'best-scores-list';

    scores.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `#${index + 1} - Score: ${score.score}, Série: ${score.streak}`;
        list.appendChild(listItem);
    });

    modalBody.appendChild(list);
}
