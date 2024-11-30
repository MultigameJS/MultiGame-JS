<?php

namespace App\Services;

use App\Models\UserModel;
use App\Repository\UserRepository;

class RegisterService
{
    public function register()
    {
        header('Content-Type: application/json');
        $name = $_POST['name'];
        $firstname = $_POST['firstname'];
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $password = $_POST['password'];
        $confirmPassword = $_POST['confirmPassword'];
        $id_role = 2;

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Email invalide."]);
            exit();
        }

        if ($password !== $confirmPassword) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Les mots de passe ne correspondent pas."]);
            exit();
        } else {
            $password = password_hash($password, PASSWORD_DEFAULT);
        }

        // Génération du token de confirmation
        $token = bin2hex(random_bytes(32));

        // Hydrater et enregistrer l'utilisateur avec le token
        $data = [
            'name' => $name,
            'firstname' => $firstname,
            'email' => $email,
            'password' => $password,
            'confirmed_token' => $token,
            'is_confirmed' => 0,
            'id_role' => $id_role
        ];
        $UsersModel = new UserModel();
        $UsersModel->hydrate($data);
        if ($UsersModel = (new UserRepository())->create($data)) {
            // Envoi de l'email de confirmation
            $this->sendConfirmationEmail($email, $token);

            http_response_code(200);
            echo json_encode(["status" => "success", "message" => "Un email de confirmation a été envoyé."]);
            exit();
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Erreur lors de la création de l'utilisateur."]);
            exit();
        }
    }

    public function sendConfirmationEmail($email, $token)
    {
            // Contenu de l'email
            $to = $email;
            $Subject = 'Confirmation de votre inscription';
            $confirmationLink = "https://lesptitsplats-ee9a18fc681e.herokuapp.com/login/confirm/" . $token;
            $Body = "Bonjour,<br>
                <br>
                Merci pour votre inscription.<br>
                Veuillez cliquer sur le lien ci-dessous pour confirmer votre adresse email :<br>
                <br>
                <a href='$confirmationLink'>Confirmer mon email</a>";

            $emailService = new EmailService();
            $emailService->sendEmail($to, $Subject, $Body);
    }
}
