<?php


class protoLoadPriorityDistrictListCSV
{
    public $path_csv;
    public $list_row = array();


    function __construct($path_csv='') // constructor
    {
        $this->path_csv = $path_csv; // assign path on the object creation
        $this->load_priority_district_list_csv();
    }

    // Methods
    function set_path_csv($path_csv) { // change path
        $this->path_csv = $path_csv;
    }
    function get_path_csv() { // get path
        return $this->path_csv;
    }

    function load_priority_district_list_csv() {
        $row = 1;
        if (($handle = fopen($this->path_csv, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 0, ";")) !== FALSE) {
                if ($row == 1) { // ignore header
                    $row++;
                    continue;
                }
                $num = count($data);
                //echo "<p> $num champs à la ligne $row: <br /></p>\n";
                $row++;
                $cols = array();
                for ($c=0; $c < $num; $c++) {
                    array_push($cols, $data[$c]);
                    //echo $data[$c] . "<br />\n";
                }
                array_push($this->list_row, $cols);
            }
            fclose($handle);
        }
    }


    function insert_into_db($host="localhost", $port=3306, $db_name="proto_qp", $username="root", $password="", $table="qp")
    {
        // Create connection
        $conn = new mysqli($host, $username, $password, $db_name, $port);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        echo "Connected successfully\n";
        $conn->close();
        if (!is_resource($conn)) {
            echo "Disconnected successfully\n";
        }
    }




}