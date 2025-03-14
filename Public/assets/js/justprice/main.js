import { initGame } from "./games.js";
// import { startTimer } from "./time.js";

// ATTENDRE QUE LA PAGE SOIT COMPLÈTEMENT CHARGÉE AVANT D’EXÉCUTER LE SCRIPT (INITIALISATION)
document.addEventListener("DOMContentLoaded", () => {
    initGame();
});

// FETCH
export function addScore(form) {

  let formData = new FormData(form); // CREA OBJET POUR ENVOYER LES DATA AU SERVEUR

  let scoretimer = document.getElementById("scoretimer").value; // VOIR YO !! VERIF SI SCORE EST BIEN DEFINIE AVANT DE L ENVOYER AU BACK
  if (!scoretimer || isNaN(scoretimer)) {
    console.error("Erreur : Score non défini ou invalide !");
    return;
  }

// startTimer();

fetch("/JustPrice/SaveScore", {
  method: "POST",
  body: formData,
})
.then(response => {
  if (!response.ok)
    throw new Error
      ("Erreur de réponse serveur");
  return response.json();
})
.then(jsonResponse => {
  if (jsonResponse.status === "success") { // VOIR SI YO OK 
    alert("Score enregistré !");
  } else {
    console.error("Erreur : ", jsonResponse.message);
  }
})
.catch(error => console.error("Erreur :", error));
}