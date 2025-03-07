// CREATION DE MON OJBET QUI VA COMPORTE MES 3 CARDS LEUR PRIX
let justPriceGame = {
  card1: { prix: null, min: 300, max: 2000 }, 
  card2: { prix: null, min: 20000, max: 150000 }, 
  card3: { prix: null, min: 75, max: 250 }, 
};

// PRIX ALEATOIRE
let prix1 = Math.floor(Math.random() * (justPriceGame.card1.max - justPriceGame.card1.min)) + justPriceGame.card1.min;
let prix2 = Math.floor(Math.random() * (justPriceGame.card2.max - justPriceGame.card2.min)) + justPriceGame.card2.min;
let prix3 = Math.floor(Math.random() * (justPriceGame.card3.max - justPriceGame.card3.min)) + justPriceGame.card3.min;

justPriceGame.card1.prix = prix1;
justPriceGame.card2.prix = prix2;
justPriceGame.card3.prix = prix3;

// Fonction de vérification (en dehors du listener pour éviter la répétition)
function verifJustePrix(cards, valeur) {
  if (valeur === "" || isNaN(valeur)) {
    alert("Entrez un prix valide !");
    return;
  }

  let card = justPriceGame[cards]; // JE RECUPERE MA CARTE DANS L OBJET DEFINI DE DEPART
  let proposition = parseInt(valeur);

  if (proposition === card.prix) {
    alert("Bravo, vous avez trouvé le juste prix !");
  } else if (proposition < card.prix) {
    alert("Trop bas, retentez votre chance");
  } else {
    alert("Trop haut, retentez votre chance");
  }
}

// LES TROIS FONCTION POUR LES NIVEAUS DE DIFFICULTES
function verifIphone(valeur) {
  verifJustePrix("card1", valeur);
}

function verifCyberTruck(valeur) {
  verifJustePrix("card2", valeur);
}

function verifConverse(valeur) {
  verifJustePrix("card3", valeur);
}

function addScore() {
  let formData = new FormData(); // CREA OBJET POUR ENVOYER LES DATA AU SERVEUR
  formData.append("score"); // AJOUT DES DATA
  formData.append("time"); 

  fetch(
    "/JustPrice/SaveScore", {

    method: "POST",
    body: formData, // VOIR YOYO CAR VU BODY : JSON STRINGIFY  ????
  })
    .then(function (response) {
      if (response.ok) {
        return response.json().then((jsonResponse) => jsonResponse);
      } else {
        return response.json().then((err) => {
          throw err;
        });
      }
    })
    .then(function (jsonResponse) {
      alert("Score enregistré !");
    })
    .catch(function (error) {
      console.error("Erreur :", error);
    }); 
}

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");

button1.addEventListener("click", function (e) {
  e.preventDefault();
  let valeur = document.getElementById("play1").value;
  verifIphone(valeur);
});

button2.addEventListener("click", function (e) {
  e.preventDefault();
  let valeur = document.getElementById("play2").value;
  verifCyberTruck(valeur);
});

button3.addEventListener("click", function (e) {
  e.preventDefault();
  let valeur = document.getElementById("play3").value;
  verifConverse(valeur);
});

/*const mainButton = document.getElementById("button"); // recuperer le formulaire au click du bouton + faire la meme avec un fetch POST
mainButton.addEventListener("click", function (e) {
  // evenement de click
  e.preventDefault(); // pas de rechargement de page

    const mainForm = document.getElementById("form"); // recup du formulaire

  let formData = new FormData(mainForm); // création d'un objet

  fetch(
    "/JustPrice/SaveScore", // j envoi ma requete FETCH EN POST au controller et à sa fonction (car url ou chemin en fetch)
    {
      method: "POST", // les methode se passent en STRING
      body: formData, // formData car c est l'objet creer qu on met dans le body en method POST
    }
  )
    .then(function(response) {
      if (response.ok) {
        return response.json().then(jsonResponse => jsonResponse);
      } else {
        return response.json().then(err => {
          throw err;
        }); // throw pour lever l exception donc j ai une erreur je la stock et l affiche dans le catch
      } // throw fonctionne pas directement dans une expression simple il doit être placé à dans d’une fonction fléchée sinon le moteur JS s'attend à une valeur de retour
    }) // là on définie juste jsonResponce qui est la valeur retourner avec une écriture simplifier mais sa marche pas avec throw + parce que throw n'est pas une valeur mais une méthode pour lever une exception

    .then(function(jsonResponse) {
      // je reprends la reponse convertie precedement
        mainForm.reset(); // Réinitialise le formulaire après envoi réussi
      let successDiv = document.getElementById("div"); // Récupération de la div de succès

      successDiv.classList.remove("d-none"); // Affiche la div de succès (d none = classe qui cache...)

      let successParam = document.getElementById("successParam");

      successParam.textContent = jsonResponse.message; // Affiche le message de succès reçu depuis le back-end 
    })
    .catch(function (error) {
      let errorDiv = document.getElementById("error"); // Récupération de la div d'erreur

      errorDiv.classList.remove("d-none"); // Affiche la div de succès

      let errorParam = document.getElementById("errorParam");

      errorParam.textContent = error.message || "Une erreur est survenue"; // error car on affiche le parametre de la function definie soit error et son message
    });
}); */
