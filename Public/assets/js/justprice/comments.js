document.addEventListener("DOMContentLoaded", function () {
  // ATTENDRE QUE LA PAGE SOIT COMPLÈTEMENT CHARGÉE AVANT D’EXÉCUTER LE SCRIPT
  let submitButton = document.getElementById("submitComment");
  let pseudoInput = document.getElementById("pseudo");
  let commentInput = document.getElementById("comment");
  let commentsList = document.getElementById("commentsList");

  // CHARGER LES COMMENTAIRES EXISTANTS AU DEBUT DU SCRIPT (DEFINIE PLUS BAS DANS LE CODE)
  fetchComments();

  submitButton.addEventListener("click", function () {
    // ADD EVENT AU CLICK
    let pseudo = pseudoInput.value; // RECUP LE PSEUDO SAISI
    let comment = commentInput.value; // RECUP LE COMMENTAIRE SAISI

    if (pseudo === "" || comment === "") {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    let data = { pseudo, comment }; // CLE VALEUR => CREATION D UN OBJET POUR ENVOYER AU SERVEUR

    fetch("/Comment/addComment", {
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
    fetch("/Comment/listComments")
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
});
