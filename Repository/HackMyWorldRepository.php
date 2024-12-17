<?php

namespace App\Repository;


class HackMyWorldRepository extends DBRepository
{

    public function __construct()
    {
        parent::__construct();
        $this->table = 'HackMyWorld';
    }


    // creer un score
    public function createScore($data)
    {
        return $this->create($data); // Appelle directement la méthode create() du parent DBRepository
    }



    // recuperer les scores
    public function getBestScore($userId)
    {
        return $this->findBy(['user_id' => $userId], ['score' => 'DESC']);
    }


    //mettre a jours un score
    public function updateScore($id, $data)
    {
        return $this->update($id, $data);
    }

}
