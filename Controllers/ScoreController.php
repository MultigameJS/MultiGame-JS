<?php

namespace App\Controllers;

use App\Repository\ScoreRepository;

class ScoreController extends Controller
{
    public function save()
    {
        //affiche un score
        $userId = $_POST['user_id']; 
        $score = $_POST['score']; 
    
        $repository = new ScoreRepository();
        $success = $repository->saveScore($userId, $score);
    
        echo json_encode(['success' => $success]);
    }
    
    // affiche le meilleur score
    public function bestScore()
{
    $userId = $_GET['user_id']; // Récupérez l'utilisateur connecté
    $repository = new ScoreRepository();
    $bestScore = $repository->getBestScoreByUser($userId);

    echo json_encode(['best_score' => $bestScore]);
}

    // affiche le classement général des 10 meilleurs scores
    public function leaderboard()
    {
        $repository = new ScoreRepository();
        $leaderboard = $repository->getLeaderboard();

        echo json_encode($leaderboard);
    }

}