<?php

namespace App\Repository;

class RacingRepository extends DbRepository
{
    public function __construct()
    {
        $this->table = 'Racing';
    }
}