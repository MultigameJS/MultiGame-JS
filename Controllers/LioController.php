<?php

namespace App\Controllers;

use App\Repository\FlapiRepository;
use App\Services\FlapiService;

class LioController extends Controller
{
    // Affichage du jeu
    public function index()
    {
        $FlapiRepository = new FlapiRepository();
        $scores = $FlapiRepository->findAll();

        $this->render('lio/index', compact('scores'));
    }

    // Ajouter un score
    public function saveScore()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $data = [
                'pseudo' => $_POST['pseudo'] ?? null,
                'score' => $_POST['score'] ?? null,
                'date' => date('Y-m-d H:i:s'),
            ];

            $FlapiRepository = new FlapiRepository();
            $result = $FlapiRepository->createPseudo(
                $data['pseudo'],
                $data['score'],
                $data['date']
            );

            if ($result) {
                echo json_encode(['status' => 'success', 'message' => 'Score enregistré.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Erreur d\'enregistrement.']);
            }
            exit();
        }
        $this->render('lio/index');
    }

    public function updateScore($id)
    {
        $flapiRepository = new FlapiRepository();
        $flapiService = new FlapiService();

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $flapiService->updateScore($id);
        }
        $flapiRepository = new FlapiRepository();
        $flapi = $flapiRepository->find($id);

        if (!$flapi) {
            throw new \Exception("Score introuvable.");
        }
    }
}
