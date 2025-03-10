import { verifJustePrix } from "./verifJustPrice.js"; // game comportera fetch et verif car verif comporte le fetch...

export function gameMoyen(game1, prix1) {
    let game2 = document.getElementById("card2");
    let game3 = document.getElementById("card3");
    let play = document.getElementById("play1"); // recup l input
    play.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        verifJustePrix(play, prix1);
    });

    game2.classList.add("d-none"); // utilisation de bootstrap pour le style mais possible avec .style (css directement) on eneleve le 2
    game3.classList.add("d-none"); // on enleve le 3
    game1.classList.add("game"); // on affiche le 1 "game" n existe qu'ici !! on le recupere juste en css
    play.classList.remove("d-none"); // je lui enleve d none pour afficher mon input
    game1.classList.remove("card");
}

export function gameDifficile(game2, prix2) {
    let game1 = document.getElementById("card1");
    let game3 = document.getElementById("card3");
    let play = document.getElementById("play2");
    play.addEventListener("submit", function (e) {
        e.preventDefault();
        verifJustePrix(play, prix2);
    });

    game1.classList.add("d-none"); // utilisation de bootstrap pour le style mais possible avec .style (css directement)
    game3.classList.add("d-none");
    game2.classList.add("game");
    play.classList.remove("d-none");
    game2.classList.remove("card");
}

export function gameFacile(game3, prix3) {
    let game2 = document.getElementById("card2");
    let game1 = document.getElementById("card1");
    let play = document.getElementById("play3");
    play.addEventListener("submit", function (e) {
        e.preventDefault();
        verifJustePrix(play, prix3);
    });

    game1.classList.add("d-none"); // utilisation de bootstrap pour le style mais possible avec .style (css directement)
    game2.classList.add("d-none");
    game3.classList.add("game");
    play.classList.remove("d-none");
    game3.classList.remove("card");
}
