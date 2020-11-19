<?php


class protoLoadMarseilleNurserySchoolCSV
{
    public $path_csv; // path as member
    public $list_row = array(); // list row as member


    function __construct($path_csv='') // constructor
    {
        $this->path_csv = $path_csv; // assign path on the object creation
        $this->load_marseille_nursery_school_csv(); // load csv file with priority district list
    }

    // Methods
    function get_path_csv() { // get path
        return $this->path_csv; // use member to get path of csv file
    }

    function load_marseille_nursery_school_csv() { // load priority district list from csv file
        $row = 1; // init variable $row with value 1
        if (($handle = fopen($this->path_csv, "r")) !== FALSE) { // open file using path csv
            while (($data = fgetcsv($handle, 0, ";")) !== FALSE) {  // split each row using ';'
                if ($row == 1) { // ignore header
                    $row++; // increment to the first row
                    continue; // ignore the rest of the loop one time
                }
                $num = count($data); // count the number of columns
                //echo "<p> $num champs à la ligne $row: <br /></p>\n";
                $row++; // increment the number of row
                $cols = array(); // prepare an array
                for ($c=0; $c < $num; $c++) { // loop in each columns of the row
                    array_push($cols, $data[$c]); // add each columns on array
                    //echo $data[$c] . "<br />\n";
                }
                array_push($this->list_row, $cols); // add each row on the list row
            }
            fclose($handle); // close the file
        }
    }

    function insert_Nursery_School($conn, $row) // insert a row in PriorityDistrict
    {
        for($i = 0; $i < count($row); ++$i) { // for each columns of a row replace ' by \' to eliminate "d'Oise" exception or others
            $row[$i] = str_replace("'","\'", $row[$i] ); // replace
        }
        // point
        if($row[8] == "" or $row[9] == "") // case there wasn't a point
        {
            $process_point = 'ST_GeomFromText(\'POINT(0.0000 90.0000)\', 4326)'; // add a point to not activate an exception in mysql
        }
        else // case there was a point
        {
            $process_point = 'ST_GeomFromText(\'POINT(' . $row[8] . " " . $row[9] . ')\', 4326)'; // transform the point in the correct lat long
        }
        //$sql = 'INSERT INTO test_point(point) VALUES (' . $process_point . ')';
        //$sql = 'INSERT INTO test_geojson(geojson) VALUES (ST_GeomFromGeoJSON(\'' . $row[11] . '\'))';
        $sql = 'INSERT INTO mns (`Nom du site`,`Categorie`,`Adresse 1`,`Adresse 2`,`Code Postal`,`Ville`,`Numero de telephone`,`Email`,`geo_point_2d`)
            VALUES (\''.$row[0].'\', \''.$row[1].'\', \''.$row[2].'\', \''.$row[3].'\', \''.$row[4].'\', \''.$row[5].'\', \''.$row[6].'\', \''.$row[7].'\', ' . $process_point .')'; // mysql query to insert a District Priority

        if ($conn->query($sql) === TRUE) { // execute the query and check if it works
            //echo "New record created successfully"; // show a successfull message
            return 0; // return 0 in case it works
        } else { // case it doesn't work
            echo "Error: " . $sql . "<br>" . $conn->error; // show an error message
            return -1; // return -1 in case it fails
        }
    }

    function insert_into_db($host="localhost", $port=3306, $db_name="proto_qp", $username="root", $password="", $table="qp") // insert into db using credentials
    {
        // Create connection
        $conn = new mysqli($host, $username, $password, $db_name, $port); // use mysqsli function to connect into db
        // Check connection
        if ($conn->connect_error) { // check connexion
            die("Connection failed: " . $conn->connect_error); // show an error message
        }
        //echo "Connected successfully\n"; // show a successfull message
        try
        {
            foreach($this->list_row as $row) // for each row in the list
            {
                $this->insert_Nursery_School($conn, $row); // insert into the database
            }
            // SELECT ST_Within(point, geojson) FROM test_point, test_geojson !
            $conn->close(); // close the connexion
            if (!is_resource($conn)) { // check if the connexion is correctly closed
                //echo "Disconnected successfully\n"; // show a successfull message
                return 0; // return 0 in case it works
            }
            else
            {
                echo "Disconnected failed\n"; // show an error message
                return -1; // return -1 in case it fails
            }
        }
        catch (Exception $e)
        {
            echo 'Error during insert list row on db : ' . $e; // show an error message
            return -1; // return -1 in case it fails
        }
    }
}