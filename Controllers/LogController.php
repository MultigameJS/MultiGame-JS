<?php

namespace App\Controllers;

class LogController extends Controller
{
    /**
     * Displays the login form.
     *
     * Renders the login view where users can enter their email and password
     * to authenticate.
     *
     * @return void Outputs the rendered login view.
     */
    public function index()
    {
        // Render the login view
        $this->render('login/index');
    }
}