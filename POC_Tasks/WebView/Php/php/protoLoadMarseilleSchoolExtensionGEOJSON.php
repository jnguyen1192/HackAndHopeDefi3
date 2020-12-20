<?php


class protoLoadMarseilleSchoolExtensionGEOJSON
{
    public $path_geojson; // path as member
    public $list_row = array(); // list row as member


    function __construct($path_geojson='') // constructor
    {
        $this->path_geojson = $path_geojson; // assign path on the object creation
        $this->load_marseille_school_geojson(); // load csv file with priority district list
        // TODO create table email or phone as primary key
        //      open csv or geojson
        /*
    $geojson = file_get_contents($filePath);
    $json = json_decode($geojson, true);

    // Check if GeoJSON is Feature or FeatureCollection
    if ($json['type'] === 'FeatureCollection') {
        foreach($json['features'] as $feature){
            createInsert($mysqli, $feature);
        }
    } else if ($json['type'] === 'Feature') {
        createInsert($mysqli, $json);// TODO For each lines created add them into mysql table that you create before
    } else {
        exit('Invalid GeoJSON');
    }
        */


    }

    // Methods
    function get_path_geojson() { // get path
        return $this->path_geojson; // use member to get path of csv file
    }


    function get_phone_numbers_from_database($host="localhost", $port=3306, $db_name="proto_qp", $username="root", $password="root", $table="qp") // insert into db using credentials
    {
        $phone_numbers = array();
        // Create connection
        $conn = new mysqli($host, $username, $password, $db_name, $port); // use mysqsli function to connect into db
        // Check connection
        if ($conn->connect_error) { // check connexion
            die("Connection failed: " . $conn->connect_error); // show an error message
        }
        //echo "Connected successfully\n"; // show a successfull message
        try
        {

            //$this->insert_PriorityDistrict($conn, $row); // insert into the database
            $sql = 'SELECT `Numero de telephone` FROM `mns`'; // mysql query to select points from DB
            $res = $conn->query($sql);
            if ($res->num_rows > 0) {
                // output data of each row
                while($row = $res->fetch_assoc()) {
                    $cols = array("Numero_avec_espaces" => $row["Numero de telephone"]);
                    //echo "nom_epci: " . $row["nom_epci"]. " - latitude longitude: " . $row["latitude"]. " " . $row["longitude"]. "<br>";
                    array_push($phone_numbers, $cols);
                }
                //echo "Select awesome !!!"; // show a successfull message
                return $phone_numbers; // return 0 in case it works
            } else {
                // case it doesn't work
                echo "Be careful 0 Results !!!"; // show an error message
                return -1; // return -1 in case it fails
            }


        }
        catch (Exception $e)
        {
            echo 'Error during select list row from db : ' . $e; // show an error message
            return -1; // return -1 in case it fails
        }
    }

    function merge_using_phone_number($host="localhost", $port=3306, $db_name="proto_qp", $username="root", $password="root") {
        // TODO complete this function using correct parameters
        // Create connection
        $conn = new mysqli($host, $username, $password, $db_name, $port); // use mysqsli function to connect into db
        // Check connection
        if ($conn->connect_error) { // check connexion
            die("Connection failed: " . $conn->connect_error); // show an error message
        }
        /* 1)
            ALTER TABLE YourTable
            ADD YourNewColumn INT NULL;

            2)
            UPDATE YourTable SET YourNewColumn = 10; -- Or some more complex expression
                 "date_ouverture":"2016-11-02",
                 "restauration":0,
                 "nombre_d_eleves":26,
        */
        /**
        This class will be used to merge a geojson into a mysql database
        For example:
         *   - we have table:
         *      mns(Nom du site,"Categorie","Adresse 1","Adresse 2","Code Postal","Ville","Numero de telephone","Email","geo_point_2d")
         *   - we have geojson:
        {
        "type":"FeatureCollection",
        "features":[
        {
            "type":"Feature",
            "geometry":{
            "type":,
            "coordinates":[]
        },
            "properties":{
                 date_ouverture":"2016-11-02",
                 [ ... ]
                 "telephone":"0950896922",
                 "restauration":0,
                 "nombre_d_eleves":26,
                 [ ... ]}}
         *  ]}
         *
         *  We can use the phone numbers to add new properties like "date_ouverture", "restauration" and "nombre_d_eleves"
         */
    }

    function load_marseille_school_geojson() { // load priority district list from csv file
        $geojson = file_get_contents($this->path_geojson);
        $json = json_decode($geojson, true);
        $this->list_row = $json;
        /*
        if ($json['type'] === 'FeatureCollection') {
            foreach($json['features'] as $feature){
                echo "FeatureCollection";
                array_push($this->list_row, $feature);
            }
        } else if ($json['type'] === 'Feature') {
            echo "Feature";
            array_push($this->list_row, $json);;// TODO For each lines created add them into mysql table that you create before
        } else {
            exit('Invalid GeoJSON');
        }*/
        return "";
    }

    function insert_School($conn, $row) // insert a row in PriorityDistrict
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

    function insert_into_db($host="localhost", $port=3306, $db_name="proto_qp", $username="root", $password="root", $table="qp") // insert into db using credentials
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
                $this->insert_School($conn, $row); // insert into the database
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