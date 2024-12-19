// Ce fichier gère les thèmes et la logique d'initialisation du jeu.

// Variables globales pour les thèmes
export let themes = [];

/**
 * Charge les thèmes depuis un fichier JSON et les affiche sous forme de boutons.
 * @param {Function} onThemeSelected - Fonction callback appelée lorsqu'un thème est sélectionné.
 */
export function initializeThemes(onThemeSelected) {
    fetch("/assets/js/hack_my_world/theme/themes.json")
        .then((response) => response.json())
        .then((data) => {
            themes = data.themes; // Charge les thèmes dans la variable globale
            const container = document.querySelector(".theme-buttons-container");
            container.innerHTML = ""; // Vide le conteneur avant d'ajouter les boutons

            themes.forEach((theme, index) => {
                // Crée un bouton pour chaque thème
                const button = document.createElement("button");
                button.textContent = theme.name; // Nom du thème
                button.className = "theme-button";

                // Ajoute un gestionnaire de clic pour sélectionner un thème
                button.addEventListener("click", () => {
                    onThemeSelected(theme); // Appelle la fonction callback avec le thème sélectionné
                });

                container.appendChild(button); // Ajoute le bouton au conteneur
            });
        })
        .catch((error) => console.error("Erreur lors du chargement des thèmes :", error));
}

/**
 * Configure le bouton "Recommencer" pour réinitialiser le jeu.
 * @param {Function} onRestart - Fonction callback appelée lorsqu'on clique sur le bouton "Recommencer".
 */
export function setupRestartButton(onRestart) {
    const restartButton = document.getElementById("restart-btn");

    if (restartButton) {
        restartButton.addEventListener("click", () => {
            onRestart(); // Appelle la fonction callback pour réinitialiser le jeu
        });
    } else {
        console.warn("Bouton 'Recommencer' introuvable dans le DOM.");
    }
}

