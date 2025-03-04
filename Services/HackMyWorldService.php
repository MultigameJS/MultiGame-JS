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
    
        // 1) Récupérer le meilleur score existant de l'utilisateur
        $bestScore = $this->repository->getBestScore($userId);
    
        // 2) Si aucun score n'existe en base, on crée un nouveau score
        if (!$bestScore) {
            $data = [
                'user_id'    => $userId,
                'score'      => $score,
                'streak'     => $streak,
                'created_at' => date('Y-m-d H:i:s')
            ];
    
            $this->repository->createScore($data);
    
            return [
                'status'  => 'success',
                'message' => 'Premier score enregistré !',
                'score'   => $score
            ];
        }
    
        // 3) Si un score existe déjà, on le met à jour seulement si le nouveau est meilleur
        if ($score > $bestScore->score) {
            $data = [
                'user_id'    => $userId,
                'score'      => $score,
                'streak'     => $streak,
                'created_at' => date('Y-m-d H:i:s')
            ];
    
            $this->repository->updateScore($bestScore->id, $data);
    
            return [
                'status'  => 'success',
                'message' => 'Nouveau meilleur score enregistré !',
                'score'   => $score
            ];
        }
    
        // 4) Sinon, on renvoie un message indiquant que le score n'est pas meilleur
        return [
            'status'  => 'info',
            'message' => 'Votre score n\'est pas meilleur que le précédent.',
            'score'   => $bestScore->score
        ];
    }
    
}
