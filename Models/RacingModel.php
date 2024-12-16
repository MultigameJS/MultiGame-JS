<?php

namespace App\Models;

class RacingModel extends Model
{
    private $id;
    private $score;
    private $date;
    private $id_user;

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
     * Get the value of score
     */
    public function getScore() {
        return $this->score;
    }

    /**
     * Set the value of score
     */
    public function setScore($score): self {
        $this->score = $score;
        return $this;
    }

    /**
     * Get the value of date
     */
    public function getDate() {
        return $this->date;
    }

    /**
     * Set the value of date
     */
    public function setDate($date): self {
        $this->date = $date;
        return $this;
    }

    /**
     * Get the value of id_user
     */
    public function getId_User() {
        return $this->id_user;
    }

    /**
     * Set the value of id_user
     */
    public function setId_User($id_user): self {
        $this->id_user = $id_user;
        return $this;
    }
}