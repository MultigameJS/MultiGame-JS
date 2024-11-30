<?php

namespace App\Models;

class Model
{
    /**
     * Hydrates the current object with data.
     *
     * Takes an associative array of data and uses setter methods to populate
     * the object's properties.
     *
     * @param object $data The data to hydrate the object with.
     * @return self Returns the current instance of the object for method chaining.
     */
    public function hydrate($data)
    {
        foreach ($data as $key => $value) {
            $method = 'set' . ucfirst($key);

            if (method_exists($this, $method)) {
                $this->$method($value);
            }
        }
        return $this;
    }
}