<?php


class protoLoadMarseilleSchoolDB
{
    //public $path_csv; // path as member
    public $list_row = array(); // list row as member


    function __construct($category) // constructor
    {
        //$this->path_csv = $path_csv; // assign path on the object creation
        //$this->load_priority_district_list_db(); // load csv file with priority district list
        $this->select_from_db($category);
        // TODO select effectif using key (email or phone)
    }

    // Methods

    function select_from_db($category, $host="localhost", $port=3306, $db_name="proto_qp", $username="root", $password="root", $table="qp") // insert into db using credentials
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
            $sql = 'SELECT `Nom du site`,`Categorie`,`Adresse 1`,`Adresse 2`,`Code Postal`,`Ville`,`Numero de telephone`,`Email`, ST_X(`geo_point_2d`) as longitude, ST_Y(`geo_point_2d`) as latitude FROM `mns` WHERE `Categorie` = \''. $category . '\''; // mysql query to select points from DB
            $res = $conn->query($sql);
            if ($res->num_rows > 0) {
                // output data of each row
                while($row = $res->fetch_assoc()) {
                    $cols = array("Nom du site" => $row["Nom du site"], "Categorie" => $row["Categorie"], "Adresse 1" => $row["Adresse 1"], "Adresse 2" => $row["Adresse 2"], "Code Postal" => $row["Code Postal"], "Ville" => $row["Ville"], "Numero de telephone" => $row["Numero de telephone"], "Email" => $row["Email"], "longitude" => $row["longitude"], "latitude" => $row["latitude"]);
                    //echo "nom_epci: " . $row["nom_epci"]. " - latitude longitude: " . $row["latitude"]. " " . $row["longitude"]. "<br>";
                    array_push($this->list_row, $cols);
                }
                //echo "Select awesome !!!"; // show a successfull message
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