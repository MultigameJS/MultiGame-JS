<?php

namespace App\Services;

use App\Models\RacingModel;
use App\Repository\DbMongo;
use App\Repository\RacingRepository;

class RacingService
{
    public function saveScore($data)
    {
        $racingModel = new RacingModel();
        $racingRepository = new RacingRepository();

        // Trouver le score existant pour l'utilisateur
        $racing = $racingRepository->findBy(['id_user' => $_SESSION['id']]);
        foreach ($racing as $r) {;
            $id = $r->id;
            $existingScore = $r->score;
        }

        // Si aucune entrée n'existe pour cet utilisateur
        if (!$racing || empty($racing)) {
            $racingModel->hydrate($data);
            $racingRepository->create($data);
        } else {

            // Mettre à jour uniquement si le nouveau score est supérieur
            if ($data['score'] < $existingScore) {
                $racingModel->hydrate($data);

                // Mise à jour dans la base de données
                $racingRepository->update($id, $data);
            }
        }
    }

    public function comment($data)
    {
        $message = $data['message'] ?? null;

        // Vérification si un message est fourni
        if (empty($message)) {
            echo json_encode(['status' => 'error', 'message' => 'Le message ne peut pas être vide']);
            exit();
        }

        // Création du document dans MongoDB
        $baseMongo = new DbMongo();
        $data = [
            'user_id' => $_SESSION['id'],
            'type' => 'texte', // Peut être adapté selon vos besoins
            'message' => $message,
            'created_at' => new \MongoDB\BSON\UTCDateTime(),
        ];

        $documentId = $baseMongo->create('Racing', $data);

        if ($documentId) {
            echo json_encode(['status' => 'success', 'message' => 'Message publié avec succès', 'id' => $documentId]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la publication du message']);
        }
    }

    public function deleteComment() 
    {
        // Lecture des données envoyées
        $input = json_decode(file_get_contents('php://input'), true);
        $commentId = $input['comment_id'] ?? null;

        // Vérification que l'ID est fourni
        if (empty($commentId)) {
            echo json_encode(['status' => 'error', 'message' => 'ID du commentaire non fourni.']);
            exit();
        }

        $baseMongo = new DBMongo();
        $comment = $baseMongo->find('Racing', $commentId);

        // Vérification que le commentaire existe et que l'utilisateur est l'auteur
        if (!$comment) {
            echo json_encode(['status' => 'error', 'message' => 'Commentaire introuvable.']);
            exit();
        }

        if ($comment['user_id'] != $_SESSION['id']) {
            echo json_encode(['status' => 'error', 'message' => 'Vous ne pouvez pas supprimer ce commentaire.']);
            exit();
        }

        // Suppression du commentaire
        $deletedCount = $baseMongo->delete('Racing', ['_id' => new \MongoDB\BSON\ObjectId($commentId)]);

        if ($deletedCount) {
            echo json_encode(['status' => 'success', 'message' => 'Commentaire supprimé avec succès.']);
            exit();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la suppression.']);
            exit();
        }
    }
}