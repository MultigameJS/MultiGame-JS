<?php

namespace App\Services;

use App\Repository\DbMongo;

class CommentJustPriceService
{
    public function saveComment(array $data)
    {
        $data = [
            "pseudo" => $data["pseudo"],
            "comment" => $data["comment"],
        ];

        $commentJustPriceRepository = new DbMongo();

        $commentJustPriceRepository->create("justpriceComments", $data);

        echo json_encode(["status" => "success", "message" => "Comentaire envoyer"]);
    }

    public function getAllComments()
    {
        $CommentJustPrice = new DbMongo();
        $comment = $CommentJustPrice->findAll("justpriceComments");
        return $comment;
    }
}
