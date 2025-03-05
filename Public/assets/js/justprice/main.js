const mainButton = document.getElementById("button"); // recuperer le formulaire au click du bouton + faire la meme avec un fetch POST
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
});

