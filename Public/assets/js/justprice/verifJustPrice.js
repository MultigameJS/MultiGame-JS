// VERIF DES ENTREES JOUEUR
export function verifJustePrix(cards, valeur) {
    if (valeur === "" || isNaN(valeur)) {
    alert("Entrez un prix valide !");
    return;
}

let card = justPriceGame[cards]; // JE RECUPERE MA CARTE DANS L OBJET DEFINI DE DEPART
let proposition = parseInt(valeur);

let textPlayer = document.getElementById("textPlay"); // JE REMPLACE LES "ALERT"
let p = document.createElement("p");

textPlayer.appendChild(p); // VOIR YO ALERT RETIRER TEXT MIS EN PLACE MAIS APPARAIT PAS...

if (proposition === card.prix) {
    p.textContent = "Bravo, vous avez trouvé le juste prix !";
    } else if (proposition < card.prix) {
    p.textContent = "Trop bas, retentez votre chance";
        } else {
        p.textContent = "Trop haut, retentez votre chance";
}
}
