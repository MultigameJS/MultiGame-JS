<?php
$css = 'register';
?>
<section class="mb-5 mt-5">
    <div class="container ct col-12 col-md-4 col-lg-8">
        <h2>Inscription</h2>
        <form method="POST" class="p-3" id="loginForm" action="/register/register">
            <div class="form-group mb-5">
                <label for="name">Pseudo :</label>
                <input type="text" name="name" id="name" class="form-control mb-3">
            </div>
            <div class="form-group mb-5">
                <label for="email">Email :</label>
                <input type="email" name="email" id="email" class="form-control mb-3">
            </div>
            <div class="form-group mb-5">
                <label for="password">Mot de passe :</label>
                <input type="password" name="password" id="password" class="form-control mb-3">
            </div>
            <div class="form-group mb-5">
                <label for="confirmPassword">Confirmation du mot de passe :</label>
                <input type="Password" name="confirmPassword" id="confirmPassword" class="form-control mb-3">
            </div>
            <div class="formLogin mb-5">
                <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token']; ?>">
                <button type="submit" id="submit" class="btn w-100">Inscription</button>
            </div>
        </form>
        <div id="error-messages" class="alert alert-danger" role="alert"></div>
        <div id="success-messages" class="alert alert-success" role="alert"></div>
    </div>
</section>