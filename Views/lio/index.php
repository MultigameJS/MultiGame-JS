<?php
$css = 'lio';
?>
<div id="startForm">
    <h1>Bienvenue dans Flappy Bird !</h1>
    <p>Entrez votre pseudo pour commencer :</p>
    <form action="/LioController/saveScore" method="POST">
        <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
        <input type="text" id="playerName" name="pseudo" placeholder="Votre pseudo" required />
        <button type="button" id="startGameButton">Commencer</button>
    </form>
</div>
<canvas id="gameCanvas"></canvas>

<script src="/assets/js/Flapibird/lio.js"></script>