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

// VOIR YOYO J AI ENLEVER TIME 
        if (empty($_POST["score"])) { // function isset = si variable existe et empty => si elle existe et si elle est vide
            echo json_encode(["status" => "error", "message" => "veuillez compléter tous les champs"]); // status car statu actuel on verifie s'il est = à erreur. encode la reponse à afficher / "error" car si ne renvoi pas success 200 trame à respecter
        // VOIR YO AJOUTER RETURN OU EXIST ?? SI UN CHAMP EST VIDE...
        }

        $score = floatval($_POST["score"]); // definie dans une variable pour indiquer que c est un float
        // $time = floatval($_POST["time"]); VOIR YO SI OK POUR ENLEVER
        $userId = $_SESSION["id"];

        if ($score <= 0) {
            echo json_encode(["status" => "error", "message" => "Le score doit être supérieur à 0 "]); }

            $data = [
                "idUsers" => $userId,  
                "score" => $score,
                "time" => $score // VOIR YO POUR LA MODIF DE TIME EN $SCORE CAR TIME = SCORE ? 
            ];

            $justPriceModel->hydrate($data); // car model qui hydrate
            $justPriceRepository->create($data); // car crud dans dbrepo
            $justPriceRepository->update($userId, ["score" => $score, "time" => $score]);

            echo json_encode(["status" => "success", "message" => "Votre Score est enregistré"]);
    }
}