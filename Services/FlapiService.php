<?php

namespace App\Services;

use App\Models\FlapiModel;
use App\Repository\FlapiRepository;


class FlapiService
{

    public function addScore($data)
    {
        $flapiRepository = new FlapiRepository();
        $FlapiModel = new FlapiModel();

        // Recherche des scores existants pour l'utilisateur actuel
        $flapi = $flapiRepository->findBy(['id_user' => $_SESSION['id']]);

        if (!$flapi || empty($flapi)) {
            // Si aucun score n'existe pour cet utilisateur, enregistrement d'un nouveau score
            $FlapiModel->hydrate($data);
            $flapiRepository->create($data);
        } else {
            foreach ($flapi as $f) {
                $id = $f->id;
                // Récupération du score existant
                $scoreexist = $f->score;
            }

            // Mise à jour du score si le nouveau score est plus élevé
            if ($data['score'] > $scoreexist) {
                $FlapiModel->hydrate($data);
                $flapiRepository->update($id, $data);
            }
        }
    }

}