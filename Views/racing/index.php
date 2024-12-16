<div id="game-container"></div>
<div id="ui-container">
  <div id="chrono">Temps : 0.00s</div>
  <button id="restart-button">Restart</button>
</div>
<div id="error-message"></div>
<?php
$game = "racing/game";
$css = "racing/style";

if(isset($_SESSION['id'])): ?>
    <div id="id"><?= $_SESSION['id'] ?></div>
    <div id="csrf"><?= $_SESSION['csrf_token'] ?></div>
<?php endif; ?>