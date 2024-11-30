<div class="container">
    <div class="row">
        <div class="col-md-6">
            <h1>Login</h1>
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
                    <div id="error-message" class="alert alert-danger" role="alert"></div>
                    <div id="success-message" class="alert alert-success" role="alert"></div>
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>