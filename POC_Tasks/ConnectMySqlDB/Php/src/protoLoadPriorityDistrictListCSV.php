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
}