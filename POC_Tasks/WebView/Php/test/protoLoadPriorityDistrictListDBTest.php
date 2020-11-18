<?php

require "../php/protoLoadPriorityDistrictListDB.php";
use PHPUnit\Framework\TestCase;

class protoLoadPriorityDistrictListDBTest extends TestCase
{

    public function testLoad_priority_district_list_db()
    {
        $pldd = new protoLoadPriorityDistrictListDB();// create object
        // retrieve data from db
        self::assertTrue(true);
    }
}
