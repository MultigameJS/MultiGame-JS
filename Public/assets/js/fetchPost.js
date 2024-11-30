document.querySelectorAll('form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); 

        let data = new FormData(this); 
        let action = this.action;

        fetch(action, {
            method: 'POST',
            body: data,
        })
        .then(function(response) {
            if (response.ok) {
                return response.json().then(jsonResponse => jsonResponse);
            } else {
                return response.json().then(err => { throw err; });
            }
        })
        .then(function(jsonResponse) {
            // Cacher le message d'erreur en cas de succès
            let errorMessageContainer = document.getElementById('error-message');
            let successMessageContainer = document.getElementById('success-message');
            errorMessageContainer.style.display = 'none'; 
            successMessageContainer.style.display = 'none';

            form.reset();
            
            if (jsonResponse.redirect) {
                window.location.href = jsonResponse.redirect; // Redirection si demandée
            }
            if (jsonResponse.status === "success") {
                successMessageContainer.style.display = 'block';
                successMessageContainer.textContent = jsonResponse.message;
            }            
        })
        .catch(function(error) {
            // Afficher l'erreur dans le conteneur d'erreurs
            const errorMessageContainer = document.getElementById('error-message');
            errorMessageContainer.style.display = 'block';
            errorMessageContainer.textContent = error.message || "Une erreur est survenue.";
        });
    });
});