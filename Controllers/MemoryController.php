<?php

namespace App\Controllers;

class MemoryController extends Controller
{
    public function index()
    {
        $this->render('jeu_memory/index');
    }
}