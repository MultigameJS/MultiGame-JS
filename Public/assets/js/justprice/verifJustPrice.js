// VERIF DES ENTREES JOUEUR
export function verifJustePrix(valeur, prix) {
    if (isNaN(valeur)) {
    alert("Entrez un prix valide !");
    return;
}

let textPlayer = document.getElementById("textPlay"); // JE REMPLACE LES "ALERT"
let para = document.createElement("p");

textPlayer.appendChild(para); // VOIR YO ALERT RETIRER TEXT MIS EN PLACE MAIS APPARAIT PAS...

if (valeur === prix) {
    para.textContent = "Bravo, vous avez trouvé le juste prix !";
    } else if (valeur < prix) {
    para.textContent = "Trop bas, retentez votre chance";
        } else {
    para.textContent = "Trop haut, retentez votre chance";

}
}
