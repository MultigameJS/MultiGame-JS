<?php

namespace App\Controllers;

use App\Repository\HackMyWorldRepository;
use App\Services\HackMyWorldService;

class HackMyWorldController extends Controller
{

    //affiche la page du jeu
    public function index()
    {
       
        $this->render('hack_my_world/index');
    }

    //enregistre le score
    public function saveScore()
    {
        // Démarrer la session si elle n'est pas déjà active
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    
        // Lire les données de la requête POST
        $input = json_decode(file_get_contents('php://input'), true);
        $csrfToken = $input['csrf_token'] ?? '';
    
        // **Étape 1 : Débogage pour les tokens**
        error_log('CSRF Token attendu : ' . ($_SESSION['csrf_token'] ?? 'Aucun token dans la session'));
        error_log('CSRF Token reçu : ' . $csrfToken);
    
        // **Étape 2 : Vérification du token CSRF**
        if (!isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $csrfToken)) {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Jeton CSRF invalide']);
            return;
        }
    
        // **Étape 3 : Vérifiez si l'utilisateur est connecté**
        if (!isset($_SESSION['id'])) {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Utilisateur non connecté']);
            return;
        }
    
        // **Étape 4 : Vérifiez les données envoyées**
        $userId = $_SESSION['id'];
        $score = $input['score'] ?? null;
        $streak = $input['streak'] ?? null;
    
        if ($score === null || $streak === null) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Données manquantes']);
            return;
        }
    
        // **Étape 5 : Enregistrer le score**
        $service = new HackMyWorldService();
        $service->saveScore($userId, $score, $streak);
    
        // Réponse en cas de succès
        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => 'Score enregistré avec succès']);
    }
    


//recupere le meilleur score
public function getBestScore()
{
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Utilisateur non connecté']);
        return;
    }

    $userId = $_SESSION['user_id'];
    $repository = new HackMyWorldRepository();
    $bestScore = $repository->getBestScore($userId);

    echo json_encode($bestScore);
}

}
