// Fonction de vérification des entrées
export function verifJustePrix(cards, valeur) {
  if (valeur === "" || isNaN(valeur)) {
    alert("Entrez un prix valide !");
    return;
  }

  let card = justPriceGame[cards]; // JE RECUPERE MA CARTE DANS L OBJET DEFINI DE DEPART
  let proposition = parseInt(valeur);

  if (proposition === card.prix) {
    let textPlayer = document.getElementById("textPlay"); // JE REMPLACE LES "ALERT"

    let p = document.createElement("p");
    textPlayer.appendChild(p);
    p.textContent = "Bravo, vous avez trouvé le juste prix !";
  } else if (proposition < card.prix) {
    p.textContent = "Trop bas, retentez votre chance";
  } else {
    p.textContent = "Trop haut, retentez votre chance";
  }
}
