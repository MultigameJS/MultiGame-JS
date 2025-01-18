<?php
$css = 'lio';
?>

<div class="background"></div>
<img src="/assets/images/Bird.png" alt="bird-img" class="bird" id="bird-1">
<div class="message">
    Appuyer sur entrée pour démarrer
    <p><span style="color: red;">&uarr;</span> Utilisez les flèches ou la barre espace</p>
</div>
<div class="score">
    <span class="score_title"></span>
    <span class="score_val"></span>
</div>

<!-- Formulaire pour le pseudo -->
<div id="pseudoFormModal" class="modal">
    <div class="modal-content">
        <h3>Bienvenue dans FlapiBird</h3>
        <p>Veuillez entrer votre pseudo pour commencer :</p>
        <form action="/Lio/saveScore" id="pseudoForm" method="POST">
            <input type="text" id="playerPseudo" name="pseudo" placeholder="Entrez votre pseudo" required>
            <input type="hidden" id="score" name="score">
            <input type="hidden" name="_method" value="PUT">
            <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token']; ?>">
            <button type="submit">Commencer</button>
        </form>
    </div>
</div>

<script src="/assets/js/Flapibird/lio.js"></script>