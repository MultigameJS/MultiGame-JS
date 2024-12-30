document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.delete-comment');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const commentId = this.getAttribute('data-comment-id');

            if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
                fetch('/racing/deleteComment', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ comment_id: commentId })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert('Commentaire supprimé avec succès.');
                        location.reload(); // Recharge la page ou rafraîchit la liste des activités
                    } else {
                        alert(data.message || 'Erreur lors de la suppression.');
                    }
                })
                .catch(error => {
                    console.error('Erreur:', error);
                    alert('Une erreur est survenue.');
                });
            }
        });
    });
});