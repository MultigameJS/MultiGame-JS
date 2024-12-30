<?php
$css = 'register';
?>
    <section>
        <div class="container ct col-12 col-md-12 col-lg-8">
            <h2 class="mb-5">Connexion</h2>
            <form action="/log/login" method="post" enctype="multipart/form-data">
                <div class="mb-5">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" name="email">
                </div>
                <div class="mb-5">
                    <label for="password">Mot de passe</label>
                    <input type="password" class="form-control" id="password" name="password">
                </div>
                <div class="mb-5">
                    <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token']; ?>">
                </div>
                <div class="mb-5">
                    <button type="submit" id="submit" class="btn w-100">Connexion</button>
                </div>
            </form>
            <a href="/register" class="tw">Pas encore inscrit ?</a>
            <div>
                <div id="error-message" class="alert alert-danger" role="alert"></div>
                <div id="success-messages" class="alert alert-success" role="alert"></div>
            </div>
        </div>
    </section>