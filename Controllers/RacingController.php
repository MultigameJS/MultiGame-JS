<?php

namespace App\Controllers;

use App\Repository\RacingRepository;
use App\Services\RacingService;

class RacingController extends Controller
{
    public function index()
    {    
        if(isset($_SESSION['id'])){
        $id = $_SESSION['id'];
        $racingRepository = new RacingRepository();
        $racing = $racingRepository->findBy(['id_user' => $id]);   
        $this->render('racing/index', ['racing' => $racing]);
        }else{
            $this->render('racing/index');
        }
    }

    public function game()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
            echo json_encode(['status' => 'error', 'message' => 'Méthode non autorisée']);
            return;
        }

        // Récupérer les données brutes
        $rawInput = file_get_contents('php://input');
        $data = json_decode($rawInput, true);

        if (!$data || !is_array($data)) {
            echo json_encode(['status' => 'error', 'message' => 'Données invalides']);
            return;
        }

        // Convertir le tableau en un tableau associatif
        $_PUT = [];
        foreach ($data as $pair) {
            if (is_array($pair) && count($pair) === 2) {
                $_PUT[$pair[0]] = $pair[1];
            }
        }

        // Vérifier les champs requis
        if (!isset($_PUT['id_user'], $_PUT['score'], $_PUT['csrf_token'])) {
            echo json_encode(['status' => 'error', 'message' => 'Champs manquants']);
            return;
        }

        // Vérification du CSRF token
        if (!isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $_PUT['csrf_token'])) {
            echo json_encode(['status' => 'error', 'message' => 'Jeton CSRF invalide']);
            return;
        }

        try {
            $racingService = new RacingService();
            $racingService->saveScore([
                'id_user' => (int)$_PUT['id_user'], // Convertir en entier
                'score' => (float)$_PUT['score'],   // Convertir en flottant
            ]);

            echo json_encode(['status' => 'success', 'message' => 'Score enregistré']);
        } catch (\Exception $e) {
            error_log('Erreur interne : ' . $e->getMessage());
            echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'enregistrement']);
        }
    }
}