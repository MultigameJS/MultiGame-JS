<?php

namespace App\Services;

use App\Models\JustPriceModel;
use App\Repository\JustPriceRepository;

class JustPriceService
{

    public function SaveScore() // passer un parametre dans ma fonction
    {
        $justPriceModel = new JustPriceModel();
        $justPriceRepository = new JustPriceRepository();


        if (empty($_POST["time"]) || empty($_POST["score"])) { // function isset = si variable existe et empty => si elle existe et si elle est vide
            echo json_encode(["status" => "error", "message" => "veuillez compléter tous les champs"]); // status car statu actuel on verifie s'il est = à erreur. encode la reponse à afficher / "error" car si ne renvoi pas success 200 trame à respecter
        }

        $score = floatval($_POST["score"]); // definie dans une variable pour indiquer que c est un float
        $time = floatval($_POST["time"]);
        $data = [

            "idUsers" => $_SESSION["id"],
            "score" => $score,
            "time" => $time
        ];

        if (!$score <= 0) {

            $justPriceModel->hydrate($data); // car model qui hydrate
            $justPriceRepository->create($data); // car crud dans dbrepo
            echo json_encode(["status" => "success", "message" => "Votre Score est enregistré"]); // enregistrer en BDD
        }
    }
}
