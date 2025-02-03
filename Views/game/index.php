<?php
$css = 'game';
?>

<h1 class="text-center mt-4">Explorez notre sélection de jeux variés et amusez-vous !</h1>

<section class="container my-5">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">

        <div class="col">
            <div class="card custom-card h-100">
                <img src="/assets/images/Bird.png" class="card-img-top" alt="Flapi bird">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-center">Flapi Bird</h5>
                    <p class="card-text text-center flex-grow-1">Flapi Bird : Le défi du vol sans fin ! 🐦</p>
                    <div class="d-flex justify-content-center">
                        <a href="/lio/index" class="btn btn-primary" id="startGameButton">Jouer</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card custom-card h-100">
                <img src="/assets/images/racing/racing.webp" class="card-img-top" alt="Jeu Racing">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-center">Racing</h5>
                    <p class="card-text text-center flex-grow-1">Une course contre la montre à grande vitesse.</p>
                    <div class="d-flex justify-content-center">
                        <a href="/racing" class="btn btn-primary">Jouer</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card custom-card h-100">
                <img src="/assets/images/hack_my_world/logo.jpg" class="card-img-top" alt="Hack My World">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-center">Hack My World</h5>
                    <p class="card-text text-center flex-grow-1">Testez vos connaissances sur le développement web avec ce quizz interactif !</p>
                    <div class="d-flex justify-content-center">
                        <a href="/HackMyWorld/index" class="btn btn-primary">Jouer</a>
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
                        <a href="/jeu-memory/index" class="btn btn-primary">Jouer</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>