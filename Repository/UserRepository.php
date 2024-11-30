<?php

namespace App\Repository;

class UserRepository extends DBRepository
{
    public function __construct()
    {
        $this->table = 'User';
    }
}