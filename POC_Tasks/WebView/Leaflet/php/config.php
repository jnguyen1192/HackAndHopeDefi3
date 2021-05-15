
<?php

$sql = "SELECT * FROM v_1";

function extract_into_point($row) {
    // extract a row into a point
    extract($row);
    return [
        "ecole_RNE" => $ecole_RNE,
        "ecole_lat" => $ecole_lat,
        "ecole_long" => $ecole_long,
        "ecole_appellation" => $ecole_appellation,
		"CRITERE1" => $CRITERE1,
		"CRITERE2" => $CRITERE2,
		"CRITERE3" => $CRITERE3,
		"CRITERE4" => $CRITERE4,
		"CRITERE5" => $CRITERE5,
    ];
}

function extract_into_point_iframe($row, $i) {
    // extract a row into a point
    extract($row);
    return [
        "ecole_lat" => $ecole_lat,
        "ecole_long" => $ecole_long,
        "ecole_appellation" => $ecole_appellation,
		"CRITERE1" => $CRITERE1,
		"CRITERE2" => $CRITERE2,
		"CRITERE3" => $CRITERE3,
		"CRITERE4" => $CRITERE4,
		"CRITERE5" => $CRITERE5,
		"pk" => $i
    ];
}