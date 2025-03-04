<?php

use App\Autoloader;
use App\Config\Main;


// Define the ROOT constant to indicate the root directory of the project
define('ROOT', dirname(__DIR__));

// Include the autoloader to automatically manage the loading of classes
require_once ROOT . '/Autoloader.php';
Autoloader::register();


// Start the application
$app = new Main();
$app->start();