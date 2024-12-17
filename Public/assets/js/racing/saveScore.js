export function saveScore(id, score, csrf) {
    if (!id || !score) {
        return;
    }

    fetch('/racing/game', {
        method: 'PUT', // Utilisation de PUT
        headers: {
            'Content-Type': 'application/json', // Indique que les données sont au format JSON
        },
        body: JSON.stringify([
            ["id_user", id],
            ["score", score],
            ["csrf_token", csrf]
        ]) // Tableau sérialisé en JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la requête : ' + response.status);
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Erreur :', error));
}
