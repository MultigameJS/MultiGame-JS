<?php
$title = 'Commentaires Racing';
$css = 'racing/comment';
?>

<div class="container">
    <section class="activities mb-5 w-50" data-refresh-url="/profile/activities<?= $_SESSION['id'] ?>">
        <ul class="list-group">
            <?php foreach ($comments as $comment): ?>
                <li class="list-group-item mb-3 position-relative">
                    <p><?= $name; ?></p>
                    <p><?= nl2br($comment['message'] ?? ''); ?></p>
                    <small class="text-muted">
                        Publié le : <?= $comment['created_at']->toDateTime()->format('d/m/Y H:i:s'); ?>
                    </small>
                    <?php if ($comment['user_id'] == $_SESSION['id'] || $_SESSION['role'] === 'Admin'): ?>
                        <!-- Icône croix -->
                        <span class="delete-comment position-absolute top-0 end-0 me-2" data-comment-id="<?= $comment['_id']; ?>">
                            &times;
                        </span>
                    <?php endif; ?>
                </li>
            <?php endforeach; ?>
        </ul>
    </section>

    <section class="publish">
        <div class="card">
            <form method="POST" action="/racing/comment" enctype="multipart/form-data" data-refresh-target=".activities">
                <div class="card-body d-flex align-items-center">
                    <!-- Zone de texte -->
                    <textarea class="form-control me-3" name="message" id="message autoResize" rows="2" placeholder="Écrivez un message..." required></textarea>
                        <button type="submit" class="btn btn-danger">Envoyer</button>
                    <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
                </div>
            </form>
        </div>
        <div id="error-message" class="alert alert-danger" role="alert"></div>
    </section>
</div>

<?php
$script = 'racing/comment/comment';