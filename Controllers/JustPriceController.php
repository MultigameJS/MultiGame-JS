<?php

namespace App\Controllers;

use App\Services\CommentJustPriceService;
use App\Services\JustPriceService;

class JustPriceController extends Controller
{

    public function Index()
    {
        $comment = new CommentJustPriceService();
        $comments = $comment->getAllComments();
        $this->render("justPrice/index", compact("comments"));
    }

    public function SaveScore() // verification du champ test1 et 2 (name dans mon input dans html)
    {
        if ($_SERVER["REQUEST_METHOD"] === "POST") { // REQUEST_METHOD sert à = verifier si la requete de la methode est strictement egal a POST
     // on place la super global post (la requete) dans ma variable $data
            $justPriceService = new JustPriceService(); // permet d envoyer les donnees au service concerné (ou model si on utilise pas repo et service)
            $justPriceService->SaveScore(); // on reprend $ data qui comporter tout les elements de mon POST ey le renvoyé au service
            // utilisé la fonction dont on a besoin dans le service en question
            // on renvoi la paire clé(status)/valeur(success ou error ou message) au fetch
        } else { // RAPPEL pas de parametre () en else !
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Ce n'est pas une requête POST"]); // si pas req POST messge error
        }
    
    } 
}
