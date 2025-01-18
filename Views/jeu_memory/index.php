<?php
$title = 'Jeu de Mémoire';
$css = 'jeu-memory/style';
?>
<div class="container">
    <h1 class="title">Jeu de Mémoire</h1>

    <div class="menu">
        <div class="section">
            <h2 class="section-title">Thèmes</h2>
            <div class="theme-selection">
                <button class="btn btn-theme" onclick="setTheme('noel')">Noël</button>
                <button class="btn btn-theme" onclick="setTheme('drapeau')">Drapeau</button>
                <button class="btn btn-theme" onclick="setTheme('logo')">Logo voiture</button>
                <button class="btn btn-theme" onclick="setTheme('monument')">Monument</button>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Niveau de Difficulté</h2>
            <div class="difficulty-level">
                <button class="btn btn-easy" onclick="selectLevel('easy')">Facile</button>
                <button class="btn btn-medium" onclick="selectLevel('medium')">Moyen</button>
                <button class="btn btn-hard" onclick="selectLevel('hard')">Difficile</button>
            </div>
        </div>

        <div class="section">
            <button id="rulesButton" class="btn btn-rules">Règles du jeu</button>
        </div>
    </div>

    <div class="memory-game d-flex flex-wrap justify-content-center mt-4"></div>
    <div class="button-container" id="startButtonContainer" style="display: none;">
        <button class="btn btn-start" onclick="startGame()">Start</button>
    </div>
    <div id="scoreBoard" class="text-center mt-3"></div>
    <div id="timer" class="text-center mt-3"></div>
</div>

<div id="rulesModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Règle du Jeu de Mémoire</h2>
        <ul>
            <li><strong>Sélection du Thème :</strong> Avant de commencer à jouer, sélectionnez un thème parmi les
                options disponibles.</li>
            <li><strong>Sélection du Niveau de Difficulté :</strong> Choisissez un niveau de difficulté (Facile,
                Moyen, Difficile). Le bouton Start apparaîtra alors.</li>
            <li><strong>Démarrage du Jeu :</strong> Cliquez sur le bouton Start pour démarrer le jeu et le
                chronomètre. Le compte à rebours commencera selon le niveau de difficulté choisi :
            <li><strong>Facile :</strong> Pas de chronomètre.</li>
            <li><strong>Moyen :</strong> 60 secondes.</li>
            <li><strong>Difficile :</strong> 45 secondes.</li>

            </li>
            <li><strong>Objectif :</strong> Le but du jeu est de trouver toutes les paires de cartes identiques en
                retournant deux cartes à la fois.</li>
            <li><strong>Marquer des Points :</strong> Vous gagnez des points en trouvant des paires :
                <ul>
                    <li>Pour chaque paire correcte, vous gagnez <strong>10 points</strong>.</li>
                    <li>Pour chaque paire incorrecte, vous perdez <strong>2 points</strong>.</li>
                </ul>
            </li>
            <li><strong>Fin du Jeu :</strong> Le jeu se termine lorsque :
                <ul>
                    <li>Toutes les paires de cartes ont été trouvées.</li>
                    <li>Le temps imparti est écoulé (si vous avez sélectionné un niveau de difficulté avec
                        chronomètre).</li>
                </ul>
                Si vous terminez le jeu avant la fin du chronomètre, un message de félicitations s'affichera avec
                votre score final.
            </li>
            <li> Amusez-vous bien et essayez de battre votre meilleur score !</li>
        </ul>

    </div>
</div>

<audio id="backgroundMusic" src="/assets/musique/background-music.mp3.mp3" loop></audio>

<?php
    $script = 'jeu-memory/script';
?>