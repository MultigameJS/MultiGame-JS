<?php

namespace App\Controllers;

use App\Repository\FlapiRepository;
use App\Services\FlapiService;
use App\Repository\UserRepository;

class LioController extends Controller
{
    // Affichage du jeu
    public function index()
    {
        if(isset($_SESSION['id'])){
        $id = $_SESSION['id'];
        $FlapiRepository = new FlapiREpository();
        $flapi = $FlapiRepository->findBy(['id_user' => $id]);
        $this->render('lio/index', compact('flapi'));
        } else {
            $this->render('lio/index');
        }

    }

    // Ajouter un score
    public function saveScore()
{
    if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
        echo json_encode(['status' => 'error', 'message' => 'Méthode non autorisée.']);
        return;
    }

    // Récupérer les données brutes
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    // Je vérifie  si les données sont valides
    if (!$data || !is_array($data)) {
        echo json_encode(['status' => 'error', 'message' => 'Données invalides.']);
        return;
    }

    // Je vérifie les champs
    if (!isset($data['score'], $data['csrf_token'])) {
        echo json_encode(['status' => 'error', 'message' => 'Champs requis manquants.']);
        return;
    }

    // verification si l'utilisateur et connecté
    if (!isset($_SESSION['id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Utilisateur non authentifié.']);
        return;
    }

    // Vérification du token CSRF
    if (!isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $data['csrf_token'])) {
        echo json_encode(['status' => 'error', 'message' => 'Jeton CSRF invalide.']);
        return;
    }

    try {
        // Ajouter l'utilisateur connecté aux données
        $data['id_user'] = $_SESSION['id'];

        // Exclure le token CSRF avant d'enregistrer dans la base de données
        unset($data['csrf_token']);

        // Utilisation du service pour ajouter le score
        $flapiService = new FlapiService();
        $flapiService->addScore($data);

        echo json_encode(['status' => 'success', 'message' => 'Score enregistré.']);
    } catch (\Exception $e) {
        // Gestion des erreurs interne
        error_log('Erreur interne : ' . $e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'enregistrement.', 'details' => $e->getMessage()]);
    }
}
}
