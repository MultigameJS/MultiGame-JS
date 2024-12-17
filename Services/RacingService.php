<?php

namespace App\Services;

use App\Models\RacingModel;
use App\Repository\RacingRepository;

class RacingService
{
    public function saveScore($data)
    {
        $racingModel = new RacingModel();
        $racingRepository = new RacingRepository();

        // Trouver le score existant pour l'utilisateur
        $racing = $racingRepository->findBy(['id_user' => $_SESSION['id']]);
        foreach ($racing as $r) {;
            $id = $r->id;
            $existingScore = $r->score;
        }

        // Si aucune entrée n'existe pour cet utilisateur
        if (!$racing || empty($racing)) {
            $racingModel->hydrate($data);
            $racingRepository->create($data);
        } else {

            // Mettre à jour uniquement si le nouveau score est supérieur
            if ($data['score'] < $existingScore) {
                $racingModel->hydrate($data);

                // Mise à jour dans la base de données
                $racingRepository->update($id, $data);
            }
        }
    }
}