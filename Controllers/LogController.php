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
    }

    $data = $_POST;

    $loginService = new LoginService();
    $success = $loginService->login($data);

    if ($success) {
        // Redirection vers la page du dashboard
        header("Location: /game");
        exit();
    } else {
        // Message d'erreur en cas d'échec de connexion
        $_SESSION['error_message'] = "Email ou mot de passe incorrect";
        header("Location: /login");
        exit();
    }
}

    public function logout()
    {
        session_destroy();
        header('Location: /');
    }
}