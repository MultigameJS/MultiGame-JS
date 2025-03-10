import { gameMoyen, gameDifficile, gameFacile } from "./games.js";
import { addScore } from "./addScore.js";

// CREATION DE MON OJBET QUI VA COMPORTE MES 3 CARDS LEUR PRIX
// TOUT PLACER AU BON ENDROIT CAR LA ON DEFINIT LE PRIX ALORS QUE IL A RIEN CHOISI 
// METTRE CETTE PARTIE APRES LA SELECTION DU JEU DEJA AU CLICK...
let justPriceGame = {
  card1: { prix: Math.floor(Math.random() * (2000 - 300 + 1)) + 300 },
  card2: { prix: Math.floor(Math.random() * (150000 - 20000 + 1)) + 20000 },
  card3: { prix: Math.floor(Math.random() * (250 - 75 + 1)) + 75 }
};

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", function () {
      // Masquer toutes les autres cartes sauf celle cliquée
      document.querySelectorAll(".card").forEach(otherCard => {
          if (otherCard !== card) {
              otherCard.classList.add("hidden");
              otherCard.classList.remove("expanded");
          }
      });

      // Ajouter la classe pour agrandir la carte sélectionnée
      card.classList.add("expanded");

      // Récupérer l'input, le bouton et la div pour afficher le message
      let input = card.querySelector("input");
      let button = card.querySelector("button");
      let textPlay = card.querySelector(".textPlay");

      // Afficher l'input et le bouton
      input.classList.remove("hidden");
      button.classList.remove("hidden");

      // Supprimer tout ancien événement du bouton avant d'en ajouter un nouveau
      let newButton = button.cloneNode(true); // Cloner le bouton pour supprimer l'ancien événement
      button.parentNode.replaceChild(newButton, button); // Remplacer l'ancien bouton
      button = card.querySelector("button"); // Re-sélectionner le nouveau bouton

      // Ajouter un seul événement au bouton
      button.addEventListener("click", function () {
          let userValue = parseInt(input.value);
          let correctPrice = justPriceGame[card.id].prix;

          // Vérifier si un message existe déjà et le supprimer proprement
          let oldMessage = textPlay.querySelector("p"); 
          if (oldMessage) {
              oldMessage.remove(); // Supprimer le message précédent
          }

          // Création du message de réponse
          let resultMessage = document.createElement("p");
          resultMessage.style.fontWeight = "bold";

          if (isNaN(userValue)) {
              resultMessage.textContent = "Veuillez entrer un prix valide.";
              resultMessage.style.color = "red";
          } else if (userValue === correctPrice) {
              resultMessage.textContent = "Bravo, vous avez trouvé le juste prix !";
              resultMessage.style.color = "green";
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