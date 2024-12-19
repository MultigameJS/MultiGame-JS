// themes.js - Gestion des thèmes

// Exportation des variables nécessaires
let themes = [];

/**
 * Charge et affiche les thèmes disponibles.
 * @param {Function} callback - Une fonction de rappel à exécuter après l'initialisation des thèmes.
 */
export function initializeThemes(callback) {
    fetch("/assets/js/hack_my_world/theme/themes.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des thèmes.");
            }
            return response.json();
        })
        .then((data) => {
            themes = data.themes;

            const container = document.getElementById("themes-container");
            if (!container) {
                console.error("Conteneur des thèmes introuvable.");
                return;
            }

            container.innerHTML = ""; // Réinitialise le conteneur

            themes.forEach((theme, index) => {
                const button = document.createElement("button");
                button.className = "theme-button";
                button.textContent = theme.name;
                button.dataset.themeIndex = index;
                container.appendChild(button);
            });

            console.log("Thèmes affichés avec succès :", themes);

            if (typeof callback === "function") {
                callback(); // Exécute le callback si fourni
            }
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des thèmes :", error);
        });
}

/**
 * Sélectionne un thème et retourne le mot aléatoire correspondant.
 * @param {number} themeIndex - L'indice du thème sélectionné.
 * @param {Function} callback - Une fonction de rappel pour transmettre le thème et le mot.
 */
export function selectTheme(themeIndex, callback) {
    if (themeIndex < 0 || themeIndex >= themes.length) {
        console.error("Indice de thème invalide :", themeIndex);
        return;
    }

    const selectedTheme = themes[themeIndex];
    const words = selectedTheme.words;

    if (!words || words.length === 0) {
        console.error("Aucun mot disponible pour le thème sélectionné.");
        return;
    }

    const randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

    // Masquer les thèmes après sélection
    const container = document.getElementById("themes-container");
    if (container) {
        container.style.display = "none";
    }

    // Appelle le callback avec le thème et le mot sélectionné
    callback(selectedTheme.name, randomWord);
}
