<?php

require "../php/protoLoadPriorityDistrictListDB.php";
use PHPUnit\Framework\TestCase;

class protoLoadPriorityDistrictListDBTest extends TestCase
{

    public function testLoad_priority_district_list_db()
    {
        $pldd = new protoLoadPriorityDistrictListDB();// create object
        $pldd->select_points_from_db();

        // retrieve data from db
        self::assertTrue(true);
    }
}
