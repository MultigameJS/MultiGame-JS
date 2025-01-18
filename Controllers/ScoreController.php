<?php

namespace App\Controllers;

use App\Services\ScoreService;

class ScoreController extends Controller
{
    private $scoreService;

    public function __construct()
    {
        $this->scoreService = new ScoreService();
    }

    public function submitScore()
    {
        session_start();
        if (!isset($_SESSION['user_id'])) {
            http_response_code(403);
            echo json_encode(["status" => "error", "message" => "Vous devez être connecté pour enregistrer un score."]);
            exit();
        }

        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->scoreService->saveScore($_SESSION['user_id'], $data['score']);

        if ($result) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Erreur lors de l'enregistrement du score."]);
        }
    }

    public function showScores()
    {
        session_start();
        $scores = $this->scoreService->getAllScores();
        $this->render('scores/index', ['scores' => $scores]);
    }
}
