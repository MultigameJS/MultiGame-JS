// Instances globales des sons
let successSound, failSound, victorySound, gameOverSound;

// Variables globales pour le jeu
const maxErrors = 6; // Nombre maximum d'erreurs autorisées
let errors = 0; // Compteur des erreurs
let themes = []; // Liste des thèmes
let currentTheme = ""; // Thème sélectionné
let currentWord = ""; // Mot à deviner

// Messages de réussite
const successMessages = [
    "Bravo ! Ton code est parfait !",
    "Super ! Tu as trouvé un bug dans le système !",
    "Excellent ! Tes compétences en debugging sont au top !",
    "GG ! Tu déchiffres le code comme un pro !",
    "Impressionnant ! La compile est en cours !",
    "Continue comme ça ! Tu écris un algorithme gagnant !",
    "Tu es un vrai hacker de mots !",
    "Master dev ! Encore une réussite !"
];

// Messages d'erreurs
const errorMessages = [
    "Erreur 404 : lettre introuvable !",
    "Aïe ! Tu as crashé le programme !",
    "Attention ! Ton CPU surchauffe !",
    "Warning : Mauvaise instruction, réessaye !",
    "System Failure imminent : Dernière tentative !"
];

document.addEventListener("DOMContentLoaded", () => {

    // Gestion des liens de thèmes dans le menu
    document.querySelectorAll("[data-theme-index]").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Empêche le comportement par défaut du lien
            const themeIndex = parseInt(link.dataset.themeIndex, 10); // Récupère l'indice du thème
            if (!isNaN(themeIndex)) {
                selectTheme(themeIndex); // Lance le jeu avec le thème sélectionné
            } else {
                console.error("Indice de thème invalide !");
            }
        });
    });
});
// Chargement des thèmes depuis un fichier JSON
fetch('themes.json')
    .then((response) => response.json())
    .then((data) => {
        themes = data.themes; // Charge la liste des thèmes dans la variable globale
        console.log("Thèmes chargés :", themes);
        displayThemes(); // Affiche les boutons de sélection des thèmes
    })
    .catch((error) => console.error("Erreur lors du chargement des thèmes :", error));

document.addEventListener("DOMContentLoaded", () => {
    // Chargement des sons pour le jeu
    successSound = new Audio("assets/sounds/good.mp3");
    failSound = new Audio("assets/sounds/fail.mp3");
    victorySound = new Audio("assets/sounds/victory.mp3");
    gameOverSound = new Audio("assets/sounds/gameover.mp3");

    // Bouton "Recommencer" réaffiche les thèmes et réinitialise le jeu
    const restartButton = document.getElementById("restart-btn");
    restartButton.addEventListener("click", () => {
        const themesContainer = document.getElementById("themes-container");
        themesContainer.style.display = "flex"; // Réaffiche les thèmes
        displayThemes(); // Recharge les boutons des thèmes
    });

    // Ajoute des événements aux liens des thèmes dans le menu
    document.querySelectorAll("#submenu2 .subtitle").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Empêche le comportement par défaut du lien
            const themeIndex = parseInt(link.dataset.themeIndex, 10); // Récupère l'indice du thème
            selectTheme(themeIndex); // Lance le jeu avec le thème sélectionné
        });
    });
});

// Afficher les thèmes disponibles
function displayThemes() {
    const themesContainer = document.querySelector(".theme-buttons-container");
    themesContainer.innerHTML = ""; // Vide le conteneur avant d'ajouter les thèmes

    themes.forEach((theme, index) => {
        const button = document.createElement("button"); // Crée un bouton pour chaque thème
        button.textContent = theme.name; // Nom du thème
        button.className = "theme-button";
        button.addEventListener("click", () => selectTheme(index)); // Ajoute l'événement de sélection
        themesContainer.appendChild(button); // Ajoute le bouton au conteneur
    });
}

// Sélectionner un thème et lancer une partie
function selectTheme(themeIndex) {
    const themesContainer = document.getElementById("themes-container");
    if (!themesContainer) {
        console.error("L'élément themes-container est introuvable !");
        return;
    }

    // Masquer les thèmes
    themesContainer.style.display = "none";

    // Récupérer le thème sélectionné
    currentTheme = themes[themeIndex].name;
    const words = themes[themeIndex].words;

    if (!words || words.length === 0) {
        console.error(`Aucun mot trouvé pour le thème : ${currentTheme}`);
        return;
    }

    currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase(); // Mot aléatoire

    // Afficher le thème sélectionné dans les instructions
    const instructions = document.getElementById("instructions");
    if (instructions) {
        instructions.textContent = `Thème sélectionné : ${currentTheme}`;
    }

    initializeGame(currentWord); // Initialise le jeu avec le mot sélectionné
}


// Initialisation du jeu
function initializeGame(word) {
    resetHourglass(); // Réinitialise le sablier
    resetEndGameDisplay(); // Réinitialise l'affichage de fin
    generateWordCubes(word); // Génère les cubes pour afficher le mot à deviner
    generateAlphabetButtons(); // Génère les boutons pour chaque lettre de l'alphabet
    updateMessage(`Thème : ${currentTheme}`); // Affiche un message de bienvenue
}

// Réinitialisation du sablier
function resetHourglass() {
    errors = 0; // Réinitialise le compteur d'erreurs
    const hourglassFill = document.getElementById("hourglass-fill");
    hourglassFill.style.height = "0%"; // Vide le sablier
    hourglassFill.style.backgroundColor = "#058682"; // Définit la couleur de départ
}

// Réinitialisation de l'image de fin
function resetEndGameDisplay() {
    const endGameImage = document.getElementById("endgame-image");
    endGameImage.src = ""; // Vide l'image de fin
    endGameImage.style.display = "none"; // Cache l'image de fin
}

// Mise à jour du sablier en cas d'erreur
function updateHourglass() {
    errors++;
    const hourglassFill = document.getElementById("hourglass-fill");

    if (errors <= maxErrors) {
        const heightPercentage = (errors / maxErrors) * 100; // Augmente le remplissage
        hourglassFill.style.height = `${heightPercentage}%`;

        if (errors === maxErrors) {
            endGame(false); // Si le maximum est atteint, le joueur perd
        }
    }
}

// Générer les cubes pour le mot à deviner
function generateWordCubes(word) {
    const wordDisplay = document.getElementById("word-display");
    wordDisplay.innerHTML = ""; // Réinitialise l'affichage

    // Calcule la taille des cubes en fonction de la largeur disponible
    const containerWidth = wordDisplay.offsetWidth;
    const cubeSize = Math.min(50, Math.floor(containerWidth / word.length) - 5);

    // Crée un cube pour chaque caractère du mot
    word.split("").forEach((char, index) => {
        const cube = document.createElement("div");
        cube.classList.add("cube");
        cube.dataset.index = index;

        const cubeInner = document.createElement("div");
        cubeInner.classList.add("cube-inner");

        const front = document.createElement("div");
        front.classList.add("cube-front");

        // Si le caractère est un tiret, l'afficher immédiatement
        if (char === "-") {
            front.textContent = "-"; // Affiche le tiret
            cube.classList.add("flip"); // Considère ce cube comme "trouvé"
        } else {
            front.textContent = "_"; // Affiche un underscore pour les autres lettres
        }

        const back = document.createElement("div");
        back.classList.add("cube-back");
        back.textContent = char; // La lettre réelle ou le caractère

        cubeInner.appendChild(front);
        cubeInner.appendChild(back);
        cube.appendChild(cubeInner);

        cube.style.width = `${cubeSize}px`;
        cube.style.height = `${cubeSize}px`;

        wordDisplay.appendChild(cube); // Ajoute le cube au conteneur
    });
}

// Générer les boutons de l'alphabet
function generateAlphabetButtons() {
    const lettersContainer = document.querySelector(".letters");
    lettersContainer.innerHTML = ""; // Réinitialise les lettres

    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement("button");
        button.textContent = letter;
        button.className = "letter-button";
        lettersContainer.appendChild(button);

        button.addEventListener("click", () => handleLetterClick(letter, button));
    }
}

// Gestion du clic sur une lettre
function handleLetterClick(letter, button) {
    button.disabled = true;
    button.classList.add("disabled");

    stopCurrentSounds();

    if (isLetterInWord(letter)) {
        revealLetterInWord(letter);
        successSound.currentTime = 0;
        successSound.play();

        const randomSuccessMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
        updateMessage(randomSuccessMessage, "success");
    } else {
        updateHourglass();
        failSound.currentTime = 0;
        failSound.play();

        const errorMessage = errorMessages[errors - 1] || "Oups ! Mauvaise réponse !";
        updateMessage(errorMessage, "error");

        if (errors === maxErrors) {
            updateMessage(`Vous avez perdu... Le mot était : "${currentWord}".`, "error");
        }
    }
}

// Vérifie si une lettre est correcte
function isLetterInWord(letter) {
    return currentWord.includes(letter);
}

// Révèle les lettres trouvées
function revealLetterInWord(letter) {
    const cubes = document.querySelectorAll(".cube");
    currentWord.split("").forEach((char, index) => {
        if (char === letter) {
            const cube = cubes[index];
            if (cube && !cube.classList.contains("flip")) {
                cube.classList.add("flip");
            }
        }
    });

    if (isWordComplete()) {
        endGame(true);
    }
}

// Vérifie si le mot est complété
function isWordComplete() {
    // Vérifie si tous les cubes non-tirets sont retournés
    return !document.querySelectorAll(".cube:not(.flip):not([data-index='-'])").length;
}


// Gestion de la fin de partie
function endGame(isWin) {
    stopCurrentSounds();
    const hourglassFill = document.getElementById("hourglass-fill");
    const endGameImage = document.getElementById("endgame-image");
    const sound = isWin ? victorySound : gameOverSound;
    const image = isWin ? "assets/images/victory.webp" : "assets/images/loose.webp";

    hourglassFill.style.height = "100%";
    hourglassFill.style.backgroundColor = "#fff";
    endGameImage.src = image;
    endGameImage.style.display = "block";

    sound.currentTime = 0;
    sound.play();

    const message = isWin ? "Félicitations, vous avez gagné !" : `Vous avez perdu... Le mot était : "${currentWord}".`;
    updateMessage(message, isWin ? "success" : "error");
}

// Arrête les sons en cours
function stopCurrentSounds() {
    successSound.pause();
    failSound.pause();
    victorySound.pause();
    gameOverSound.pause();

    successSound.currentTime = 0;
    failSound.currentTime = 0;
    victorySound.currentTime = 0;
    gameOverSound.currentTime = 0;
}

// Mise à jour des messages
function updateMessage(text, type = "info") {
    const messages = document.getElementById("messages");
    messages.textContent = text;
    messages.className = `messages ${type}`;
}