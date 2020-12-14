<?php

require("../php/protoLoadMarseilleSchoolExtensionGEOJSON.php");

use PHPUnit\Framework\TestCase;

class protoLoadMarseilleSchoolExtensionGEOJSONTest extends TestCase
{

    public function testget_path_geojson()
    {
        // TODO
        $path_geojson = "C:\Users\johdu\PhpstormProjects\HackAndHopeDefi3\POC_Tasks\WebView\Php\data\geojson\fr-en-annuaire-education.geojson"; // initialize the path
        $lmsGEOJSON = new protoLoadMarseilleSchoolExtensionGEOJSON($path_geojson); // create a proto using path
        echo $lmsGEOJSON->get_path_geojson();
        $this->assertTrue($lmsGEOJSON->get_path_geojson() == $path_geojson); // test if the path is correctly added into the proto
    }

    public function testLoad_marseille_annuaire_education_geojson()
    {
        // TODO
        $path_geojson = "C:/Users/johdu/PhpstormProjects/HackAndHopeDefi3/POC_Tasks/WebView/Php/data/geojson/fr-en-annuaire-education.geojson"; // initialize the path
        $lmsGEOJSON = new protoLoadMarseilleSchoolExtensionGEOJSON($path_geojson); // create a proto using path
        //echo var_dump($lmsGEOJSON->list_row['features'][20]["properties"]["telephone"]); # TODO use phone number to join (without space) with mns table number student
        //echo var_dump($lmsGEOJSON->list_row['features'][20]["properties"]["nombre_d_eleves"]);


        $this->assertTrue($lmsGEOJSON->list_row['features'][20]["properties"]["telephone"] == "0491496079"); // check phone
        $this->assertTrue($lmsGEOJSON->list_row['features'][20]["properties"]["nombre_d_eleves"] == 96); // check number
    }
    public function test_count_update_marseille_annuaire_education_geojson()
    {
        $path_geojson = "C:/Users/johdu/PhpstormProjects/HackAndHopeDefi3/POC_Tasks/WebView/Php/data/geojson/fr-en-annuaire-education.geojson"; // initialize the path
        $lmsGEOJSON = new protoLoadMarseilleSchoolExtensionGEOJSON($path_geojson); // create a proto using path

        // get phone number from database
        $phone_numbers = $lmsGEOJSON->get_phone_numbers_from_database();
        echo count($phone_numbers);
        $count = 0;
        // TODO for each phone in features
        //      Test if it exists on db #str_replace("%body%", "black", "<body text='%body%'>")
        //      Case it works increment count

        //  For each features count if the phone number exist on database
        //echo var_dump($lmsGEOJSON->list_row['features'][20]["properties"]["telephone"]); # TODO use phone number to join (without space) with mns table number student
        //echo var_dump($lmsGEOJSON->list_row['features'][20]["properties"]["nombre_d_eleves"]);


        $this->assertTrue($lmsGEOJSON->list_row['features'][20]["properties"]["telephone"] == "0491496079"); // check phone
        $this->assertTrue($lmsGEOJSON->list_row['features'][20]["properties"]["nombre_d_eleves"] == 96); // check number
    }

    public function testinsert_annuaire_education_into_db()
    {
        // TODO
        $path_geojson = "C:\Users\johdu\PhpstormProjects\HackAndHopeDefi3\POC_Tasks\WebView\Php\data\geojson\fr-en-annuaire-education.geojson"; // initialize the path

        $lmsGEOJSON = new protoLoadMarseilleSchoolExtensionGEOJSON($path_geojson, ","); // create a proto using the path

        $res = $lmsGEOJSON->insert_into_db(); // insert list row into the database

        $this->assertTrue($res == 0);
    }



}
