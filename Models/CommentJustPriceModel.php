<?php

namespace App\Models;

use App\Repository\DbMongo;

class CommentJustPriceModel extends DbMongo
{
    protected string $collection = "justpriceComments"; // COLLECTION MONGO DB

    public function __construct()
    {
        parent::__construct(); // HERITAGE DU CONSTRUCTEUR DE DbMONGO
    }
}

