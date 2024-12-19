// Ce fichier gère les sons du jeu (réussites, échecs, victoire, défaite, etc.).

// Initialisation des sons
const successSound = new Audio("/assets/sounds/hack_my_world/good.mp3");
const failSound = new Audio("/assets/sounds/hack_my_world/fail.mp3");
const victorySound = new Audio("/assets/sounds/hack_my_world/victory.mp3");
const gameOverSound = new Audio("/assets/sounds/hack_my_world/gameover.mp3");

/**
 * Joue le son de succès.
 */
export function playSuccessSound() {
    stopAllSounds();
    successSound.currentTime = 0; // Redémarre le son depuis le début
    successSound.play();
}

/**
 * Joue le son d'échec.
 */
export function playFailSound() {
    stopAllSounds();
    failSound.currentTime = 0;
    failSound.play();
}

/**
 * Joue le son de victoire.
 */
export function playVictorySound() {
    stopAllSounds();
    victorySound.currentTime = 0;
    victorySound.play();
}

/**
 * Joue le son de défaite.
 */
export function playGameOverSound() {
    stopAllSounds();
    gameOverSound.currentTime = 0;
    gameOverSound.play();
}

/**
 * Met à jour le volume pour tous les sons.
 * @param {number} volume - Le niveau de volume (entre 0.0 et 1.0).
 */
export function updateVolume(volume) {
    successSound.volume = volume;
    failSound.volume = volume;
    victorySound.volume = volume;
    gameOverSound.volume = volume;
}

/**
 * Arrête tous les sons en cours de lecture.
 */
export function stopAllSounds() {
    successSound.pause();
    failSound.pause();
    victorySound.pause();
    gameOverSound.pause();

    successSound.currentTime = 0;
    failSound.currentTime = 0;
    victorySound.currentTime = 0;
    gameOverSound.currentTime = 0;
}
