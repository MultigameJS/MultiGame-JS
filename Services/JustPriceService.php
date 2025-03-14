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

        $justPriceFind = $justPriceRepository->find($userId);

        if (!$justPriceFind) {
            // ON VA CREER L UTILISATEUR S IL N EXISTE PAS EN BDD AVEC SON ID ET SONS CORE HYDRATER ET CREER
            $data = [
                "idUsers" => $userId,
                "score" => $score,
            ];
            $justPriceModel->hydrate($data);
            $justPriceRepository->create($data);
        } elseif ($justPriceFind->score > $score) { // SI DEJA UN SCORE ET QUE LE SCORE EN BDD EST + GRAND QUE LE SCORE REALISER ON UDPATE LE SCORE
            $justPriceRepository->update($userId, ["score" => $score]);
        }

        echo json_encode(["status" => "success", "message" => "Votre Score est enregistré"]);
        exit;
    }
}
