<?php

namespace App\Controllers;

abstract class Controller 
{
    // Méthode existante pour rendre des vues
    public function render(string $file, array $donnees = [])
    {
        extract($donnees);
        ob_start();
        require_once ROOT.'/Views/'.$file.'.php';
        $contenu = ob_get_clean();
        require_once ROOT.'/Views/default.php';
    }
}
