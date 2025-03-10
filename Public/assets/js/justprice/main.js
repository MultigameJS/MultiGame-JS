import { gameMoyen, gameDifficile, gameFacile } from "./games.js";
import { addScore } from "./addScore.js";

// CREATION DE MON OJBET QUI VA COMPORTE MES 3 CARDS LEUR PRIX
// TOUT PLACER AU BON ENDROIT CAR LA ON DEFINIT LE PRIX ALORS QUE IL A RIEN CHOISI 
// METTRE CETTE PARTIE APRES LA SELECTION DU JEU DEJA AU CLICK...
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


const game1 = document.getElementById("card1"); // je vias chercher ma CARD
game1.addEventListener("click", function (e) {
  // AU CLIC  enlever le rechargement de page
  e.preventDefault();
  gameMoyen(game1, prix1); // on vient apporter le contenu qui se toruve dans le fichier game.js pour gagner en ligne de code et en logique (seulement au click)
});

const game2 = document.getElementById("card2"); // je vias chercher ma CARD
game2.addEventListener("click", function (e) {
  // AU CLIC  enlever le rechargement de page
  e.preventDefault();
  gameDifficile(game2, prix2); // on vient apporter le contenu qui se toruve dans le fichier game.js pour gagner en ligne de code et en logique (seulement au click)
});

const game3 = document.getElementById("card3"); // je vias chercher ma CARD
game3.addEventListener("click", function (e) {
  // AU CLIC  enlever le rechargement de page
  e.preventDefault();
  gameFacile(game3, prix3); // on vient apporter le contenu qui se toruve dans le fichier game.js pour gagner en ligne de code et en logique (seulement au click)
});

// addScore(); // mettre uen condition : dabord il choisi un jeu / il rentre son prix / le timer et le sore sont arretés enregistré et ensuite on envoi fetch