<?php

namespace App\Services;

use App\Models\HackMyWorldModel;
use App\Repository\HackMyWorldRepository;

class HackMyWorldService
{

    //calcul des bonus streak
    public function calculateBonus($streak)
    {
        return pow(2, $streak - 1) * 20; // Bonus exponentiel
    }
    

    public function saveScore($userId, $score, $streak)
{

//enregistre ou met a jour le score
    $repository = new HackMyWorldRepository();

    // Récupérer le meilleur score de l'utilisateur
    $bestScore = $repository->getBestScore($userId);

    if (!$bestScore || $score > $bestScore['score']) {
        // Si aucun score ou meilleur score, insérer ou mettre à jour
        $data = [
            'id_user' => $userId,
            'score' => $score,
            'streak' => $streak,
            'created_at' => date('Y-m-d H:i:s'),
        ];
        if ($bestScore) {
            $repository->updateScore($bestScore['id'], $data);
        } else {
            $repository->createScore($data);
        }
    }
}

}