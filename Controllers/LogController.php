<?php

namespace App\Controllers;

use App\Services\LoginService;

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
        $this->render('login/index');
    }

    public function login()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(["status" => "error", "message" => "Méthode de requête non autorisée."]);
            exit();
        }else {
            $data = $_POST;
            $loginService = new LoginService();
            $loginService->login($data);
        }
    }

    public function logout()
    {
        session_destroy();
        header('Location: /');
    }
}