<?php

namespace App\Services;

use App\Repository\CommentJustPriceRepository;
use App\Models\CommentJustPriceModel;

class CommentJustPriceService
{
    private CommentJustPriceRepository $repository;

    public function __construct()
    {
        $this->repository = new CommentJustPriceRepository();
    }

    public function saveComment(array $data): bool
    {
        $data = [
            "pseudo" => $data["pseudo"],
            "comment" => $data["comment"],
        ];

        $commentJustPriceModel = new CommentJustPriceModel();
        $commentJustPriceModel-> hydrate($data);

        $alias = "justpriceComments";
        $commentJustPriceRepository = new CommentJustPriceRepository();

        return $commentJustPriceRepository->create($alias, $data);

        echo json_encode($data);
    }

    public function getAllComments(): array
    {
        return $this->repository->getAll();
    }
}
