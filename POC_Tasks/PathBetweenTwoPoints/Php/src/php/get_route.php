<?php
/*

	Get the route between two points

*/

$origin = $_POST['origin']; // data retrieve from form
$destination = $_POST['destination'];

require('PathBetweenTwoPointsPedestrian.php'); // Don't forget to add the extension for curl in php.ini

$ptpp = new PathBetweenTwoPointsPedestrian('choisirgeoportail', $origin, $destination); // by default it will used 2 points and a test/dev key for the rest api

$data = json_decode($ptpp->get_http_result());
echo $data->geometryWkt;
// TODO show a map with the route between the two points
