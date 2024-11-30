<?php

namespace App\Services;

use App\Models\UserModel;
use App\Repository\UserRepository;

class ConfirmService
{
    public function confirm($token)
    {
        $userRepository = new UserRepository();
        
        // Récupérer l'utilisateur à partir du token
        $user = $userRepository->findOneBy(['token' => $token]);
        
        if ($user) {
            
            $data = [
                'token' => null,
                'is_verified' => 1
            ];
            
            $userModel = new UserModel();
            $userModel->hydrate($data);

            // Sauvegarder les modifications en base de données
            $userRepository->update($user->id, $data);

            header('Location: /log');
            exit();
        } else {
            // Réponse JSON en cas d'erreur
            echo json_encode([
                "status" => "error",
                "message" => "Une erreur est survenue. Token invalide ou utilisateur introuvable."
            ]);
            exit();
        }
    }
}
