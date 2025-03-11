// ON DEMARRE LE TIMER 
export function startTimer(card) {
    let textPlay = card.querySelector(".textPlay");

    // VÉRIFIER S'IL EXISTE DÉJÀ UN ÉLÉMENT POUR LE TIMER, SINON LE CRÉER
    let timerDisplay = card.querySelector(".timer-display");
    if (!timerDisplay) {
        timerDisplay = document.createElement("p");
        textPlay.prepend(timerDisplay); // VOIR YO ?? AJOUTER EN HAUT DE TEXTPLAY
    }

    let seconds = 0;
    card.timer = setInterval(function () {   // SetInterval : FUNCTION NATIV JS QUI LANCE UNE EXECUTION REPETEE A INTERVALLE REGULIER
        seconds++;
        timerDisplay.innerText = "Temps : " + seconds + " sec";
    }, 1000);
}

// ON STOP LE TIMER SI REPONSE OK A L APPEL DE STOPTIMER DANS LE GAMEPLAY
export function stopTimer(card) {
    clearInterval(card.timer); // ClearInterval : ARRETE L INTERVALLE EN UTILISANT SON ID (card.timer)
    card.timer = null;
}