<?php

namespace App\Repository;

class JustPriceRepository extends DbRepository
{
    public function __construct()
    {
        $this->table = "justPrice"; // appel de la table du jeu
    }
}    
