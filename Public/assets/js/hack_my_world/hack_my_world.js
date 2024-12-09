// Fonction pour enregistrer le score
function saveScore(score, streak) {
    const csrfToken = document.getElementById('csrf_token').value;
    console.log('Token CSRF récupéré côté client :', csrfToken);

    fetch('/hackmyworld/saveScore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            score: score,
            streak: streak,
            csrf_token: csrfToken, // Transmettez le token
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'success') {
                showModal('Succès', 'Votre score a été enregistré avec succès.');
            } else {
                showModal('Erreur', data.message);
            }
        })
        .catch((error) => {
            showModal('Erreur', 'Une erreur est survenue lors de l\'enregistrement.');
            console.error('Erreur:', error);
        });
}





// Fonction pour récupérer le meilleur score
function getBestScore() {
    fetch('/HackMyWorld/getBestScore', {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status !== 'error') {
                showModal(
                    'Meilleur score',
                    `Votre meilleur score : ${data.score} avec un streak de ${data.streak} parties consécutives.`
                );
            } else {
                showModal('Erreur', data.message);
            }
        })
        .catch((error) => {
            showModal('Erreur', 'Impossible de récupérer votre meilleur score.');
            console.error('Erreur:', error);
        });
}

// Fonction pour afficher le modal Bootstrap
function showModal(title, message) {
    const modalTitle = document.getElementById('scoreModalLabel');
    const modalBody = document.getElementById('scoreModalBody');

    modalTitle.textContent = title;
    modalBody.textContent = message;

    const scoreModal = new bootstrap.Modal(document.getElementById('scoreModal'));
    scoreModal.show();
}
