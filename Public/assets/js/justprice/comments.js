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