<?php
$css = 'lio';

// Vérifier si l'utilisateur est connecté
$isUserLoggedIn = isset($_SESSION['id']);
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

<!-- Div cachée pour les données de session si l'utilisateur est connecté -->
<?php if ($isUserLoggedIn): ?>
<div class="d-none">
    <div id="id"><?= htmlspecialchars($_SESSION['id'], ENT_QUOTES, 'UTF-8') ?></div>
    <div id="csrf"><?= htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8') ?></div>
</div>
<?php endif; ?>

<script src="/assets/js/Flapibird/lio.js"></script>