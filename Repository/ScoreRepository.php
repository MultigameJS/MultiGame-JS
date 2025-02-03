<?php

namespace App\Repository;
use App\Models\MemoryModel;

class ScoreRepository extends DbRepository
{
    public function __construct()
    {
        $this->table = 'Memory'; // La table s'appelle 'Memory'
    }

    // Méthode pour enregistrer un score dans la base de données
    public function saveScore($userId, $score, $date)
    {
        try {
            return $this->req(
                "INSERT INTO " . $this->table . " (user_id, score, date)
                 VALUES (:user_id, :score, :date)",
                 ['user_id' => $userId, 'score' => $score, 'date' => $date]
            );
        } catch (\PDOException $e) {
            // Afficher une erreur s'il y en a une
            echo "Erreur lors de l'enregistrement du score : " . $e->getMessage();
        }
    }
    
    // Méthode pour récupérer les scores d'un utilisateur (3derniers scores)
    public function getUserScores($userId)
    {
        return $this->req(
            "SELECT * FROM " . $this->table . " WHERE user_id = :user_id ORDER BY date DESC LIMIT 3",
            ['user_id' => $userId]
        )->fetchAll();
    }

    public function findAll()
    {
        // Récupérer tous les scores et les retourner sous forme d'objets MemoryModel
        return $this->req(
            "SELECT * FROM " . $this->table . " ORDER BY date DESC"
        )->fetchAll(\PDO::FETCH_CLASS, MemoryModel::class);  // Utilisation de MemoryModel::class
    }

}
