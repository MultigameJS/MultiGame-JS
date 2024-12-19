// sounds.js - Gestion des sons

// Initialisation des sons
let successSound = new Audio("/assets/sounds/hack_my_world/good.mp3");
let failSound = new Audio("/assets/sounds/hack_my_world/fail.mp3");
let victorySound = new Audio("/assets/sounds/hack_my_world/victory.mp3");
let gameOverSound = new Audio("/assets/sounds/hack_my_world/gameover.mp3");

let isMuted = false; // État du son

/**
 * Joue le son de réussite.
 */
export function playSuccessSound() {
    if (!isMuted) {
        successSound.currentTime = 0;
        successSound.play();
    }
}

/**
 * Joue le son d'échec.
 */
export function playErrorSound() {
    if (!isMuted) {
        failSound.currentTime = 0;
        failSound.play();
    }
}

/**
 * Joue le son de victoire.
 */
export function playVictorySound() {
    if (!isMuted) {
        victorySound.currentTime = 0;
        victorySound.play();
    }
}

/**
 * Joue le son de fin de partie.
 */
export function playGameOverSound() {
    if (!isMuted) {
        gameOverSound.currentTime = 0;
        gameOverSound.play();
    }
}

/**
 * Configure les contrôles de son (volume et mute).
 */
export function setupSoundControls() {
    const volumeControl = document.getElementById("volume-control");
    const muteToggle = document.getElementById("mute-toggle");

    if (volumeControl) {
        volumeControl.addEventListener("input", (event) => {
            const volume = parseFloat(event.target.value);
            updateVolume(volume);
            isMuted = volume === 0;
            updateMuteToggleIcon(muteToggle);
        });
    }

    if (muteToggle) {
        muteToggle.addEventListener("click", () => {
            isMuted = !isMuted;
            updateMuteToggleIcon(muteToggle);
            updateVolume(isMuted ? 0 : parseFloat(volumeControl.value));
        });
    }
}

/**
 * Met à jour le volume des sons.
 * @param {number} volume - Niveau de volume entre 0 et 1.
 */
function updateVolume(volume) {
    successSound.volume = volume;
    failSound.volume = volume;
    victorySound.volume = volume;
    gameOverSound.volume = volume;
}

/**
 * Met à jour l'icône du bouton mute.
 * @param {HTMLElement} muteToggle - Bouton de mute.
 */
function updateMuteToggleIcon(muteToggle) {
    if (muteToggle) {
        muteToggle.textContent = isMuted ? "🔇" : "🔊";
    }
}
