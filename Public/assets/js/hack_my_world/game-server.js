// Fichier: game-server.js
// Ce fichier gère l'interaction avec le serveur pour sauvegarder et récupérer les scores.

/**
 * Enregistre le score actuel du joueur sur le serveur.
 * @param {number} score - Le score actuel à sauvegarder.
 * @param {number} streak - La série actuelle de mots trouvés consécutivement.
 */
export function saveScoreToServer(score, streak) {
    const csrfToken = document.getElementById('csrf_token')?.value; // Récupère le token CSRF pour la sécurité

    if (!csrfToken) {
        console.error("Token CSRF introuvable. Impossible de sauvegarder le score.");
        return;
    }

    fetch('/HackMyWorld/saveScore', {
        method: 'PUT', // Méthode HTTP PUT pour envoyer les données
        headers: {
            'Content-Type': 'application/json', // Spécifie le type de contenu envoyé
        },
        body: JSON.stringify({
            score: score, // Score du joueur
            streak: streak, // Série actuelle
            csrf_token: csrfToken, // Token CSRF pour sécuriser la requête
        }),
    })
        .then((response) => response.json()) // Convertit la réponse en JSON
        .then((data) => {
            if (data.status === 'success') {
                console.log("Score enregistré avec succès :", data);
            } else {
                console.warn("Erreur lors de l'enregistrement du score :", data.message);
            }
        })
        .catch((error) => {
            console.error("Erreur réseau :", error);
        });
}

/**
 * Récupère le meilleur score de l'utilisateur depuis le serveur.
 * @returns {Promise<Object>} - Une promesse contenant le meilleur score et la série associée.
 */
export function getBestScore() {
    return fetch('/HackMyWorld/getBestScore', {
        method: 'GET', // Méthode HTTP GET pour récupérer les données
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur HTTP : " + response.status);
            }
            return response.json(); // Convertit la réponse en JSON
        })
        .then((data) => {
            if (data.status === 'success') {
                return data; // Retourne les données du score si la requête a réussi
            } else {
                console.warn("Erreur lors de la récupération du score :", data.message);
                return null;
            }
        })
        .catch((error) => {
            console.error("Erreur réseau :", error);
            return null;
        });
}
