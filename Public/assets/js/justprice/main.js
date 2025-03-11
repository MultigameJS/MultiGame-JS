import { initGame } from "./games.js";

// ATTENDRE QUE LA PAGE SOIT COMPLÈTEMENT CHARGÉE AVANT D’EXÉCUTER LE SCRIPT (INITIALISATION)
document.addEventListener("DOMContentLoaded", () => {
    initGame();
});

// FETCH
export function addScore() {
  // RAJOUTER LE FORMULAIRE DANS LE HTLM ET LE PLACER ICI AVANT DE LE METTRE DANS UN OBJET
  let formData = new FormData(); // CREA OBJET POUR ENVOYER LES DATA AU SERVEUR
  formData.append("score", score); // AJOUT DES DATA

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
