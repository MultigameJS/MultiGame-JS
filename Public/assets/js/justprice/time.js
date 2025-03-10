// ON DEMARRE LE TIMER 
export function startTimer(card) {
    let textPlay = card.querySelector(".textPlay");
    let seconds = 0;

    card.timer = setInterval(function () {
        seconds++;
        textPlay.innerText = "Temps : " + seconds + " sec";
    }, 1000);
}

// ON STOP LE TIMER SI RESPONSE OK CONSOLE
export function stopTimer(card) {
    clearInterval(card.timer);
}
