// Variables pour le contrôle du son
let isMuted = false;

// Récupérer les éléments DOM
const volumeControl = document.getElementById("volume-control");
const muteToggle = document.getElementById("mute-toggle");

// Fonction pour ajuster le volume de tous les sons
function updateVolume(volume) {
    successSound.volume = volume;
    failSound.volume = volume;
    victorySound.volume = volume;
    gameOverSound.volume = volume;
}

// Gestion du slider de volume
volumeControl.addEventListener("input", (event) => {
    const volume = parseFloat(event.target.value);
    isMuted = volume === 0; // Met à jour l'état "muet"
    updateVolume(volume);
    muteToggle.textContent = isMuted ? "🔇" : "🔊";
});

// Gestion du bouton muet
muteToggle.addEventListener("click", () => {
    isMuted = !isMuted; // Bascule entre muet et non-muet
    const newVolume = isMuted ? 0 : parseFloat(volumeControl.value); // Met à 0 ou au volume précédent
    updateVolume(newVolume);
    muteToggle.textContent = isMuted ? "🔇" : "🔊";
    volumeControl.value = newVolume; // Met à jour l'affichage du slider
});

// Initialiser le volume au chargement
if (successSound && failSound && victorySound && gameOverSound) {
    updateVolume(parseFloat(volumeControl.value));
} else {
    console.error("Les sons ne sont pas initialisés correctement.");
}

function saveScoreToServer(score, streak) {
    const csrfToken = document.getElementById('csrf_token').value;

    fetch('/HackMyWorld/getBestScore', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        const bestScore = data.score || 0; // Meilleur score enregistré
        const previousScore = data.previousScore || 0; // Score cumulé précédemment (si disponible)
        const totalScore = previousScore + score; // Cumul du score

        if (totalScore > bestScore) {
            // Enregistre le score cumulé si c'est un nouveau meilleur score
            fetch('/HackMyWorld/saveScore', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    score: totalScore,
                    streak: streak,
                    csrf_token: csrfToken
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Réponse du serveur :', data);
                if (data.status === 'success') {
                    alert('Nouveau meilleur score enregistré : ' + totalScore);
                } else {
                    alert('Erreur : ' + data.message);
                }
            })
            .catch(error => {
                console.error('Erreur réseau lors de l\'enregistrement :', error);
                alert('Une erreur est survenue lors de l\'enregistrement du score.');
            });
        } else {
            // Sinon, informe l'utilisateur que le score est inchangé
            alert('Score actuel inférieur ou égal au meilleur score. Non enregistré.');
        }
    })
    .catch(error => {
        console.error('Erreur réseau lors de la vérification du meilleur score :', error);
        alert('Impossible de vérifier le meilleur score. Réessayez plus tard.');
    });
}

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

function showModal(title, message) {
    const modalTitle = document.getElementById('scoreModalLabel');
    const modalBody = document.getElementById('scoreModalBody');

    modalTitle.textContent = title;
    modalBody.textContent = message;

    const scoreModal = new bootstrap.Modal(document.getElementById('scoreModal'));
    scoreModal.show();
}
