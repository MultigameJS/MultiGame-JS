<?php

use App\Autoloader;
use App\Config\Main;
use Dotenv\Dotenv;

// Define the ROOT constant to indicate the root directory of the project
define('ROOT', dirname(__DIR__));

// Include the autoloader to automatically manage the loading of classes
require_once ROOT . '/Autoloader.php';
Autoloader::register();

// Load environment variables from the .env file in the root directory
$dotenv = Dotenv::createImmutable(ROOT);
$dotenv->load();

// Start the application
$app = new Main();
$app->start();