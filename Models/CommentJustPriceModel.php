<?php

namespace App\Models;

use App\Repository\DbMongo;

class CommentJustPriceModel extends Model
{
    protected $id;
    protected $pseudo;
    protected $commentaire;


    /**
     * Get the value of id
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Set the value of id
     */
    public function setId($id): self {
        $this->id = $id;
        return $this;
    }

    /**
     * Get the value of pseudo
     */
    public function getPseudo() {
        return $this->pseudo;
    }

    /**
     * Set the value of pseudo
     */
    public function setPseudo($pseudo): self {
        $this->pseudo = $pseudo;
        return $this;
    }

    /**
     * Get the value of commentaire
     */
    public function getCommentaire() {
        return $this->commentaire;
    }

    /**
     * Set the value of commentaire
     */
    public function setCommentaire($commentaire): self {
        $this->commentaire = $commentaire;
        return $this;
    }
}

