<?php
$title = 'Tableau des Scores';
$css = 'scores/style';
?>
<div class="container">
    <h1 class="title">Tableau des Scores</h1>

  
    <form method="POST" action="/submitScore">
        <div class="form-group">
            <label for="user_id">ID Utilisateur :</label>
            <input type="text" id="user_id" name="user_id" required>
        </div>
        
        <div class="form-group">
            <label for="score">Score :</label>
            <input type="number" id="score" name="score" required>
        </div>
        
        <div class="form-group">
            <button type="submit">Soumettre le Score</button>
        </div>
    </form>

    <div class="scores">
    <table>
        <thead>
            <tr>
                <th>ID Utilisateur</th>
                <th>Score</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($scores as $score): ?>
                <tr>
                    <td><?= htmlspecialchars($score->user_id); ?></td>
                    <td><?= htmlspecialchars($score->score); ?></td>
                    <td><?= date('Y-m-d H:i:s', strtotime($score->created_at)); ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
