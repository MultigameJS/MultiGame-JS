import { initGame } from "./games.js";

// Attendre que la page soit complètement chargée avant d’exécuter le script (INITIALISATION)
document.addEventListener("DOMContentLoaded", () => {
    initGame();
});

// FETCH
export function addScore() {
  // rajouter le formulaire dans le htlm et le placer ici avant de le mettre dans un objet
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
