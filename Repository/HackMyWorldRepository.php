<?php

namespace App\Repository;

class HackMyWorldRepository extends DBRepository
{


    // creer un score
    public function createScore($data)
    {
        return $this->create($data);
    }


    // recuperer les scores
    public function getBestScore($userId)
    {
        return $this->findOneBy(['id_user' => $userId], ['score' => 'DESC']);
    }

    //mettre a jours un score
    public function updateScore($id, $data)
    {
        return $this->update($id, $data);
    }
}
