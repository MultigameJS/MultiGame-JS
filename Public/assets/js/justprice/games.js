import { startTimer, stopTimer } from "./time.js";

export function initGame() {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", function () {
      if (card.dataset.active === "true") return;
      card.dataset.active = "true";

      // Masquer les autres cartes sauf celle cliquée
      document.querySelectorAll(".card").forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.add("hidden");
          otherCard.classList.remove("expanded");
        }
      });

      // Agrandir la carte sélectionnée
      card.classList.add("expanded");

      // Récupérer les éléments
      let input = card.querySelector("input");
      let button = card.querySelector("button");
      let textPlay = card.querySelector(".textPlay");

      // Afficher les champs nécessaires
      input.classList.remove("hidden");
      button.classList.remove("hidden");

      // Démarrer le timer correctement
      startTimer(card);

      // Définir un prix aléatoire
      let justPriceGame = {
        card1: { prix: Math.floor(Math.random() * (2000 - 300 + 1)) + 300 },
        card2: { prix: Math.floor(Math.random() * (150000 - 20000 + 1)) + 20000 },
        card3: { prix: Math.floor(Math.random() * (250 - 75 + 1)) + 75 },
      };

      // Éviter l'accumulation d'événements bouton
      let newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      button = card.querySelector("button");

      // Ajouter l'événement de validation
      button.addEventListener("click", function () {
        let userValue = parseInt(input.value);
        let correctPrice = justPriceGame[card.id].prix;

        // Vérifier s'il existe déjà un message
        let resultMessage = card.querySelector(".result-message");
        if (!resultMessage) {
          resultMessage = document.createElement("p");
          resultMessage.classList.add("result-message");
          textPlay.appendChild(resultMessage);
        }

        // Mettre à jour le message
        if (isNaN(userValue)) {
          resultMessage.textContent = "Veuillez entrer un prix valide.";
          resultMessage.style.color = "red";
        } else if (userValue === correctPrice) {
          resultMessage.textContent = "Bravo, vous avez trouvé le juste prix !";
          resultMessage.style.color = "green";
          stopTimer(card); // Arrêter le timer
          card.dataset.active = "false";
        } else {
          resultMessage.textContent = userValue < correctPrice 
            ? "Trop bas, essayez encore." 
            : "Trop haut, essayez encore.";
          resultMessage.style.color = "blue";
        }

        // Garder le message affiché 5 secondes avant suppression
        clearTimeout(card.messageTimeout);
        card.messageTimeout = setTimeout(() => {
          resultMessage.remove();
        }, 1500);
      });
    });
  });
}
