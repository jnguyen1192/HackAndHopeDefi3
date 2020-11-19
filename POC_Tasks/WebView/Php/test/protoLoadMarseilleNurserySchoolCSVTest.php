<?php

require("../php/protoLoadMarseilleNurserySchoolCSV.php");

use PHPUnit\Framework\TestCase;

class protoLoadMarseilleNurserySchoolCSVTest extends TestCase
{

    public function testget_path_csv()
    {
        $path_csv = "C:\Users\johdu\PhpstormProjects\HackAndHopeDefi3\POC_Tasks\WebView\marseille_ecoles_maternelles_2018.csv"; // initialize the path
        $lmnsCSV = new protoLoadMarseilleNurserySchoolCSV($path_csv); // create a proto using path
        echo $lmnsCSV->get_path_csv();
        $this->assertTrue($lmnsCSV->get_path_csv() == $path_csv); // test if the path is correctly added into the proto
    }

    public function testLoad_marseille_nusery_school_csv()
    {
        $path_csv = "C:\Users\johdu\PhpstormProjects\HackAndHopeDefi3\POC_Tasks\WebView\marseille_ecoles_maternelles_2018.csv"; // initialize the path
        $lmnsCSV = new protoLoadMarseilleNurserySchoolCSV($path_csv); // create a proto using path

        //echo var_dump($lpdlCSV->list_row);
        //echo var_dump($lmnsCSV->list_row[0][0]);
        //echo var_dump($lmnsCSV->list_row[0][7]);
        //echo var_dump($lmnsCSV->list_row[0][8]);
        //echo var_dump($lmnsCSV->list_row[0][9]);
        $this->assertTrue($lmnsCSV->list_row[0][0] == "Ecole Bergers"); // check code
        $this->assertTrue($lmnsCSV->list_row[0][7] == "ecole.mat.bergers@cime.org"); // check point
        $this->assertTrue($lmnsCSV->list_row[0][8] == "5.38485384024201"); // check point
        $this->assertTrue($lmnsCSV->list_row[0][9] == "43.2909458085538"); // check point
    }

    public function testinsert_into_db()
    {

        $path_csv = "C:\Users\johdu\PhpstormProjects\HackAndHopeDefi3\POC_Tasks\WebView\marseille_ecoles_maternelles_2018.csv"; // initialize the path

        $lpdlCSV = new protoLoadMarseilleNurserySchoolCSV($path_csv); // create a proto using the path

        $res = $lpdlCSV->insert_into_db(); // insert list row into the database

        $this->assertTrue($res == 0);
    }

}
