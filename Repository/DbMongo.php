<?php

namespace App\Repository;

use App\Config\Mongo;
use MongoDB\BSON\ObjectId;
use MongoDB\Collection;
use MongoDB\Database;

class DbMongo extends Mongo
{
    private Database $db;
    private array $collections;

    /**
     * Constructeur : Initialise la base de données et les collections.
     */
    public function __construct() 
    {
        // Obtenir la base de données via le singleton
        $this->db = Mongo::getInstance()->getDatabase();

        // Configuration des collections
        $this->collections = [
            'actu' => 'actu'
        ];
    }

    /**
     * Récupère une collection MongoDB par alias.
     * @param string $alias Alias de la collection défini dans la configuration.
     * @return \MongoDB\Collection
     * @throws Exception Si l'alias n'existe pas.
     */
    public function getCollection(string $alias): Collection 
    {
        if (!isset($this->collections[$alias])) {
            throw new \Exception("La collection avec le nom '{$alias}' n'existe pas.");
        }

        return $this->db->selectCollection($this->collections[$alias]);
    }

    // CRUD Generics

    /**
     * Insère un document dans une collection.
     * @param string $alias Alias de la collection.
     * @param array $data Données à insérer.
     * @return string ID du document inséré.
     */
    public function create(string $alias, array $data): string 
    {
        $collection = $this->getCollection($alias);
        $result = $collection->insertOne($data);
        return (string) $result->getInsertedId();
    }

    /**
     * Trouve un document par ID.
     * @param string $alias Alias de la collection.
     * @param string $id ID du document.
     * @return array|null Document trouvé ou null.
     */
    public function find(string $alias, string $id): ?array 
    {
        $collection = $this->getCollection($alias);
        $result = $collection->findOne(['_id' => new ObjectId($id)]);
        return $result ? $result->getArrayCopy() : null;
    }

    /**
     * Trouve des documents par des critères.
     * @param string $alias Alias de la collection.
     * @param array $criteria Critères de recherche.
     * @param array $options Options supplémentaires (projection, tri, etc.).
     * @return array Liste des documents trouvés.
     */
    public function findBy(string $alias, array $criteria, array $options = []): array 
    {
        $collection = $this->getCollection($alias);
        $cursor = $collection->find($criteria, $options);
        return iterator_to_array($cursor);
    }

    /**
     * Trouve tous les documents d'une collection.
     * @param string $alias Alias de la collection.
     * @return array Liste de tous les documents.
     */
    public function findAll(string $alias): array 
    {
        $collection = $this->getCollection($alias);
        $cursor = $collection->find();
        return iterator_to_array($cursor);
    }

    /**
     * Met à jour un ou plusieurs documents.
     * @param string $alias Alias de la collection.
     * @param array $criteria Critères pour sélectionner les documents.
     * @param array $update Données de mise à jour.
     * @param bool $multiple Mettre à jour plusieurs documents ou non.
     * @return int Nombre de documents modifiés.
     */
    public function update(string $alias, array $criteria, array $update, bool $multiple = false): int 
    {
        $collection = $this->getCollection($alias);
        $result = $multiple
            ? $collection->updateMany($criteria, ['$set' => $update])
            : $collection->updateOne($criteria, ['$set' => $update]);
        return $result->getModifiedCount();
    }

    /**
     * Supprime un ou plusieurs documents.
     * @param string $alias Alias de la collection.
     * @param array $criteria Critères pour sélectionner les documents.
     * @param bool $multiple Supprimer plusieurs documents ou non.
     * @return int Nombre de documents supprimés.
     */
    public function delete(string $alias, array $criteria, bool $multiple = false): int 
    {
        $collection = $this->getCollection($alias);
        $result = $multiple
            ? $collection->deleteMany($criteria)
            : $collection->deleteOne($criteria);
        return $result->getDeletedCount();
    }
}
