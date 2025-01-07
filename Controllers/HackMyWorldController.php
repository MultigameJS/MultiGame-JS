<?php

namespace App\Controllers;

use App\Repository\HackMyWorldRepository;
use App\Services\HackMyWorldService;

class HackMyWorldController extends Controller
{
    // Affiche la page du jeu
    public function index()
    {
        $this->render('hack_my_world/index');
    }

    // Fonction pour enregistrer le score
    public function saveScore()
    {
        // Démarrer la session si elle n'est pas active
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Récupérer les données envoyées
        $input = json_decode(file_get_contents('php://input'), true);
        $score = $input['score'] ?? null;
        $csrfToken = $input['csrf_token'] ?? '';

        // Vérifier si l'utilisateur est connecté
        if (!isset($_SESSION['id'])) {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Utilisateur non connecté']);
            return;
        }

        // Vérification du token CSRF
        if (!isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $csrfToken)) {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Jeton CSRF invalide']);
            return;
        }

        // Vérification du score
        if ($score === null) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Score non fourni']);
            return;
        }

        // Appeler le service pour gérer le score
        $service = new HackMyWorldService();
        $response = $service->saveScore($_SESSION['id'], $score, $input['streak'] ?? 0);

        // Retourner la réponse
        echo json_encode($response);
    }

    // Récupérer le meilleur score
    public function getBestScore()
    {
        // Démarrer la session si elle n'est pas active
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Vérifier si l'utilisateur est connecté
        if (!isset($_SESSION['id'])) {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Utilisateur non connecté']);
            return;
        }

        // Récupérer le meilleur score
        $userId = $_SESSION['id'];
        $repository = new HackMyWorldRepository();
        $bestScore = $repository->getBestScore($userId);

        // Retourner le meilleur score ou null si aucun score trouvé
        echo json_encode([
            'status' => 'success',
            'score' => $bestScore->score ?? null,
            'streak' => $bestScore->streak ?? null,
        ]);
    }
}
