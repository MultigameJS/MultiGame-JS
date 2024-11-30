<?php

namespace App\Models;

class UserModel extends Model
{
    private $id;
    private $name;
    private $email;
    private $password;
    private $token;
    private $creat_time;
    private $update_time;
    private $last_login;
    private $is_admin;
    private $is_banned;
    private $is_verified;

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
     * Get the value of name
     */
    public function getName() {
        return $this->name;
    }

    /**
     * Set the value of name
     */
    public function setName($name): self {
        $this->name = $name;
        return $this;
    }

    /**
     * Get the value of email
     */
    public function getEmail() {
        return $this->email;
    }

    /**
     * Set the value of email
     */
    public function setEmail($email): self {
        $this->email = $email;
        return $this;
    }

    /**
     * Get the value of password
     */
    public function getPassword() {
        return $this->password;
    }

    /**
     * Set the value of password
     */
    public function setPassword($password): self {
        $this->password = $password;
        return $this;
    }

    /**
     * Get the value of token
     */
    public function getToken() {
        return $this->token;
    }

    /**
     * Set the value of token
     */
    public function setToken($token): self {
        $this->token = $token;
        return $this;
    }

    /**
     * Get the value of creat_time
     */
    public function getCreatTime() {
        return $this->creat_time;
    }

    /**
     * Set the value of creat_time
     */
    public function setCreatTime($creat_time): self {
        $this->creat_time = $creat_time;
        return $this;
    }

    /**
     * Get the value of update_time
     */
    public function getUpdateTime() {
        return $this->update_time;
    }

    /**
     * Set the value of update_time
     */
    public function setUpdateTime($update_time): self {
        $this->update_time = $update_time;
        return $this;
    }

    /**
     * Get the value of last_login
     */
    public function getLastLogin() {
        return $this->last_login;
    }

    /**
     * Set the value of last_login
     */
    public function setLastLogin($last_login): self {
        $this->last_login = $last_login;
        return $this;
    }

    /**
     * Get the value of is_admin
     */
    public function getIsAdmin() {
        return $this->is_admin;
    }

    /**
     * Set the value of is_admin
     */
    public function setIsAdmin($is_admin): self {
        $this->is_admin = $is_admin;
        return $this;
    }

    /**
     * Get the value of is_banned
     */
    public function getIsBanned() {
        return $this->is_banned;
    }

    /**
     * Set the value of is_banned
     */
    public function setIsBanned($is_banned): self {
        $this->is_banned = $is_banned;
        return $this;
    }

    /**
     * Get the value of is_verified
     */
    public function getIsVerified() {
        return $this->is_verified;
    }

    /**
     * Set the value of is_verified
     */
    public function setIsVerified($is_verified): self {
        $this->is_verified = $is_verified;
        return $this;
    }
}