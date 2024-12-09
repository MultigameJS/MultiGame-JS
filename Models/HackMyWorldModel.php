<?php

namespace App\Models;

class HackMyWorldModel extends Model
{
    private $id;
    private $id_user;
    private $score;
    private $created_at;
    private $streak;


    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of id_user
     */ 
    public function getId_user()
    {
        return $this->id_user;
    }

    /**
     * Set the value of id_user
     *
     * @return  self
     */ 
    public function setId_user($id_user)
    {
        $this->id_user = $id_user;

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
     *
     * @return  self
     */ 
    public function setScore($score)
    {
        $this->score = $score;

        return $this;
    }

    /**
     * Get the value of create_at
     */ 
    public function getCreated_at()
    {
        return $this->created_at;
    }

    /**
     * Set the value of create_at
     *
     * @return  self
     */ 
    public function setCreated_at($created_at)
    {
        $this->created_at = $created_at;

        return $this;
    }

    /**
     * Get the value of streak
     */ 
    public function getStreak()
    {
        return $this->streak;
    }

    /**
     * Set the value of streak
     *
     * @return  self
     */ 
    public function setStreak($streak)
    {
        $this->streak = $streak;

        return $this;
    }
}