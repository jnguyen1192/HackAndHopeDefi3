<?php
/*

	Get the route between two points

*/

$origin = $_POST['origin']; // data retrieve from form
$destination = $_POST['destination'];

require('PathBetweenTwoPointsPedestrian.php'); // Don't forget to add the extension for curl in php.ini

$ptpp = new PathBetweenTwoPointsPedestrian(); // by default it will used 2 points and a test/dev key for the rest api


echo $ptpp->get_http_result();
// TODO show a map with the route between the two points
