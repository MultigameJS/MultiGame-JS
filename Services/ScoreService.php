<?php

namespace App\Services;

use App\Repository\ScoreRepository;

class ScoreService
{
    private $scoreRepository;

    public function __construct()
    {
        $this->scoreRepository = new ScoreRepository();
    }

    public function saveScore($userId, $score)
    {
        return $this->scoreRepository->save(['user_id' => $userId, 'score' => $score]);
    }

    public function getAllScores()
    {
        return $this->scoreRepository->findAll();
    }

    public function getScoresByUserId($userId)
    {
        return $this->scoreRepository->findByUserId($userId);
    }
}
