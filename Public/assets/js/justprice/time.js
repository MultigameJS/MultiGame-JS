// ON DEMARRE LE TIMER 
export function startTimer(card) {
    let textPlay = card.querySelector(".textPlay");

    // Vérifier s'il existe déjà un élément pour le timer, sinon le créer
    let timerDisplay = card.querySelector(".timer-display");
    if (!timerDisplay) {
        timerDisplay = document.createElement("p");
        textPlay.prepend(timerDisplay); // Ajouter en haut de textPlay
    }

    let seconds = 0;
    card.timer = setInterval(function () {
        seconds++;
        timerDisplay.innerText = "Temps : " + seconds + " sec";
    }, 1000);
}

// ON STOP LE TIMER SI REPONSE OK
export function stopTimer(card) {
    clearInterval(card.timer);
    card.timer = null;
}
