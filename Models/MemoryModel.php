<?php

namespace App\Models;

class MemoryModel extends Model
{
    private $id;
    private $user_id;
    private $score;
    private $date;

    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     */
    public function setId($id): self
    {
        $this->id = $id;
        return $this;
    }

    /**
     * Get the value of user_id
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * Set the value of user_id
     */
    public function setUserId($user_id): self
    {
        $this->user_id = $user_id;
        return $this;
    }

    /**
     * Get the value of score
     */
    public function getScore()
    {
        return $this->score;
    }

    /**
     * Set the value of score
     */
    public function setScore($score): self
    {
        $this->score = $score;
        return $this;
    }

    /**
     * Get the value of created_at
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set the value of created_at
     */
    public function setDate($date): self
    {
        $this->date = $date;
        return $this;
    }
}
