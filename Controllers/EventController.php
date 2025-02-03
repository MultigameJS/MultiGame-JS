<?php

namespace App\Controllers;

use App\Repository\DbMongo;

class EventController extends Controller
{
    public function __construct()
    {
        // Si vous avez besoin d'un middleware pour vérifier si l'utilisateur est connecté, c'est ici.
        // Par exemple : $this->middleware('auth');
    }

    // Méthode pour créer un nouvel événement
    public function createEvent()
    {
        // Vérifie que la méthode est bien POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405); // Méthode non autorisée
            echo json_encode(["status" => "error", "message" => "Méthode non autorisée."]);
            exit;
        }

        // Vérifie le jeton CSRF
        $csrfToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
        if (empty($csrfToken) || $csrfToken !== $_SESSION['csrf_token']) {
            http_response_code(403); // Jeton CSRF invalide
            echo json_encode(["status" => "error", "message" => "Jeton CSRF invalide."]);
            exit;
        }

        // Traite la requête (enregistre l'événement)
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['title']) && isset($data['date']) && isset($data['location'])) {
            $eventRepository = new DbMongo();
            $eventId = $eventRepository->create('events', $data);

            // Réponse de succès avec l'ID de l'événement créé
            echo json_encode(["status" => "success", "message" => "Événement créé avec succès.", "event_id" => $eventId]);
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["status" => "error", "message" => "Données manquantes pour créer l'événement."]);
        }
    }
}
