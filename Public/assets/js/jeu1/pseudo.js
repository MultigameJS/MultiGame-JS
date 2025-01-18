document.getElementById("start-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById("username");
    const playerName = usernameInput.value;

    if (playerName) {
        localStorage.setItem("playerName", playerName);
        document.getElementById("pseudo-form").style.display = "none";
        document.querySelector(".game").style.display = "block";
        init();
    } else {
        alert("Veuillez entrer un pseudo !");
    }
});