<?php

namespace App\Services;

use App\Models\JustPriceModel;
use App\Repository\JustPriceRepository;

class JustPriceService
{

    public function SaveScore() 
    {
        $justPriceModel = new JustPriceModel();
        $justPriceRepository = new JustPriceRepository();


        if (empty($_POST["score"])) { 
            echo json_encode(["status" => "error", "message" => "veuillez compléter tous les champs"]); 
            exit;
        }

        $score = floatval($_POST["score"]); // DEFINIE DANS UNE VARIABLE POUR INDIQUER QUE C EST UN FLOAT
        $userId = $_SESSION["id"];

        if ($score <= 0) {
            echo json_encode(["status" => "error", "message" => "Le score doit être supérieur à 0 "]);
            exit;
        }

        $justPriceFind = $justPriceRepository->findOneBy(["idUsers" => $userId]);
        
        $data = [
            "idUsers" => $userId,
            "score" => $score,
        ];

        $justPriceModel->hydrate($data);
        
        if ($justPriceFind->score > $score) {
            
            $justPriceRepository->update($justPriceFind->id, $data);
            
        } else { // SI DEJA UN SCORE ET QUE LE SCORE EN BDD EST + GRAND QUE LE SCORE REALISER ON UDPATE LE SCORE
            $justPriceRepository->create($data);
        }

        echo json_encode(["status" => "success", "message" => "Votre Score est enregistré"]);
        exit;
    }
}
