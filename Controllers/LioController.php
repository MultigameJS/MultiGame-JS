<?php

namespace App\Controllers;

use App\Repository\FlapiRepository;
use App\Services\FlapiService;

class LioController extends Controller
{
    // Affichage du jeu
    public function index()
    {
        $FlapiRepository = new FlapiRepository();
        $scores = $FlapiRepository->findAll();

        $this->render('lio/index', compact('scores'));
    }

    // Ajouter un score
    public function saveScore()
    {
        // Je récupère les données JSON depuis la requête
        $input = json_decode(file_get_contents('php://input'), true);

        // Les données sont validés
        $pseudo = $input['pseudo'] ?? null;
        $score = $input['score'] ?? null;

        if (!$pseudo || !is_string($pseudo) || !is_numeric($score)) {
            // Retourne une erreur si les données sont invalides
            $this->sendJsonResponse(['status' => 'error', 'message' => 'Données invalides.'], 400);
        }

        // Préparation des données
        $data = [
            'pseudo' => htmlspecialchars($pseudo, ENT_QUOTES, 'UTF-8'),
            'score' => (int) $score,
            'date' => date('Y-m-d H:i:s'),
        ];

        // j'enregistre en base de données
        $FlapiRepository = new FlapiRepository();
        $result = $FlapiRepository->createPseudo(
            $data['pseudo'],
            $data['score'],
            $data['date']
        );

        // retourne une réponse JSON en fonction du résultat
        $status = $result ? 'success' : 'error';
        $message = $result ? 'Score enregistré.' : 'Erreur lors de l\'enregistrement.';
        $this->sendJsonResponse(['status' => $status, 'message' => $message]);
    }

    private function sendJsonResponse(array $data, int $statusCode = 200)
    {
        // je définit l'en-tête Content-Type pour indiquer que la réponse est en JSON
        header('Content-Type: application/json');

        // je définit le code HTTP de la réponse (200 par défaut si non spécifié)
        http_response_code($statusCode);

        // je convertit le tableau en chaîne JSON et l'envoie au client
        echo json_encode($data);

        exit();
    }

    
}
