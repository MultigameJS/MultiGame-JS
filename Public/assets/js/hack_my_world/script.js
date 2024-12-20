// Variables globales pour le jeu
const maxErrors = 6; // Nombre maximum d'erreurs autorisées
let errors = 0; // Compteur des erreurs
let themes = []; // Liste des thèmes
let currentTheme = ""; // Thème sélectionné
let currentWord = ""; // Mot à deviner
let score = 0; // Points accumulés par le joueur
let streak = 0; // Série de mots trouvés à la suite
let usedThemes = []; // Liste des thèmes déjà joués

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
fetch('/assets/js/hack_my_world/theme/themes.json')
    .then((response) => response.json())
    .then((data) => {
        themes = data.themes; // Charge la liste des thèmes dans la variable globale
        console.log("Thèmes chargés :", themes);
        displayThemes(); // Affiche les boutons de sélection des thèmes
    })
    .catch((error) => console.error("Erreur lors du chargement des thèmes :", error));

document.addEventListener("DOMContentLoaded", () => {
    // Chargement des sons pour le jeu
    successSound = new Audio("/assets/sounds/hack_my_world/good.mp3");
    failSound = new Audio("/assets/sounds/hack_my_world/fail.mp3");
    victorySound = new Audio("/assets/sounds/hack_my_world/victory.mp3");
    gameOverSound = new Audio("/assets/sounds/hack_my_world/gameover.mp3");

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



//afficher les themes avec le theme actuel grisé
function displayThemesWithGrayedOut() {
    const themesContainer = document.getElementById("themes-container");

    if (!themesContainer) {
        console.error("Le conteneur des thèmes est introuvable !");
        return;
    }

    themesContainer.innerHTML = ""; // Nettoyage des thèmes

    themes.forEach((theme, index) => {
        const button = document.createElement("button");
        button.textContent = theme.name;
        button.className = "theme-button";

        // Désactiver les thèmes déjà joués
        if (usedThemes.includes(theme.name)) {
            button.disabled = true;
            button.classList.add("grayed-out");
        } else {
            button.addEventListener("click", () => selectTheme(index));
        }

        themesContainer.appendChild(button);
    });

    themesContainer.style.display = "flex"; // Réafficher les thèmes
}

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
        console.error("Le conteneur des thèmes est introuvable !");
        return;
    }

    themesContainer.style.display = "none";

    currentTheme = themes[themeIndex].name;
    if (!usedThemes.includes(currentTheme)) {
        usedThemes.push(currentTheme);
    }

    const words = themes[themeIndex].words;

    if (!words || words.length === 0) {
        console.error(`Aucun mot trouvé pour le thème : ${currentTheme}`);
        return;
    }

    currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

    const instructions = document.getElementById("instructions");
    if (instructions) {
        instructions.textContent = `Thème sélectionné : ${currentTheme}`;
    }

    initializeGame(currentWord); // Démarre la partie sans réinitialiser le score
}


// Initialisation du jeu
function initializeGame(word) {
    // Réinitialise les éléments visuels et les compteurs
    resetHourglass(); // Réinitialise le sablier
    resetEndGameDisplay(); // Réinitialise l'affichage de fin
    generateWordCubes(word); // Génère les cubes pour afficher le mot à deviner
    generateAlphabetButtons(); // Génère les boutons pour chaque lettre de l'alphabet
    updateScore(); // Met à jour l'affichage des points
    updateMessage(`Thème : ${currentTheme}. Choisir une lettre !`, "info");// message de bienvenue
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
    // Désactive le bouton pour éviter de cliquer plusieurs fois sur la même lettre
    button.disabled = true;
    button.classList.add("disabled");

    stopCurrentSounds(); // Arrête les sons en cours

    if (isLetterInWord(letter)) {
       
        score += 10; // Ajoute 10 points pour une lettre correcte
        updateScore(); // Met à jour l'affichage des points
         // Lettre correcte
        revealLetterInWord(letter);
        successSound.currentTime = 0;
        successSound.play(); // Joue le son de réussite

        // Affiche un message de réussite aléatoire
        const randomSuccessMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
        updateMessage(randomSuccessMessage, "success");

    } else {
        // Lettre incorrecte
        updateHourglass(); // Met à jour le sablier
        score -= 5; // Pénalise le joueur de 5 points pour une erreur
        if (score < 0) score = 0; // Empêche un score négatif
        updateScore(); // Met à jour l'affichage des points
        failSound.currentTime = 0;
        failSound.play(); // Joue le son d'erreur

        // Affiche un message d'erreur correspondant au nombre d'erreurs commises
        const errorMessage = errorMessages[errors - 1] || "Oups ! Mauvaise réponse !";
        updateMessage(errorMessage, "error");

        // Vérifie si le joueur a atteint le nombre maximum d'erreurs
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
    const image = isWin ? "/assets/images/hack_my_world/victory.webp" : "/assets/images/hack_my_world/loose.webp";

    hourglassFill.style.height = "100%";
    hourglassFill.style.backgroundColor = "#fff";
    endGameImage.src = image;
    endGameImage.style.display = "block";

    sound.currentTime = 0;
    sound.play();

    disableAllLetters();

    if (isWin) {
        score += 50; // Ajoute 50 points pour avoir gagné
        streak++;
        const streakBonus = Math.pow(2, streak - 1) * 20; // Bonus exponentiel
        score += streakBonus;

        console.log("Score après victoire :", score);
        console.log("Série actuelle :", streak);

        updateScore();
        updateMessage(`Félicitations ! Série : ${streak} mots trouvés. Bonus : ${streakBonus} points.`, "success");

        // Affiche la modale pour continuer ou arrêter
        const continueModal = new bootstrap.Modal(document.getElementById("continueModal"));
        document.getElementById("current-score").textContent = score;
        document.getElementById("current-streak").textContent = streak;

        // Nettoie les événements précédents des boutons
        const continueButton = document.getElementById("continue-btn");
        const stopButton = document.getElementById("stop-btn");

        continueButton.replaceWith(continueButton.cloneNode(true));
        stopButton.replaceWith(stopButton.cloneNode(true));

        // Gestion des boutons dans la modale
        document.getElementById("continue-btn").addEventListener("click", () => {
            console.log("Bouton 'Continuer' cliqué.");
            continueModal.hide();
            displayThemesWithGrayedOut();
        });

        document.getElementById("stop-btn").addEventListener("click", () => {
            console.log("Bouton 'Arrêter' cliqué. Score :", score, "Streak :", streak);
            continueModal.hide();
            saveScoreToServer(score, streak);
        });

        continueModal.show();
    } else {
        streak = 0; // Réinitialise la série
        console.log("Défaite : série réinitialisée.");
        updateScore();
        updateMessage(`Vous avez perdu... Le mot était : "${currentWord}".`, "error");
    }
}


// Désactiver tous les boutons des lettres
function disableAllLetters() {
    const letterButtons = document.querySelectorAll(".letter-button");
    letterButtons.forEach((button) => {
        button.disabled = true;
        button.classList.add("disabled");
    });
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

function updateScore() {
    const scoreElement = document.getElementById("player-score");
    scoreElement.textContent = score; // Met à jour le score affiché
}
