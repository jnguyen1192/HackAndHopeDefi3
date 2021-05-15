
<?php
include 'credentials.php';
include 'config.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

try{
    $db = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $db->exec("set names utf8");
}catch(PDOException $exception){
    echo "Erreur de connexion : " . $exception->getMessage();
}

// On prépare la requête
$query = $db->prepare($sql);

// On exécute la requête
$query->execute();
$i = 2; // Clé utilisé pour l'iframe, l'url commence à 2 au lieu de 1 pour pk (https://dev.nos-ecoles.fr/nos_ecoles.php?operation=view&pk0=2)
while($row = $query->fetch(PDO::FETCH_ASSOC)){
    $tableauPoints['points'][] = extract_into_point_iframe($row, $i);
    $i++;
}

/*
// Pour travailler en local
$fp = fopen('results.json', 'w');
fwrite($fp, json_encode($tableauPoints));
fclose($fp);*/
// On encode en json et on envoie
echo json_encode($tableauPoints);
