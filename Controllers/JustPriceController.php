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

    public function SaveScore() 
    {
        if ($_SERVER["REQUEST_METHOD"] === "POST") { // REQUEST_METHOD = verifier si la requete de la methode est strictement egal a POST
            $justPriceService = new JustPriceService(); // PERMET D ENVOYER LES DONNEES AU SERVICE CONCERNÉ (OU MODEL SI ON UTILISE PAS REPO ET SERVICE)
            $justPriceService->SaveScore(); // ON REPREND $ DATA QUI COMPORTE TOUT LES ELEMENTS DE POST + RENVOI AU SERVICE          
        } else {  // ON RENVOI LA PAIRE CLÉ(STATUS)/VALEUR(SUCCESS OU ERROR OU MESSAGE) AU FETCH
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Ce n'est pas une requête POST"]); 
        }
    
    } 
}
