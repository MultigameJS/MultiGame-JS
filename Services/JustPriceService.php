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

        // VÉRIFICATION DE LA PRÉSENCE DU SCORE DANS LA REQUÊTE POST
        if (empty($_POST["score"])) { 
            echo json_encode(["status" => "error", "message" => "veuillez compléter tous les champs"]); 
            exit;
        }

        $score = floatval($_POST["score"]); // CONVERSION DU SCORE EN FLOAT POUR S'ASSURER DU BON TYPE DE DONNÉE
        $userId = $_SESSION["id"];

        if ($score <= 0) {
            echo json_encode(["status" => "error", "message" => "Le score doit être supérieur à 0 "]);
            exit;
        }

        // RÉCUPÉRATION DU SCORE EXISTANT DE L'UTILISATEUR EN BDD
        $justPriceFind = $justPriceRepository->findOneBy(["idUsers" => $userId]);
        
        $data = [
            "idUsers" => $userId,
            "score" => $score,
        ];

        // HYDRATATION DU MODEL AVEC LES NOUVELLES DATA
        $justPriceModel->hydrate($data);
        
        if ($justPriceFind->score > $score) { // VÉRIFICATION SI L'UTILISATEUR A DEJA UN SCORE ENREGISTRÉ
            // SI LE SCORE ACTUEL EST SUP AU NOUVEAU SCORE, ON MAJ EN BDD
            $justPriceRepository->update($justPriceFind->id, $data);
            
        } else { // SI AUCUN SCORE N'EST ENREGISTRÉ POUR L'UTILISATEUR, ON CRÉE UNE NOUVELLE ENTRÉE
            $justPriceRepository->create($data);
        }

        echo json_encode(["status" => "success", "message" => "Votre Score est enregistré"]);
        exit;
    }
}
