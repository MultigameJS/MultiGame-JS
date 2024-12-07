<?php

namespace App\Controllers;

class GameController extends Controller
{
    public function index(){
        $this->render('game/index');
    }
}