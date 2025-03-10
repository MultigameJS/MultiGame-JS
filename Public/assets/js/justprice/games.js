import { startTimer, stopTimer } from "./time.js";
import { addScore } from "./main.js";
// AJOUTER AU BON ENDROIT L APPEL DE LA FUNCTION CONCERNEE 
export function initGame() {
  // FAIRE UN BOUCLE POUR ALLER CHERCHER LES CLASS AU LIEU DES ID (avec queryselectorall)
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", function () {
      // MASQUER LES AUTRES CARDS SAUF CELLE CLIQUÉE
      document.querySelectorAll(".card").forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.add("hidden");
          otherCard.classList.remove("expanded");
        }
      });

      // ADD LA CLASS POUR GRANDIRE LA CARTE SELECTIONNEE
      card.classList.add("expanded");

      // RECUP L INPUT LE BUTTON ET LA DIV POUR AFFICHER UN MESSAGE
      let input = card.querySelector("input");
      let button = card.querySelector("button");
      let textPlay = card.querySelector(".textPlay");

      // AFFICHER L INPUT ET LE BUTTON
      input.classList.remove("hidden");
      button.classList.remove("hidden");

      // Supprimer tout ancien événement du bouton avant d'en ajouter un nouveau
      let newButton = button.cloneNode(true); // REVOIR AVEC YOYO  Cloner le bouton pour supprimer l'ancien événement
      button.parentNode.replaceChild(newButton, button); // Remplacer l'ancien bouton
      button = card.querySelector("button"); // Re-sélectionner le nouveau bouton

      // DEMARRAGE DU TIMER
      startTimer(card);

      // DEFINIR UN PRIX ALEATOIRE AVEC MATH FLOOR ET MATH RANDOM
      let justPriceGame = {
        card1: { prix: Math.floor(Math.random() * (2000 - 300 + 1)) + 300 },
        card2: { prix: Math.floor(Math.random() * (150000 - 20000 + 1)) + 20000 },
        card3: { prix: Math.floor(Math.random() * (250 - 75 + 1)) + 75 },
      };

      // ADD UN SEUL EVENT AU BOUTTON
      button.addEventListener("click", function () {
        let userValue = parseInt(input.value);
        let correctPrice = justPriceGame[card.id].prix;

        // Vérifier si un message existe déjà et le supprimer proprement
        let oldMessage = textPlay.querySelector("p");
        if (oldMessage) {
          oldMessage.remove(); // Supprimer le message précédent
        }

        // MESSAGES DE REPONSES
        let resultMessage = document.createElement("p");
        resultMessage.style.fontWeight = "bold";

        if (isNaN(userValue)) {
          resultMessage.textContent = "Veuillez entrer un prix valide.";
          resultMessage.style.color = "red";
        } else if (userValue === correctPrice) {
          resultMessage.textContent = "Bravo, vous avez trouvé le juste prix !";
          resultMessage.style.color = "green";
            stopTimer(card); // STOP TIMER SI OK
            addScore(userValue); // ENVOYER LE SCORE
        } else if (userValue < correctPrice) {
          resultMessage.textContent = "Trop bas, essayez encore.";
          resultMessage.style.color = "blue";
        } else {
          resultMessage.textContent = "Trop haut, essayez encore.";
          resultMessage.style.color = "blue";
        }

        textPlay.appendChild(resultMessage);
      });
    });
  });
}
