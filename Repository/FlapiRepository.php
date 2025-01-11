<?php

namespace App\Repository;

class FlapiRepository extends DbRepository
{
    public function __construct()
    {
        $this->table = 'Space';
    }

    public function createPseudo($pseudo)
    {
        return $this->req(
            "INSERT INTO " . $this->table . " (pseudo)
            VALUES (:pseudo)",
            [
                'pseudo' => $pseudo,
            ]
        );
    }


    public function findByPseudo($pseudo)
    {
        $result = $this->findBy(['pseudo' => $pseudo]);

        return $result ? $result[0] : null;
    }
}
