<?php
$css = 'game';
?>

<h1 class="text-center mt-4">Explorez notre sélection de jeux variés et amusez-vous !</h1>

<section class="container my-5">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
    <div class="col">
            <div class="card custom-card">
                <img src="/assets/images/spaceinvender.png" class="card-img-top" alt="Jeu 1">
                <div class="card-body">
                    <h5 class="card-title text-center">Flapi Bird</h5>
                    <p class="card-text text-center">Plongez dans une aventure palpitante et relevez des défis incroyables !</p>
                    <div class="d-flex justify-content-center">
                        <!-- Lien vers la page contenant le jeu -->
                        <a href="/lio/index" class="btn btn-primary" id="startGameButton">Jouer</a>
                    </div>
                </div>
            </div>
        </div>



        <div class="col">
            <div class="card custom-card">
                <img src="/assets/images/jeu2-thumbnail.jpg" class="card-img-top" alt="Jeu 2">
                <div class="card-body">
                    <h5 class="card-title text-center">Jeu 2 - Arcade</h5>
                    <p class="card-text text-center">Revivez les classiques de l'arcade dans ce jeu rapide et addictif.</p>
                    <div class="d-flex justify-content-center">
                        <a href="/jeu2" class="btn btn-primary">Jouer</a>
                    </div>
                </div>
            </div>
        </div>


        <div class="col">
            <div class="card custom-card">
                <img src="/assets/images/jeu3-thumbnail.jpg" class="card-img-top" alt="Jeu 3">
                <div class="card-body">
                    <h5 class="card-title text-center">Jeu 3 - Stratégie</h5>
                    <p class="card-text text-center">Testez vos compétences stratégiques et menez votre équipe à la victoire.</p>
                    <div class="d-flex justify-content-center">
                        <a href="/jeu3" class="btn btn-primary">Jouer</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</section>
<script src="/assets/js/Flapibird/lio.js"></script>
<script src="/assets/js/game.js"></script>