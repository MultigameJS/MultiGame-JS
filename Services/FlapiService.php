<?php

namespace App\Services;

use App\Models\FlapiModel;
use App\Repository\FlapiRepository;


class FlapiService
{
    public function updateScore($flapiId)
    {

        $score = $input['score'] ?? null;
        $date = $_POST['date'] ?? null;

        $data =[
           'score' => $score,
           'date' => $date,
        ];

        // j'hydrate le model avec les nouvelle données

        $flapimodel = new FlapiModel();
        $flapimodel->hydrate($data);

        // j'instancie le repository
        $flapiRepository = new FlapiRepository();

        // j'update le score dans la base de données
        $success = $flapiRepository->update($flapiId, $data);

        if (!$success) {
            echo json_encode(['status' => 'error', 'message' => 'Erreur de mise à jour.']);
            exit();
        }else{
        // j'envoie une réponse JSON
        echo json_encode(['status' => 'success', 'message' => 'Score mis à jour.']);
        }
    }
}