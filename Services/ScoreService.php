<?php

namespace App\Services;

use App\Repository\ScoreRepository;
use App\Models\MemoryModel;

class ScoreService
{
    private $scoreRepository;

    public function __construct()
    {
        $this->scoreRepository = new ScoreRepository();
    }

    // Méthode pour enregistrer un score
    public function saveScore(MemoryModel $memoryModel)
    {
        // Utilisation de la méthode getCreatedAt() du modèle MemoryModel pour obtenir la date actuelle
        return $this->scoreRepository->saveScore(
            $memoryModel->getUserId(),    // ID de l'utilisateur
            $memoryModel->getScore(),     // Le score
            $memoryModel->getDate()  // La date (getCreatedAt doit renvoyer un format de date)
        );
    }

    // Méthode pour récupérer tous les scores
    public function getAllScores()
    {
        return $this->scoreRepository->findAll();
    }

    // Méthode pour récupérer les scores d'un utilisateur spécifique
    public function getScoresByUserId($userId)
    {
        return $this->scoreRepository->getUserScores($userId);
    }

    public function getLatestScores($userId)
    {
        // Récupérer les 3 derniers scores d'un utilisateur spécifique
        return $this->scoreRepository->getUserScores($userId, 3);
    }
}
