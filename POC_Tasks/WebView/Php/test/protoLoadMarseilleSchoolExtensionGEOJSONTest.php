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

    public function testLoad_marseille_annuaire_eduction_geojson()
    {
        // TODO
        $path_geojson = "C:/Users/johdu/PhpstormProjects/HackAndHopeDefi3/POC_Tasks/WebView/Php/data/geojson/fr-en-annuaire-education.geojson"; // initialize the path
        $lmsGEOJSON = new protoLoadMarseilleSchoolExtensionGEOJSON($path_geojson); // create a proto using path
        echo var_dump($lmsGEOJSON->list_row['features'][20]["properties"]["telephone"]); # TODO use phone number to join (without space) with mns table number student
        echo var_dump($lmsGEOJSON->list_row['features'][20]["properties"]["nombre_d_eleves"]);
        //echo var_dump($lpdlCSV->list_row);
        //echo var_dump($lmnsCSV->list_row[0][0]);
        //echo var_dump($lmnsCSV->list_row[0][7]);
        //echo var_dump($lmnsCSV->list_row[0][8]);
        //echo var_dump($lmnsCSV->list_row[0][9]);
        $this->assertTrue($lmsGEOJSON->list_row[0][0] == "Ecole Bergers"); // check code
        $this->assertTrue($lmsGEOJSON->list_row[0][7] == "ecole.mat.bergers@cime.org"); // check point
        $this->assertTrue($lmsGEOJSON->list_row[0][8] == "5.38485384024201"); // check point
        $this->assertTrue($lmsGEOJSON->list_row[0][9] == "43.2909458085538"); // check point
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
