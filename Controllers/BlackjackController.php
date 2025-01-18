<?php

namespace App\Controllers;

class BlackjackController extends Controller
{
    public function index(){
        $this->render('blackjack/index');
    }
}