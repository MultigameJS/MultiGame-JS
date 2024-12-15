<?php

namespace App\Repository;

class ScoreRepository extends DbRepository
{
    public function __construct()
    {
        $this->table = 'Memory';
    }

    public function findByUserId($userId)
    {
        return $this->req("SELECT * FROM " . $this->table . " WHERE user_id = ?", [$userId])->fetchAll();
    }

    public function save($data)
    {
        return $this->create($data);
    }

    public function findAll()
    {
        return $this->req("SELECT * FROM " . $this->table)->fetchAll();
    }
}
