import { startTimer, stopTimer } from "./time.js";
import { addScore } from "./main.js";

export function initGame() {
  // FAIRE UN BOUCLE POUR ALLER CHERCHER LES CLASS AU LIEU DES ID (avec queryselectorall)
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", function () {
      if (card.dataset.active === "true") return;
      card.dataset.active = "true";

      // MASQUER LES AUTRES CARDS SAUF CELLE CLIQUÉE
      document.querySelectorAll(".card").forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.add("hidden");
          otherCard.classList.remove("expanded");
        }
      });

      // ADD UNE CLASS POUR GRANDIRE LA CARTE SELECTIONNEE
      card.classList.add("expanded");

      // AFFICHER LE BOUTON RETOUR QUAND UNE CARTE EST ACTIVE
let returnButton = document.getElementById("returnButton");
returnButton.classList.remove("hidden");

// GESTION DU CLIC SUR LE BOUTON RETOUR
returnButton.addEventListener("click", function () {
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("hidden", "expanded");
    card.dataset.active = "false";

    // RÉACTIVER LES CLICS SUR LES CARTES
    card.style.pointerEvents = "auto"; 

    // CACHER INPUT ET BOUTON ENVOYER
    let input = card.querySelector("input");
    let button = card.querySelector("button");
    input ? input.classList.add("hidden") : null; // POUR EVITER LE TROP DE IF, UTILISATION DU TERNAIRE
    button ? button.classList.add("hidden") : null;

    // CACHER ET STOPPER LE TIMER PROPREMENT EN APPELANT STOPTIMER()
    stopTimer(card); 

    // CACHER L’AFFICHAGE DU TIMER
    let timerDisplay = card.querySelector(".timePlay");
    if (timerDisplay) {
        timerDisplay.classList.add("hidden");
    }
  });

  // CACHER LE BOUTON RETOUR
  returnButton.classList.add("hidden");
});

      
      
      // RECUPERATION DES ELEMENTS
      let input = card.querySelector("input");
      let button = card.querySelector("button");
      let textPlay = card.querySelector(".textPlay");

      // AFFICHER LES CHAMPS NÉCESSAIRES
      input.classList.remove("hidden");
      button.classList.remove("hidden");

      // LANCER LE TIMER UNIQUEMENT LORSQUE L'UTILISATEUR COMMENCE À ÉCRIRE
      input.addEventListener("input", function () {
        if (!card.timer) {
          startTimer(card);
        }
      });

      // DÉFINIR UN PRIX ALÉATOIRE AVMATH FLOOR ET MATH RANDOMEC
      let justPriceGame = {
        card1: { prix: Math.floor(Math.random() * (2000 - 300 + 1)) + 300 },
        card2: { prix: Math.floor(Math.random() * (150000 - 20000 + 1)) + 20000 },
        card3: { prix: Math.floor(Math.random() * (250 - 75 + 1)) + 75 },
      };

      // ÉVITER L'ACCUMULATION D'ÉVÉNEMENTS BOUTON
      let newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      button = card.querySelector("button");

      // ADD L'ÉVÉNEMENT DE VALIDATION
      button.addEventListener("click", function () {
        let userValue = parseInt(input.value);
        let correctPrice = justPriceGame[card.id].prix;

        // VÉRIFIER S'IL EXISTE DÉJÀ UN MESSAGE
        let resultMessage = card.querySelector(".result-message");
        if (!resultMessage) {
          resultMessage = document.createElement("p");
          resultMessage.classList.add("result-message");
          textPlay.appendChild(resultMessage);
        }

        // METTRE À JOUR LE MESSAGE
        if (isNaN(userValue)) {
          resultMessage.textContent = "Veuillez entrer un prix valide.";
          resultMessage.style.color = "red";
        } else if (userValue === correctPrice) {
          resultMessage.textContent = "Bravo, vous avez trouvé le juste prix !";
          resultMessage.style.color = "green";

          let finalTime = stopTimer(card); // RECUP LE TEMPS FINAL
          let idUsers = document.getElementById("idUsers");

          if (finalTime !== undefined && idUsers.value !== null) {
            let scoretimer = document.getElementById("scoretimer");
            let saveScore = document.getElementById("saveScore");
            scoretimer.value = finalTime;
            addScore(saveScore); // ENVOIE LE SCORE ET RECUP LA VALEUR DANS MON FETCH
          }

          card.dataset.active = "false";
        } else {
          resultMessage.textContent =
            userValue < correctPrice
              ? "Trop bas, essayez encore." // REMPLACE IF ELSE (ternaire)
              : "Trop haut, essayez encore.";
          resultMessage.style.color = "blue";
        }

        // GARDER LE MESSAGE AFFICHÉ QUELQUES SECONDES AVANT SUPPRESSION
        clearTimeout(card.messageTimeout);
        card.messageTimeout = setTimeout(() => {
          resultMessage.remove();
        }, 1500);
      });

      // PERMET D'ENVOYER LA VALEUR EN APPUYANT SUR "ENTRÉE" AU CLAVIER (POUR LES PERSONNES EN SITUATION D HANDICAP ET USER XPERIENCE)
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          button.click(); // SIMULE UN CLIC SUR LE BOUTON "ENVOYER"
        }
      });
    });
  });
}
