// Fichier 1 corrigé

// Variables pour le contrôle du son
let isMuted = false;

// Récupérer les éléments DOM
const volumeControl = document.getElementById("volume-control");
const muteToggle = document.getElementById("mute-toggle");

// Instances globales des sons
let successSound, failSound, victorySound, gameOverSound;

document.addEventListener("DOMContentLoaded", () => {
    try {
        if (!successSound) {
            successSound = new Audio("/assets/sounds/hack_my_world/good.mp3");
            failSound = new Audio("/assets/sounds/hack_my_world/fail.mp3");
            victorySound = new Audio("/assets/sounds/hack_my_world/victory.mp3");
            gameOverSound = new Audio("/assets/sounds/hack_my_world/gameover.mp3");
        }

        console.log("Sons initialisés avec succès :", {
            successSound,
            failSound,
            victorySound,
            gameOverSound
        });

        // Initialiser le volume si les sons sont bien chargés
        if (successSound && failSound && victorySound && gameOverSound) {
            updateVolume(parseFloat(volumeControl?.value || 1)); // Défaut à 1 si volumeControl introuvable
        } else {
            console.error("Les sons ne sont pas initialisés correctement.");
        }
    } catch (error) {
        console.error("Erreur lors de l'initialisation des sons :", error);
    }

    // Gestion du slider de volume
    if (volumeControl && muteToggle) {
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
    } else {
        console.error("Les contrôles de volume (volumeControl ou muteToggle) sont introuvables dans le DOM.");
    }
});

// Fonction pour ajuster le volume de tous les sons
function updateVolume(volume) {
    if (successSound && failSound && victorySound && gameOverSound) {
        successSound.volume = volume;
        failSound.volume = volume;
        victorySound.volume = volume;
        gameOverSound.volume = volume;
    } else {
        console.error("Impossible de mettre à jour le volume, les sons ne sont pas initialisés.");
    }
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
                    showScoreModal('Score enregistré', `Nouveau meilleur score enregistré : ${totalScore}`);
                    // Appeler la fonction de confettis après l'enregistrement du score
                    launchConfetti();
                } else {
                    showScoreModal('Erreur', `Une erreur est survenue lors de l'enregistrement : ${data.message}`);
                }
            })
            .catch(error => {
                console.error('Erreur réseau lors de l\'enregistrement :', error);
                showScoreModal('Erreur réseau', 'Une erreur est survenue lors de l\'enregistrement du score.');
            });
        } else {
            // Sinon, informe l'utilisateur que le score est inchangé
            showScoreModal('Information', 'Score actuel inférieur ou égal au meilleur score. Non enregistré.');
        }
    })
    .catch(error => {
        console.error('Erreur réseau lors de la vérification du meilleur score :', error);
        showScoreModal('Erreur réseau', 'Impossible de vérifier le meilleur score. Réessayez plus tard.');
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

function launchConfetti() {
    // Configuration des confettis
    const duration = 5 * 1000; // Durée de l'animation en millisecondes (5 secondes)
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5, // Nombre de confettis à chaque émission
            angle: 60, // Angle de l'éclatement
            spread: 55, // Écartement des confettis
            origin: { x: Math.random(), y: Math.random() }, // Origine aléatoire pour l'éclatement
            colors: ['#ff0', '#0f0', '#00f', '#f00'], // Couleurs des confettis
            shapes: ['circle', 'square'], // Formes des confettis
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame); // Répéter jusqu'à la fin
        }
    })();
}

function showModal(title, message) {
    const modalTitle = document.getElementById('scoreModalLabel');
    const modalBody = document.getElementById('scoreModalBody');

    modalTitle.textContent = title;
    modalBody.textContent = message;

    const scoreModal = new bootstrap.Modal(document.getElementById('scoreModal'));
    scoreModal.show();
}

function showScoreModal(title, message) {
    const modalTitle = document.getElementById('scoreModalLabel');
    const modalBody = document.getElementById('scoreModalBody');

    modalTitle.textContent = title;
    modalBody.textContent = message;

    const scoreModal = new bootstrap.Modal(document.getElementById('scoreModal'));
    scoreModal.show();
}

