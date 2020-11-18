<?php


class protoLoadPriorityDistrictListDB
{
    //public $path_csv; // path as member
    public $list_row = array(); // list row as member


    function __construct($path_csv='') // constructor
    {
        //$this->path_csv = $path_csv; // assign path on the object creation
        //$this->load_priority_district_list_db(); // load csv file with priority district list
        $this->select_points_from_db();
    }

    // Methods

    function select_points_from_db($host="localhost", $port=3306, $db_name="proto_qp", $username="root", $password="", $table="qp") // insert into db using credentials
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

            //$this->insert_PriorityDistrict($conn, $row); // insert into the database
            $sql = 'SELECT nom_epci, ST_X(`geo_point_2d`) as latitude, ST_Y(`geo_point_2d`) as longitude FROM `qp`'; // mysql query to select points from DB
            $res = $conn->query($sql);
            if ($res->num_rows > 0) {
                // output data of each row
                while($row = $res->fetch_assoc()) {
                    $cols = array("nom_epci" => $row["nom_epci"], "latitude" => $row["latitude"], "longitude" => $row["longitude"]);
                    //echo "nom_epci: " . $row["nom_epci"]. " - latitude longitude: " . $row["latitude"]. " " . $row["longitude"]. "<br>";
                    array_push($this->list_row, $cols);
                }
                echo "Select awesome !!!"; // show a successfull message
                return 0; // return 0 in case it works
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
}