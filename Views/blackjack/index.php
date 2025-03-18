<?php
$css = 'blackjack';
?>
<section class="blackjack">
    <div class="container">
        <h1>Blackjack Royal</h1>
        <div class="game-area">
            <div class="dealer-area">
                <h2 class="player-title">
                    <i class="fas fa-user-tie"></i>Main du Croupier
                </h2>
                <div id="dealer-cards" class="cards"></div>
                <div id="dealer-score" class="score">Score: 0</div>
            </div>

            <div id="message" class="message"></div>

            <div class="player-area">
                <h2 class="player-title">
                    <i class="fas fa-user"></i>Votre Main
                </h2>
                <div id="player-cards" class="cards"></div>
                <div id="player-score" class="score">Score: 0</div>
            </div>

            <div class="controls">
                <button id="hit-button">
                    <i class="fas fa-hand-paper"></i>Tirer
                </button>
                <button id="stand-button">
                    <i class="fas fa-hand-rock"></i>Rester
                </button>
                <button id="new-game-button">
                    <i class="fas fa-redo"></i>Nouvelle Partie
                </button>
            </div>
        </div>
    </div>
</section>

<?php
$game = "blackjack/main";