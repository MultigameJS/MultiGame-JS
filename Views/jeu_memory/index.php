<?php
$title = 'Jeu de Mémoire';
$css = 'jeu-memory/style';
?>
<div class="container">
    <div class="game-logo-container">
        <a href="/index.php">
            <img src="/assets/logosite.png" alt="Logo du jeu" class="game-logo">
        </a>
    </div>
    <h1 class="title">Jeu de Mémoire</h1>

    <div class="menu">
        <div class="section">
            <h2 class="section-title">Thèmes</h2>
            <div class="theme-selection">
                <button class="btn btn-theme" data-theme="noel">Noël</button>
                <button class="btn btn-theme" data-theme="drapeau">Drapeau</button>
                <button class="btn btn-theme" data-theme="logo">Logo voiture</button>
                <button class="btn btn-theme" data-theme="monument">Monument</button>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Niveau de Difficulté</h2>
            <div class="difficulty-level">
                <button class="btn btn-easy">Facile</button>
                <button class="btn btn-medium">Moyen</button>
                <button class="btn btn-hard">Difficile</button>
            </div>
        </div>

        <div class="section">
            <button id="rulesButton" class="btn btn-rules">Règles du jeu</button>
        </div>
    </div>

    <div class="memory-game d-flex flex-wrap justify-content-center mt-4"></div>
    <div class="button-container" id="startButtonContainer" style="display: none;">
        <button id="startButton" class="btn btn-start">Start</button>
    </div>
    <div id="scoreBoard" class="text-center mt-3"></div>
    <div id="timer" class="text-center mt-3"></div>
</div>


<div id="rulesModal" class="modal" style="display: none;">
    <div class="modal-content">
        <span class="close close-rules">&times;</span>
        <h2>Règle du Jeu de Mémoire</h2>
        <ul>
            <li><strong>Sélection du Thème :</strong> Avant de commencer à jouer, sélectionnez un thème parmi les options disponibles.</li>
            <li><strong>Sélection du Niveau de Difficulté :</strong> Choisissez un niveau de difficulté (Facile, Moyen, Difficile). Le bouton Start apparaîtra alors.</li>
            <li><strong>Démarrage du Jeu :</strong> Cliquez sur le bouton Start pour démarrer le jeu et le chronomètre. Le compte à rebours commencera selon le niveau de difficulté choisi :
                <ul>
                    <li><strong>Facile :</strong> 60 secondes.</li>
                    <li><strong>Moyen :</strong> 45 secondes.</li>
                    <li><strong>Difficile :</strong> 30 secondes.</li>
                </ul>
            </li>
            <li><strong>Objectif :</strong> Le but du jeu est de trouver toutes les paires de cartes identiques en retournant deux cartes à la fois.</li>
            <li><strong>Marquer des Points :</strong> Vous gagnez 10 points en trouvant des paires.
            </li>
            <li><strong>Fin du Jeu :</strong> Le jeu se termine lorsque :
                <ul>
                    <li>Toutes les paires de cartes ont été trouvées.</li>
                    <li>Le temps imparti est écoulé (si vous avez sélectionné un niveau de difficulté avec chronomètre).</li>
                </ul>
                Si vous terminez le jeu avant la fin du chronomètre, un message de félicitations s'affichera avec votre score final.
            <li>Si vous souhaitez enregistrer vos scores, vous devez être connecté.</li>
            </li>
            <li> Amusez-vous bien et essayez de battre votre meilleur score !</li>
        </ul>
    </div>
</div>

<?php if (isset($_SESSION['id'])): ?>
    <div class="dropdown">
        <button class="dropdown-btn">Voir les Scores</button>
        <ul class="score-list" style="display: none;">
            <?php if (isset($scores) && !empty($scores)): ?>
                <?php foreach ($scores as $score): ?>
                    <li class="score-item">
                        <span class="score-points">Points: <?= htmlspecialchars($score->score) ?></span>
                        <span class="score-date">Date: <?= htmlspecialchars($score->date) ?></span>
                    </li>
                <?php endforeach; ?>
            <?php else: ?>
                <li class="no-scores">Aucun score à afficher, commencez à jouer!</li>
            <?php endif; ?>
        </ul>
    </div>
<?php endif; ?>




<div id="eventModal" class="modal">
    <div class="modal-content">
        <span class="close close-event">&times;</span>
        <div class="event-details">
            <h2><?= htmlspecialchars($event['title']) ?></h2>
            <p><?= htmlspecialchars($event['date']) ?></p>
            <p><?= htmlspecialchars($event['description']) ?></p>
        </div>
    </div>
</div>

<!-- CSRF token  -->
<input type="hidden" id="csrfToken" value="<?php echo $_SESSION['csrf_token']; ?>">

<?php
$script = 'jeu-memory/script';
?>

<script type="module" src="/assets/js/<?= $script ?>.js"></script>