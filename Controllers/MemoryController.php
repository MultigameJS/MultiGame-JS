<?php

namespace App\Controllers;

use App\Repository\ScoreRepository;
use App\Services\ScoreService;
use App\Repository\DbMongo;

class MemoryController extends Controller
{
    public function __construct()
    {
        // Si vous avez besoin d'un middleware pour vérifier si l'utilisateur est connecté, c'est ici.
        // Par exemple : $this->middleware('auth');
    }

    // Affiche la page du jeu
    public function index()
    {
        // Créer une instance du service pour obtenir les scores
        $scoreService = new ScoreService();
        // Si l'utilisateur est connecté, on récupère ses scores
        $scores = [];
        if (isset($_SESSION['id'])) {
            $userId = $_SESSION['id'];
            // Récupérer les 3 derniers scores
            $scores = $scoreService->getLatestScores($userId);
        }
        $dbMongo = new DbMongo();
        // Récupérer le dernier événement inséré
        $event = $dbMongo->getCollection('memory')->findOne([], ['sort' => ['_id' => -1]]);
        $this->render('jeu_memory/index', ['scores' => $scores, 'event' => $event]);
    }

    // Méthode pour soumettre le score
    public function submitScore()
    {
        // Vérifie que la méthode est bien PUT
        if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
            http_response_code(405);
            // Méthode non autorisée
            echo json_encode(["status" => "error", "message" => "Méthode non autorisée."]);
            exit;
        }
        // Vérifie le jeton CSRF
        $csrfToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
        if (empty($csrfToken) || $csrfToken !== $_SESSION['csrf_token']) {
            http_response_code(403);
            // Jeton CSRF invalide
            echo json_encode(["status" => "error", "message" => "Jeton CSRF invalide."]);
            exit;
        }

        // Traite la requête (enregistre le score)
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['score'])) {
            $currentDate = date('Y-m-d H:i:s');
            $scoreRepository = new ScoreRepository();
            $scoreRepository->saveScore($_SESSION['id'], $data['score'], $currentDate);

            // Réponse succès
            echo json_encode(["status" => "success", "message" => "Score enregistré avec succès."]);
        } else {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Score manquant."]);
        }
    }
}
