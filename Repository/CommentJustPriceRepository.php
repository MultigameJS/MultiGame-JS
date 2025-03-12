<?php

namespace App\Repository;

use MongoDB\BSON\ObjectId; // VOIR YO CAR FONCTIONNE PAS 
use App\Repository\DbMongo;

class CommentJustPriceRepository extends DbMongo
{

    public function table($data): string
    {
        return $this->create("justpriceComments",$data);
    }

}

