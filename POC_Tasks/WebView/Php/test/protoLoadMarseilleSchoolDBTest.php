<?php

require "../php/protoLoadMarseilleSchoolDB.php";
use PHPUnit\Framework\TestCase;

class protoLoadMarseilleSchoolDBTest extends TestCase
{

    public function testLoad_marseille_nursery_school_db()
    {
        $pmnsd = new protoLoadMarseilleSchoolDB();// create object
        $test_array = array("Nom du site" => "Ecole Bergers", "Categorie" => "Ecoles maternelles", "Adresse 1" => "11 rue Perrin Solliers", "Adresse 2" => "", "Code Postal" => "13006", "Ville" => "Marseille", "Numero de telephone" => "04 91 47 63 62", "Email" => "ecole.mat.bergers@cime.org", "longitude" => "5.38485384024201", "latitude" => "43.2909458085538");
        //$list_row = select_points_from_db();
        //print_r($test_array);
        //print_r($pmnsd->list_row[0]);

        self::assertTrue($pmnsd->list_row[0]==$test_array); // retrieve data from db and test it
    }
}
