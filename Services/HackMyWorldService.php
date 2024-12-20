<?php

namespace App\Services;

use App\Repository\HackMyWorldRepository;

class HackMyWorldService
{
    private $repository;

    public function __construct()
    {
        $this->repository = new HackMyWorldRepository();
    }

    // Sauvegarder le score d'un joueur
    public function saveScore($userId, $score, $streak)
    {
        error_log("Score reçu : " . $score);
        error_log("Streak reçu : " . $streak);

        // Étape 1 : Récupérer le meilleur score existant de l'utilisateur
        $bestScore = $this->repository->getBestScore($userId);

        // Étape 2 : Comparer les scores
        if (!$bestScore || $score > $bestScore->score) { 
            // Construire les données pour l'insertion ou la mise à jour
            $data = [
                'user_id' => $userId,
                'score' => $score,
                'streak' => $streak,
                'created_at' => date('Y-m-d H:i:s')
            ];

            if ($bestScore) {
                // Mise à jour si un score existe déjà
                $this->repository->updateScore($bestScore->id, $data);
            } else {
                // Insérer un nouveau score
                $this->repository->createScore($data);
            }

            return [
                'status' => 'success',
                'message' => 'Nouveau meilleur score enregistré !',
                'score' => $score
            ];
        }

        // Étape 3 : Retourner un message si le score n'est pas meilleur
        return [
            'status' => 'info',
            'message' => 'Votre score n\'est pas meilleur que le précédent.',
            'score' => $bestScore->score ?? null
        ];
    }
}
