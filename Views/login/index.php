<section class="text-center d-flex justify-content-center align-items-center">
    <div class="container p-4 col-12 col-md-8 col-lg-4">
        <h2>Connexion</h2>
        <form action="/log/login" method="post" enctype="multipart/form-data">
        <div class="mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" name="email">
                </div>
                <div class="mb-3">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" name="password">
                </div>
                <div class="mb-3">
                    <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token']; ?>">
                </div>
                <div class="mb-3">
                <button type="submit" id="submit" class="btn border w-50">Connexion</button> 
                </div>
        </form>
        <a href="/register" class="tw">Pas encore inscrit ?</a>
        <div>
            <div id="error-message" class="alert alert-danger" role="alert"></div>
            <div id="success-message" class="alert alert-success" role="alert"></div>
        </div>
    </div>    
</section>