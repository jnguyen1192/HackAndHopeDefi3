<?php

require "../php/protoLoadPriorityDistrictListDB.php";
use PHPUnit\Framework\TestCase;

class protoLoadPriorityDistrictListDBTest extends TestCase
{

    public function testLoad_priority_district_list_db()
    {
        $pldd = new protoLoadPriorityDistrictListDB();// create object
        $test_array = array("nom_epci" => "CA du Bassin de Bourg-en-Bresse", "latitude" => "5.24257553411", "longitude" => "46.2050735487");
        //$list_row = select_points_from_db();
        //print_r($test_array);
        //print_r($pldd->list_row[0]);
        // TODO retrieve data from db and test it
        self::assertTrue($pldd->list_row[0]==$test_array);
    }
}
