<?php

namespace App\Repository;

class ScoreRepository extends DBRepository 
{
    // ajoute un score
    public function saveScore(int $userId, int $score): bool
    {
        $data = [
            'user_id' => $userId,
            'score' => $score
        ];
        return $this->create($data);
    }

    // récupère le meilleur score d'un utilisateur
    public function getBestScoreByUser(int $userId): ?int
{
    $query = "SELECT MAX(score) AS best_score FROM scores WHERE user_id = ?";
    $result = $this->req($query, [$userId])->fetch();
    return $result ? (int)$result['best_score'] : null;
}

// récupère le classement global des 10 meilleurs scores
public function getLeaderboard(): array
{
    $query = "SELECT user_id, MAX(score) AS best_score FROM scores GROUP BY user_id ORDER BY best_score DESC LIMIT 10";
    return $this->req($query)->fetchAll();
}


}