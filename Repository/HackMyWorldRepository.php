<?php

namespace App\Repository;

class HackMyWorldRepository extends DBRepository
{
    public function __construct()
    {
        parent::__construct();
        $this->table = 'HackMyWorld';
    }

    // Créer un score
    public function createScore($data)
    {
        return $this->create($data); // Appelle directement la méthode create() du parent DBRepository
    }

    // Récupérer le meilleur score pour un utilisateur
    public function getBestScore($userId)
    {
        $result = $this->findOneBy(['user_id' => $userId]); // Supposons un seul score par utilisateur
        error_log("Résultat pour user_id {$userId} : " . print_r($result, true));
        return $result;
    }

    // Mettre à jour un score
    public function updateScore($id, $data)
    {
        return $this->update($id, $data);
    }
}
