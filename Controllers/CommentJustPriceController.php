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
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = $_POST;
            $this->service->saveComment($data);
        }else{
            echo json_encode(["status" => "error", "message" => "Méthode non authoriser"]);
        }
    }

    // LISTE DES COMMENATIRES EXISTANTS
    public function listComments()
    {
        $comments = $this->service->getAllComments();
        echo json_encode($comments);
    }
}
