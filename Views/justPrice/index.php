<section class="bodys">

    <h1 class="pt-3">JUST PRICE</h1>

    <!-- CARDS ITEMS JUST PRICE -->
    <div class="container justp">
        <div class="cards-container">
            <div class="card" id="card3">
                <img src="/assets/images/justprice/Converse.jpg" alt="converse">
                <p class="heading">Converse Chuck 70 <br> Niveau Facile</p>
                <input type="number" id="play3" placeholder="Votre prix" class="hidden p-3 fs-6">
                <button id="button3" class="price-button hidden">Envoyer</button>
                <div class="textPlay"></div>
            </div>

            <div class="card" id="card1">
                <img src="/assets/images/justprice/iphoneia.jpg" alt="iphone">
                <p class="heading">iPhone <br> Niveau Moyen</p>
                <input type="number" id="play1" placeholder="Votre prix" class="hidden p-3 fs-6">
                <button id="button1" class="price-button hidden">Envoyer</button>
                <div class="textPlay"></div>
            </div>

            <div class="card" id="card2">
                <img src="/assets/images/justprice/tesla.jpg" alt="tesla">
                <p class="heading">Tesla Cybertruck <br> Niveau Difficile</p>
                <input type="number" id="play2" placeholder="Votre prix" class="hidden p-3 fs-6">
                <button id="button2" class="price-button hidden">Envoyer</button>
                <div class="textPlay"></div>
            </div>
        </div>
            <!-- BUTTON RETURN -->
    <div id="returnButton" class="centered hidden">
        <a href="#" class="btn-back">RETOUR</a>
    </div>
    </div>

    <form action="/JustPrice/SaveScore" class="hidden" id="saveScore">
        <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token']; ?>">
        <input type="number" id="idUsers" name="idUsers" value="<?php if (isset($_SESSION['id'])) {
                                                                    echo $_SESSION['id'];
                                                                } ?>">
        <input type="number" id="scoretimer" name="score">
    </form>

    <!-- COMMENTAIRES -->
    <div class="comments-section">
        <h2>Qu'avez-vous pensé du jeu ?</h2>
        <form action="/CommentJustPrice/addComment" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token']; ?>">
            <div class="comment-form">
                <label for="pseudo" class="form-label">Votre pseudo :</label>
                <input type="text" id="pseudo" name="pseudo" class="form-control mx-auto w-80" required>

                <label for="comment" class="form-label">Votre commentaire :</label>
                <textarea id="comment" name="comment" class="form-control mx-auto w-80" required></textarea>
                <div id="messages">
                    <div id="error-message" class="alert alert-danger" role="alert"></div>
                    <div id="success-message" class="alert alert-success" role="alert"></div>
                </div>
                <button type="submit" id="submitComment" class="submit-btn">Envoyer</button>
            </div>
        </form>

        <!-- LISTE COMMENTAIRES -->
        <div class="comments-container">
            <h3>Commentaires :</h3>
            <ul id="commentsList"></ul>
        </div>
    </div>

</section>

<?php
$game = "justprice/main";
$script = "justprice/comments";
$scripts = "justprice/fallingCoins";
$css = "justprice/justprice";
?>