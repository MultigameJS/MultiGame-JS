// ON DEMARRE LE TIMER 
export function startTimer(card) {

    let textPlay = card.querySelector(".textPlay");

    // VÉRIFIER S'IL EXISTE DÉJÀ UN ÉLÉMENT POUR LE TIMER, SINON LE CRÉER
    let timerDisplay = card.querySelector(".timePlay");
    if (!timerDisplay) {
        timerDisplay = document.createElement("p");
        timerDisplay.classList.add("timePlay");
        textPlay.prepend(timerDisplay);
    }

    // INITIALISER LE TIMER UNIQUEMENT SI CE N'EST PAS DÉJÀ FAIT
    if (!card.timer) {
        let seconds = 0;
        card.timer = setInterval(function () {  // SetInterval : FUNCTION NATIV JS QUI LANCE UNE EXECUTION REPETEE A INTERVALLE REGULIER
            seconds++;
            timerDisplay.innerText = "Temps : " + seconds + " sec";
        }, 1000);
    }
}


// ON STOP LE TIMER SI REPONSE OK A L APPEL DE STOPTIMER DANS LE GAMEPLAY
export function stopTimer(card) {

    if (!card) {
        console.error("Erreur: card est undefined dans stopTimer");
        return;
    }

    clearInterval(card.timer);
    card.timer = null; // RÉINITIALISATION DU TIMER POUR ÉVITER UN REDÉMARRAGE

    let timerDisplay = card.querySelector(".timePlay"); 
    if (timerDisplay) {
        let finalTime = parseInt(timerDisplay.innerText.replace("Temps : ", "").replace(" sec", ""), 10);
        console.log("Temps final enregistré :", finalTime); // OK FONCTIONNE
        return finalTime;
    }
}