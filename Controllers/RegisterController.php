<?php

namespace App\Controllers;

use App\Services\ConfirmService;
use App\Services\RegisterService;

class RegisterController extends Controller
{
    public function index()
    {
        $this->render('register/index');
    }

    public function register()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(["status" => "error", "message" => "Méthode de requête non autorisée."]);
            exit();
        } else {
            $data = $_POST;
            $registerService = new RegisterService();
            $registerService->register($data);
        }
    }

    public function confirm($token)
    {
        if ($token) {
            $confirmService = new ConfirmService();
            $confirmService->confirm($token);
        }
    }
}