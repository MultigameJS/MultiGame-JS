<?php

namespace App\Repository;

class FlapiRepository extends DbRepository
{
    public function __construct()
    {
        $this->table = 'flapi';
    }

    public function createPseudo($pseudo, $score, $date)
{
    return $this->req(
        "INSERT INTO " . $this->table . " (pseudo, score, date)
        VALUES (:pseudo, :score, :date)",
        [
            'pseudo' => $pseudo,
            'score' => $score,
            'date' => $date,
        ]
    );
}

public function update($id, array $data): bool{

    $sql = "UPDATE " . $this->table . " SET score = :score, date = :date WHERE id = :id";
    return $this->req($sql, [

       'score' => $data['score'],
       'date' => $data['date'],
       'id' => $id,
    ]);
}

}
