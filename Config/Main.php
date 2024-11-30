<?php

namespace App\Config;

use App\Controllers\MainController;

class Main
{
    /**
     * Démarre l'application.
     *
     * Initialise la session, génère le jeton CSRF, traite l'URL pour déterminer
     * le bon contrôleur et l'action, et nettoie les données POST entrantes.
     *
     * @return void
     */
    public function start()
    {
        session_start();

        // Générer le token CSRF si absent de la session
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32)); // Stocke directement le jeton haché
        }

        $uri = $_SERVER['REQUEST_URI'];

        if (!empty($uri) && $uri != '/' && $uri[-1] === '/') {
            $uri = substr($uri, 0, -1);
            echo json_encode(['redirect_url' => $uri]);
            exit();
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $csrfToken = $_POST['csrf_token'] ?? '';
            $this->checkCsrfToken($csrfToken);
            $_POST = $this->sanitizeFormData($_POST);
        }

        $params = isset($_GET['p']) ? explode('/', filter_var($_GET['p'], FILTER_SANITIZE_URL)) : [];

        if (isset($params[0]) && $params[0] != '') {
            $controllerName = '\\App\\Controllers\\' . ucfirst(array_shift($params)) . 'Controller';

            if (class_exists($controllerName)) {
                $controller = new $controllerName();
            } else {
                $this->error404("Le contrôleur '$controllerName' n'existe pas.");
                return;
            }

            $action = (isset($params[0])) ? array_shift($params) : 'index';

            if (method_exists($controller, $action)) {
                call_user_func_array([$controller, $action], $params);
            } else {
                $this->error404("L'action '$action' n'existe pas dans le contrôleur '$controllerName'.");
            }
        } else {
            $controller = new MainController();
            $controller->index();
        }
    }

    /**
     * Vérifie le jeton CSRF pour les requêtes POST.
     *
     * Valide le jeton CSRF fourni par rapport à celui stocké dans la session
     * pour prévenir les attaques CSRF.
     *
     * @param string $token Le jeton CSRF à valider.
     * @return void
     */
    public function checkCsrfToken($token)
    {
        if (!isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $token)) {
            // Retourner une erreur 403 si le jeton CSRF est invalide ou manquant
            http_response_code(403);
            echo json_encode(['error' => 'Jeton CSRF invalide.']);
            exit();
        }
    }

    /**
     * Nettoie les données de formulaire en supprimant les balises HTML tout en conservant les types de données originaux.
     *
     * Nettoie toutes les données de formulaire entrantes pour éviter les attaques XSS.
     *
     * @param array $data Un tableau contenant les données du formulaire ($_POST ou $_GET).
     * @return array Tableau des données nettoyées.
     */
    private function sanitizeFormData(array $data)
    {
        $sanitizedData = [];
        foreach ($data as $key => $value) {
            // Nettoyer de manière récursive si la valeur est un tableau
            if (is_array($value)) {
                $sanitizedData[$key] = $this->sanitizeFormData($value);
            } else {
                // Appliquer strip_tags uniquement sur les chaînes
                if (is_string($value)) {
                    $sanitizedData[$key] = strip_tags($value);
                } else {
                    // Conserver les autres types de données (int, float, etc.)
                    $sanitizedData[$key] = $value;
                }
            }
        }
        return $sanitizedData;
    }

    /**
     * Affiche une page d'erreur 404.
     *
     * Envoie un code HTTP 404 et affiche un message d'erreur.
     *
     * @param string $message Le message d'erreur à afficher.
     * @return void
     */
    private function error404($message)
    {
        http_response_code(404);
        echo json_encode(['error' => 'Page non trouvée', 'message' => $message]);
    }
}