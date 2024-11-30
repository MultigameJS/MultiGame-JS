<?php

namespace App\Config;

use MongoDB\Client;
use MongoDB\Database;

class Mongo
{
    private static ?Mongo $instance = null;
    private Client $client;
    private Database $db;

   /**
     * Initializes the MongoBase instance.
     *
     * Establishes a connection to MongoDB.
     */
    public function __construct()
    {
        $this->client = $this->connect();
        $this->db = $this->client->selectDatabase($_ENV['MONGODB_DB']);
    }

    /**
     * Manages the connection to MongoDB.
     *
     * @return Client Returns the MongoDB client instance.
     */
    protected function connect()
    {
        try {
            // Connect to MongoDB Atlas via the URI
            return new Client($_ENV['MONGODB_URI']);
        } catch (\Exception $e) {
            die("Erreur de connexion à MongoDB : " . $e->getMessage());
        }
    }

    /**
     * Retourne l'instance unique de Mongo.
     * @return Mongo
     */
    public static function getInstance(): Mongo 
    {
        if (self::$instance === null) {
            self::$instance = new Mongo();
        }
        return self::$instance;
    }

    /**
     * Retourne la base de données MongoDB.
     * @return \MongoDB\Database
     */
    public function getDatabase(): Database 
    {
        return $this->db;
    }
}
