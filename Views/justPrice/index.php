<body class="bodys">

<h1>JUST PRICE</h1>

<!-- BACKGROUND MAIN -->
<div class="container justp"></div>


<!-- CARDS ITEMS JUST PRICE -->
<div class="cards-container">
<form id="gameTimer">
    <input type="hidden" id="timer" name="timer" value="0"> <!-- VALIDER AVEC YOYO TIMER CACHE QUI DEMARRE A 0 ??  -->
    <input type="hidden" id="csrf" name="csrf_token" value="<?= $_SESSION['csrf_token']; ?>"> <!-- VALIDER AVEC YOYO a l interieur je dois avoir tout ce que je veux envoyer score... -->
</form>    
    <div class="card" id="card1">
        <img src="/assets/images/justprice/iphoneia.jpg" class="card-img-top" alt="iphone">
        <p class="heading">iPhone</p>
        <input type="number" name="play1" id="play1" placeholder="Votre prix" class="d-none">
        <button id="button1" class="price-button">MOYEN</button>
        <div class="textPlay" id="textPlay"></div>
    </div>
    <div class="card" id="card2">
        <img src="/assets/images/justprice/tesla.jpg" class="card-img-top" alt="tesla">
        <p class="heading">Tesla Cybertruck</p>
        <input type="number" name="play2" id="play2" placeholder="Votre prix" class="d-none">
        <button id="button2" class="price-button">DIFFICILE</button> <!-- VOIR YO DATA-CARD POUR EVITER LES ID CE QU IL EN PENSE ?  -->
        <div class="textPlay" id="textPlay"></div>
    </div>
    <div class="card" id="card3">
        <img src="/assets/images/justprice/Converse.jpg" class="card-img-top" alt="converse">
        <p class="heading">Converse Chuck 70</p>
        <input type="number" name="play3" id="play3" placeholder="Votre prix" class="d-none">
        <button id="button3" class="price-button">FACILE</button>
        <div class="textPlay" id="textPlay"></div>
    </div>
</div>

</body>

<?php
$game = "justprice/main";
$css = "justprice/justprice";
