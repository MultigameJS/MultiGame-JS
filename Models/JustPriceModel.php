<?php

namespace App\Models;

class JustPriceModel extends Model
{

private $id;
private $create_time;
private $idUsers;
private $score;
private $time;

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
 * Get the value of idUsers
 */
public function getIdUsers() {
return $this->idUsers;
}

/**
 * Set the value of idUsers
 */
public function setIdUsers($idUsers): self {
$this->idUsers = $idUsers;
return $this;
}

/**
 * Get the value of create_time
 */
public function getCreate_Time() {
return $this->create_time;
}

/**
 * Set the value of create_time
 */
public function setCreate_Time($create_time): self {
$this->create_time = $create_time;
return $this;
}

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
 * Get the value of time
 */
public function getTime() {
return $this->time;
}

/**
 * Set the value of time
 */
public function setTime($time): self {
$this->time = $time;
return $this;
}
}