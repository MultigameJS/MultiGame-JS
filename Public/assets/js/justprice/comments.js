document.addEventListener("DOMContentLoaded", function () {
  // CHARGER LES COMMENTAIRES EXISTANTS AU DEBUT DU SCRIPT (DEFINIE PLUS BAS DANS LE CODE)
function fetchComments() {
    fetch("/CommentJustPrice/listComments")
    .then(response => response.json())
    .then(data => {
        commentsList.innerHTML = "";
        data.forEach((comment) => {
            let li = document.createElement("li");
            li.textContent = comment.pseudo + " : " + comment.comment;
            commentsList.appendChild(li);
        });
    });
}
fetchComments();
});

    /*let data = { pseudo, comment }; // CLE VALEUR => CREATION D UN OBJET POUR ENVOYER AU SERVEUR

    fetch("/CommentJustPrice/addComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ENVOI DES DONNEES AU SERVEUR
      },
      body: JSON.stringify(data), // STRINGINFY ATTEND UN SEUL OBJET DONC "LET DATA"
    })
      .then((response) => response.json()) // CONVERSION EN JSON
      .then((data) => {
        if (data.success) {
          fetchComments(); // RECHARGER LES COMMENTAIRES DE NOUVEAU APRES L AJOUT SI SUCCESS EN STOCK EN BDD
        }
      });
  });

  // RECUPERER LES COMMENATAIRES AJOUTER EN BDD A L INSTANT POUR QUE LA LISTE DE RECHARGE
  function fetchComments() {
    fetch("/CommentJustPrice/listComments")
      .then((response) => response.json())
      .then((data) => {
        commentsList.innerHTML = ""; //  (VALIDER AVCE YO) SUPP LES COMMENTAIRES AFFICHES SUR LE NAV POUR EVITER LES DOUBLONS ET AFFICHER LA NOUVELLE LISTE A JOUR => REMISE A ZERO

        data.forEach((comment) => {
          // BOUCLE QUI VA PARCOURIR LES COMMENTAIRES ET LES AFFICHER DANS UNE LISYE AVEC PSEUDO : COMMENTAIRE DE L UTILISATEUR
          let li = document.createElement("li");
          li.textContent = comment.pseudo + " : " + comment.comment; // AFFICHERA LE PSEUDO : ET LE COMMENTAIRE
          commentsList.appendChild(li);
        });
      });
  }
}); */
