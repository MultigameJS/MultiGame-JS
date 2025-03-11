<?php

namespace App\Services;

use App\Repository\CommentJustPriceRepository;

class CommentJustPriceService
{
    private CommentJustPriceRepository $repository;

    public function __construct()
    {
        $this->repository = new CommentJustPriceRepository();
    }

    public function saveComment(string $pseudo, string $comment): bool
    {
        $data = [
            "pseudo" => $pseudo,
            "comment" => $comment,
            "created_at" => new \MongoDB\BSON\UTCDateTime() // VOIR YOYO pour le debgu dans le repo
        ];

        return (bool) $this->repository->save($data);
    }

    public function getAllComments(): array
    {
        return $this->repository->getAll();
    }
}
