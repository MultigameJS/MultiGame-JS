<?php

namespace App\Services;

use App\Models\RacingModel;
use App\Repository\RacingRepository;

class RacingService
{
    public function saveScore($data)
    {
        $racingModel = new RacingModel();
        $racingModel->hydrate($data);

        $racingRepository = new RacingRepository();
        $racingRepository->create($data);
    }
}