<h1>JUST PRICE</h1>

<!-- BACKGROUND MAIN -->
<div class="container"></div>


<form id="form" class="container g-3">
    <div class="form-group mb-5">
        <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token']; ?>">
    </div>
    <div class="col-md-6">
        <label for="test1" class="form-label">TIME</label>
        <input id="input1" type="text" name="time" class="form-control">
    </div>
    <div class="col-md-6">
        <label for="test2" class="form-label">SCORE</label>
        <input id="input2" type="text" name="score" class="form-control">
    </div>
    <div>
        <input id="user" type="hidden" name="idUsers" class="idUsers" value="<?= $_SESSION["id"]; ?>">
    </div>
    <div class="form-group mb-5">
        <button type="submit" id="submit" class="btn w-100">Connexion</button>
    </div>
    <div class="d-none" id="div">
        <p id="successParam"></p>
    </div>
    <div id="error" class="d-none">
        <p id="errorParam"></p>
    </div>
</form>

<!-- CARDS ITEMS JUST PRICE ? -->
<div class="cards-container">
    <div class="card" id="card1">
        <img src="/assets/images/justprice/iPhone.jpg" class="card-img-top" alt="iphone16">
        <p class="heading">iPhone 16</p>
        <p class="price-text">Juste prix ?</p>
    </div>
    <div class="card" id="card2">
        <img src="/assets/images/justprice/tesla.jpg" class="card-img-top" alt="tesla">
        <p class="heading">Tesla Cybertruck</p>
        <p class="price-text">Juste prix ?</p>
    </div>
    <div class="card" id="card3">
        <img src="/assets/images/justprice/Converse.jpg" class="card-img-top" alt="converse">
        <p class="heading">Converse Chuck 70</p>
        <p class="price-text">Juste prix ?</p>
    </div>
</div>

<?php
$game = "justprice/main";
$css = "justprice/justprice";
