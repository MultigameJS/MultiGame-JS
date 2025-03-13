<section class="bodys">

    <h1>JUST PRICE</h1>

    <!-- BACKGROUND MAIN -->
    <div class="container justp"></div>

    <!-- CARDS ITEMS JUST PRICE -->
    <div class="cards-container">
        <div class="card" id="card1">
            <img src="/assets/images/justprice/iphoneia.jpg" class="card-img-top" alt="iphone">
            <p class="heading">iPhone</p>
            <input type="number" id="play1" placeholder="Votre prix" class="hidden">
            <button id="button1" class="price-button hidden">Envoyer</button>
            <div class="textPlay"></div>
        </div>
        <div class="card" id="card2">
            <img src="/assets/images/justprice/tesla.jpg" class="card-img-top" alt="tesla">
            <p class="heading">Tesla Cybertruck</p>
            <input type="number" id="play2" placeholder="Votre prix" class="hidden">
            <button id="button2" class="price-button hidden">Envoyer</button>
            <div class="textPlay"></div>
        </div>
        <div class="card" id="card3">
            <img src="/assets/images/justprice/Converse.jpg" class="card-img-top" alt="converse">
            <p class="heading">Converse Chuck 70</p>
            <input type="number" id="play3" placeholder="Votre prix" class="hidden">
            <button id="button3" class="price-button hidden">Envoyer</button>
            <div class="textPlay"></div>
        </div>
    </div>
    </div>

    <form action="/JustPrice/SaveScore" class="hidden form">

        <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token']; ?>">
        <input type="number" id="idUsers" name="idUsers" value="<?= $_SESSION['id']; ?>">
        <input type="number" id="scoretimer" name="score" value="">  <!-- YO -> le parseInt en back ou js -->
        <div id="messages">
            <div id="error-message" class="alert alert-danger" role="alert"></div>
            <div id="success-message" class="alert alert-success" role="alert"></div>
        </div>
    </form>

    <!-- COMMENTAIRES -->
    <div class="comments-section">
    <h2>Qu'avez-vous pensé du jeu ?</h2>
    <form class="formplay" action="/CommentJustPrice/addComment" method="POST">
        <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token']; ?>">
        <div class="comment-form">

            <label for="pseudo" class="form-label">Votre pseudo :</label>
            <input type="text" id="pseudo" name="pseudo" required> 

            <label for="comment" class="form-label">Votre commentaire :</label>
            <textarea id="comment" name="comment" required></textarea> 

            <button type="button" id="submitComment" class="submit-btn">Envoyer</button>
        </div>
    </form>

    <!-- LISTE COMMENTAIRES -->
    <div class="comments-container">
        <h3>Commentaires</h3>
        <ul id="commentsList"></ul>
    </div>
</div>

</section>

<?php
$game = "justprice/main";
$script = "justprice/comments";
$css = "justprice/justprice";
