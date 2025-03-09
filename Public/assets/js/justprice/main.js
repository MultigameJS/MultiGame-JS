import { gameMoyen, gameDifficile, gameFacile } from "./games.js";
import { verifJustePrix } from "./verifJustPrice.js";

// CREATION DE MON OJBET QUI VA COMPORTE MES 3 CARDS LEUR PRIX
let justPriceGame = {
  card1: { prix: null, min: 300, max: 2000 },
  card2: { prix: null, min: 20000, max: 150000 },
  card3: { prix: null, min: 75, max: 250 },
};

// PRIX ALEATOIRE
let prix1 = Math.floor(Math.random() * (justPriceGame.card1.max - justPriceGame.card1.min)) + justPriceGame.card1.min;
let prix2 = Math.floor(Math.random() * (justPriceGame.card2.max - justPriceGame.card2.min)) + justPriceGame.card2.min;
let prix3 = Math.floor(Math.random() * (justPriceGame.card3.max - justPriceGame.card3.min)) + justPriceGame.card3.min;

justPriceGame.card1.prix = prix1;
justPriceGame.card2.prix = prix2;
justPriceGame.card3.prix = prix3;

verifJustePrix(); // VOIR YO si je mets les parametres cards et valeur ça ne marche pas ! mais là j ai le prompt

function addScore() {
  // rajouter le formulaire dans le htlm et le placer ici avant de le mettre dans un objet
  let formData = new FormData(); // CREA OBJET POUR ENVOYER LES DATA AU SERVEUR
  formData.append("score"); // AJOUT DES DATA // pas besoin de cette ligne
  formData.append("time"); // pas besoin de cette ligne

  fetch("/JustPrice/SaveScore", {
    method: "POST",
    body: formData, // VOIR YOYO CAR VU BODY : JSON STRINGIFY  -> GERE LA REPONSE JSON EN CHAINE DE CARACTERE
  })
    .then(function (response) {
      if (response.ok) {
        return response.json().then((jsonResponse) => jsonResponse);
      } else {
        return response.json().then((err) => {
          throw err;
        });
      }
    })
    .then(function (jsonResponse) {
      alert("Score enregistré !");
    })
    .catch(function (error) {
      console.error("Erreur :", error);
    });
}

const game1 = document.getElementById("card1"); // je vias chercher ma CARD
game1.addEventListener("click", function (e) {
  // AU CLIC  enlever le rechargement de page
  e.preventDefault();
  gameMoyen(game1); // on vient apporter le contenu qui se toruve dans le fichier game.js pour gagner en ligne de code et en logique (seulement au click)
});

const game2 = document.getElementById("card2"); // je vias chercher ma CARD
game2.addEventListener("click", function (e) {
  // AU CLIC  enlever le rechargement de page
  e.preventDefault();
  gameDifficile(game2); // on vient apporter le contenu qui se toruve dans le fichier game.js pour gagner en ligne de code et en logique (seulement au click)
});

const game3 = document.getElementById("card3"); // je vias chercher ma CARD
game3.addEventListener("click", function (e) {
  // AU CLIC  enlever le rechargement de page
  e.preventDefault();
  gameFacile(game3); // on vient apporter le contenu qui se toruve dans le fichier game.js pour gagner en ligne de code et en logique (seulement au click)
});
