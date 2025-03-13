import { initGame } from "./games.js";
// import { startTimer } from "./time.js";

// ATTENDRE QUE LA PAGE SOIT COMPLÈTEMENT CHARGÉE AVANT D’EXÉCUTER LE SCRIPT (INITIALISATION)
document.addEventListener("DOMContentLoaded", () => {
    initGame();
});

// FETCH
export function addScore(form) {

  let formData = new FormData(form); // CREA OBJET POUR ENVOYER LES DATA AU SERVEUR
 
// startTimer();

fetch("/JustPrice/SaveScore", {
  method: "POST",
  body: formData,
})
.then(response => {
  if (!response.ok)
    throw new Error("Erreur de réponse serveur");
  return response.json();
})
.then(jsonResponse => {
  alert("Score enregistré !"); // VOIR YO CAR LE PROMPT NE S AFFICHE PAS ! 
})
.catch(error => console.error("Erreur :", error));
}