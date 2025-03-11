<?php

namespace App\Controllers;

use App\Services\CommentJustPriceService;

class CommentJustPriceController
{
    private CommentJustPriceService $service;

    public function __construct()
    {
        $this->service = new CommentJustPriceService();
    }

    // AJOUT D UN COMMENTAIRE
    public function addComment()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['pseudo']) && isset($data['comment'])) {
            $result = $this->service->saveComment($data['pseudo'], $data['comment']); // VOIR YO SI UTILISATION DE REQUETES OK

            echo json_encode(["success" => $result]);
        } else {
            echo json_encode(["success" => false, "error" => "Données invalides"]);
        }
    }

    // LISTE DES COMMENATIRES EXISTANTS
    public function listComments()
    {
        $comments = $this->service->getAllComments();
        echo json_encode($comments);
    }
}
