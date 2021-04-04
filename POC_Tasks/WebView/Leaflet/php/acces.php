
<?php
include 'credentials.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

try{
    $db = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $db->exec("set names utf8");
}catch(PDOException $exception){
    echo "Erreur de connexion : " . $exception->getMessage();
}

$sql = "SELECT * FROM v_1";

// On prépare la requête
$query = $db->prepare($sql);

// On exécute la requête
$query->execute();

while($row = $query->fetch(PDO::FETCH_ASSOC)){
    extract($row);

    $point = [
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

    $tableauPoints['points'][] = $point;
}

/*
// Pour travailler en local
$fp = fopen('results.json', 'w');
fwrite($fp, json_encode($tableauPoints));
fclose($fp);*/
// On encode en json et on envoie
echo json_encode($tableauPoints);
