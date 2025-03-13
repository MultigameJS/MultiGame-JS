<!DOCTYPE html>
<html lang="fr">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="multigame est une plateforme de jeux">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Macondo&family=Jost:ital,wght@0,100..900;1,100..900&family=Press+Start+2P&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css'>
<link rel="icon" href="/assets/images/manette-de-jeu.png" type="image/x-icon">
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js"></script>
<link href="/assets/css/default.css" rel="stylesheet">
    <?php if (isset($css)): ?>
        <link href="/assets/css/<?= $css ?>.css" rel="stylesheet">
    <?php endif; ?>
    <?php if (isset($style)): ?>
        <link href="/assets/css/<?= $style ?>.css" rel="stylesheet">
    <?php endif; ?>
    <title><?php if (isset($title)) {
                echo $title;
            } ?></title>
</head>

<body>
    <nav class="navbar navbar-expand-lg" id="navbar">
        <div class="navtop container-fluid">
            <!-- Logo -->
            <a class="logo d-block" href="/">
                <img src="/assets/images/logoMultigame.webp" alt="LOGO">
            </a>

            <!-- Toggle button for mobile view -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Navbar content -->
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav ms-auto">
                    <!-- Authenticated user links -->
                    <?php if (isset($_SESSION['id'])): ?>
                        <li class="nav-item">
                            <a class="nav-link btn-connexion" href="/log/logout" onclick="return confirm('Êtes-vous sûr de vouloir vous déconnecter ?');">Déconnexion</a>
                        </li>
                    <?php else: ?>
                        <!-- Guest links -->
                        <li class="nav-item">
                            <a class="nav-link btn-connexion" href="/log">Connexion</a>
                        </li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    </nav>

    <main>
        <?= $contenu ?>
    </main>

    <footer class="footer-gaming text-center text-white py-4" id="footer">
        <div class="container">
            <h3>&copy; 2025 MultiGame-JS. Tous droits réservés.</h3>
            <p class="mt-2">Créé avec passion par la promotion Studi DevWeb Full Stack Mars 2025 et Juin 2025.</p>
            <div class="legal-links mt-4">
                <a href="/Cgu" class="legal-link">CGU</a>
                <span>|</span>
                <a href="/Rgpd" class="legal-link">RGPD</a>
                <span>|</span>
                <a href="/Mention" class="legal-link">Mentions légales</a>
            </div>
        </div>
    </footer>

    <?php if (isset($game)): ?>
        <script type="module" src="/assets/js/<?= $game ?>.js"></script>
    <?php endif; ?>
    <?php if (isset($script)): ?>
        <script src="/assets/js/<?= $script ?>.js"></script>
    <?php endif; ?>
    <?php if (isset($scripts)): ?>
        <script src="/assets/js/<?= $scripts ?>.js"></script>
    <?php endif; ?>
    <script src="/assets/js/fetchPost.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>

</html>