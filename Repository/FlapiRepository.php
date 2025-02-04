<?php

namespace App\Repository;

class FlapiRepository extends DbRepository
{
    public function __construct()
    {
        $this->table = 'flapi';
    }

}
