<?php
$css = "hack_my_world/style";

?>
    <!-- Menu horizontal -->
    <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
            <a class="navbar-brand" href="/main/index">Hack My Word</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="/main/index">Retour page d'Accueil</a>
                    </li>
                    <!-- Bouton pour ouvrir la modale -->
<a href="#" class="nav-link" data-bs-toggle="modal" data-bs-target="#rulesModal">Règles du jeu</a>

<!-- Modale des règles du jeu -->
<div class="modal fade" id="rulesModal" tabindex="-1" aria-labelledby="rulesModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="rulesModalLabel">Règles du jeu - Hack My Word</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h6><strong>Objectif du jeu</strong></h6>
                <p>
                    Le but du jeu est de deviner un mot caché, une lettre à la fois, avant d'atteindre le nombre maximum d'erreurs autorisées (6). 
                    Chaque mot appartient à un thème spécifique que vous pouvez sélectionner en début de partie.
                </p>
                <hr>
                <h6><strong>Déroulement du jeu</strong></h6>
                <ul>
                    <li><strong>Choisir un thème :</strong> Cliquez sur un thème pour commencer la partie. Les mots à deviner seront tirés aléatoirement parmi ceux de ce thème.</li>
                    <li><strong>Deviner les lettres du mot :</strong> Proposez des lettres via le clavier virtuel. Les lettres correctes se révèlent, tandis que les incorrectes remplissent progressivement le Conteneur.</li>
                    <li><strong>Éviter les erreurs :</strong> Vous avez un maximum de <strong>6 erreurs</strong> avant la fin de la partie.</li>
                    <li><strong>Fin de partie :</strong>
                        <ul>
                            <li><strong>Victoire :</strong> Devinez toutes les lettres avant d'atteindre 6 erreurs.</li>
                            <li><strong>Défaite :</strong> Si vous atteignez le maximum d'erreurs, le mot complet est révélé.</li>
                        </ul>
                    </li>
                </ul>
                <hr>
                <h6><strong>Fonctionnalités spéciales</strong></h6>
                <ul>
                    <li>Les tirets (`-`) s'affichent automatiquement dès le début de la partie.</li>
                    <li>Un bouton "Recommencer",en fin de page, permet de relancer la partie avec le même thème ou un nouveau.</li>
                    <li>Des messages d'encouragement ou d'avertissement vous aident pendant le jeu.</li>
                    <li>Plusieurs thèmes sont disponibles sur un thème global qui est l'informatique.</li>
                </ul>
                <hr>
                <h6><strong>Commandes et interactions</strong></h6>
                <ul>
                    <li>Utilisez le clavier virtuel pour proposer des lettres.</li>
                    <li>Les lettres déjà proposées deviennent grises et désactivées.</li>
                </ul>
                <hr>
                <h6><strong>Conseils pour gagner</strong></h6>
                <ul>
                    <li>Commencez par les lettres les plus courantes dans la langue utilisée (ex. : "e", "a", "s" en français).</li>
                    <li>Si le mot contient des tirets, utilisez-les pour déduire la structure du mot.</li>
                    <li>Prenez votre temps ce n'est pas chronométré.</li>
                </ul>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
            </div>
        </div>
    </div>
</div>

                    <li class="nav-item dropdown">
                       <!-- Bouton pour ouvrir la modale des points -->
<a href="#" class="nav-link" data-bs-toggle="modal" data-bs-target="#pointsModal">Règles des Points</a>

<!-- Modale des règles des points -->
<div class="modal fade" id="pointsModal" tabindex="-1" aria-labelledby="pointsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="pointsModalLabel">Règles de Calcul des Points</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h6><strong>Comment les points sont calculés ?</strong></h6>
                <ul>
                    <li>+10 points pour chaque lettre correctement devinée.</li>
                    <li>+50 points pour chaque mot complètement trouvé.</li>
                    <li>-5 points pour chaque lettre incorrecte.</li>
                </ul>
                <hr>
                <h6><strong>Bonus pour les séries de mots trouvés</strong></h6>
                <p>
                    Trouver plusieurs mots à la suite afin d'obtenir un bonus exponentiel :
                </p>
                <ul>
                    <li>2 mots à la suite : +20 points.</li>
                    <li>3 mots à la suite : +40 points.</li>
                    <li>4 mots à la suite : +80 points.</li>
                    <li>Et ainsi de suite, chaque bonus doublant le précédent.</li>
                </ul>
                <p>
                    Attention : En cas de défaite, la série est remise à zéro !
                </p>
                <hr>
                <h6><strong>Exemple de calcul</strong></h6>
                <p>
                    Un joueur devine un mot de 5 lettres avec 1 erreur:
                </p>
                <ul>
                    <li>Lettres correctes : 4 x 10 = +40 points.</li>
                    <li>Erreur : -5 points.</li>
                    <li>Total pour ce mot : **+35 points**.</li>
                </ul>
                <p>
                    Enchaînant avec 3 mots trouvés à la suite, il obtient:
                </p>
                <ul>
                    <li>Points des mots : 35 + 50 + 45 = +130 points.</li>
                    <li>Bonus série : +60 points.</li>
                    <li>Total final : **+190 points**.</li>
                </ul>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
            </div>
        </div>
    </div>
</div>

                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="themesDropdown json" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Thèmes
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="themesDropdown">
                            <li><a href="#" data-theme-index="0" class="dropdown-item">Métiers de l'informatique</a></li>
                            <li><a href="#" data-theme-index="1" class="dropdown-item">Vocabulaire informatique</a></li>
                            <li><a href="#" data-theme-index="2" class="dropdown-item">Langages informatiques</a></li>
                            <li><a href="#" data-theme-index="3" class="dropdown-item">Logiciels de développeur</a></li>
                            <li><a href="#" data-theme-index="4" class="dropdown-item">Veille technologique</a></li>
                            <li><a href="#" data-theme-index="5" class="dropdown-item">Fonctions JavaScript</a></li>
                            <li><a href="#" data-theme-index="6" class="dropdown-item">Cybersécurité</a></li>
                            <li><a href="#" data-theme-index="7" class="dropdown-item">Propriétés HTML</a></li>
                            <li><a href="#" data-theme-index="8" class="dropdown-item">Propriétés CSS</a></li>
                            <li><a href="#" data-theme-index="9" class="dropdown-item">SQL et NoSQL</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Zone principale -->
    <main class="main">
       <!-- Zone des instructions -->
<div id="instructions" class="instructions">
    Cliquez sur un thème pour commencer le jeu.
</div> <br>

        <div id="word-display" class="word-display"></div>
        
        <div id="scoreboard" class="scoreboard">
            Points : <span id="player-score">0</span>
        </div>

        <div id="themes-container" class="theme-buttons-container">
           
        </div>

        <div id="hourglass-container" class="hourglass-container">
            <div id="hourglass-fill" class="hourglass-fill"></div>
            <img id="endgame-image" src="" alt="Fin de partie" style="display: none;" />
        </div>

        <div class="letters"></div>

        <div id="messages" class="messages">Affichage des étapes et messages de réussites ou d'échecs.</div>

        <button id="restart-btn" class="restart-btn" aria-label="Recommencer la partie">Recommencer</button>
    </main>

</body>

</html>
<?php
$script = "hack_my_world/script";
?>