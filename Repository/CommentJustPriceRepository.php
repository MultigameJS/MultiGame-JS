<?php

namespace App\Repository;

use MongoDB\BSON\ObjectId; // VOIR YO CAR FONCTIONNE PAS 
use App\Repository\DbMongo;

class CommentJustPriceRepository
{
    private DbMongo $db;
    private string $collection = "justpriceComments"; // NOM DE LA COLLECTION MONGODB

    public function __construct()
    {
        $this->db = new DbMongo(); // INSTANCIATION DE DBMONGO
    }

    public function save(array $data): string
    {
        return $this->db->create($this->collection, $data);
    }

    public function getAll(): array
    {
        return $this->db->findAll($this->collection);
    }

    public function deleteById(string $id): bool
    {
        return $this->db->delete($this->collection, ['_id' => $id]) > 0; 
        // return $this->db->delete($this->collection, ['_id' => new ObjectId($id)]) > 0; // VOIR YO DEBUG CAR J AI VERIFIER PHP INI COMPOSER ET VERSION SUR MON PC
    }
}
