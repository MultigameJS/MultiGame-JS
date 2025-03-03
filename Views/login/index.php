<?php
$css = 'register';
?>
    <section class="mb-5 mt-5">
    <div class="container responsive-form">
        <h2 class="mb-5">Connexion</h2>
        <form action="/Log/login" method="POST" enctype="multipart/form-data">
            <div class="form-group mb-5">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" name="email">
            </div>
            <div class="form-group mb-5">
                <label for="password">Mot de passe</label>
                <input type="password" class="form-control" id="password" name="password">
            </div>
            <div class="form-group mb-5">
                <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token']; ?>">
            </div>
            <div class="form-group mb-5">
                <button type="submit" id="submit" class="btn w-100">Connexion</button>
            </div>
        </form>
        <a href="/register" class="tw">Pas encore inscrit ?</a>
        <div id="messages">
            <div id="error-message" class="alert alert-danger" role="alert"></div>
            <div id="success-message" class="alert alert-success" role="alert"></div>
        </div>
    </div>
</section>