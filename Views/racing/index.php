<div id="game-container"></div>
<div id="ui-container">
  <div id="chrono">Temps : 0.00s</div>
  <?php if(isset($_SESSION['id'])): ?>
    <div>
      <?php foreach($racing as $score): ?>
        <h3 id="bestScore">Meilleur score : <?= $score->score ?></h3>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
</div>
<div>
  <button id="restart-button" class="btn btn-danger">Restart</button>
</div>
<div id="error-message"></div>
<?php
$game = "racing/game";
$css = "racing/style";

if(isset($_SESSION['id'])): ?>
<div class="d-none">
  <div id="id"><?= $_SESSION['id'] ?></div>
  <div id="csrf"><?= $_SESSION['csrf_token'] ?></div>
</div>
<?php endif; ?>