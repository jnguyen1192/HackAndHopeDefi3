// Creation du cookie
checkCookie();
console.log(getCookie("username"));

// Creation de la carte
let mp = new MapBuilder("mapid", "findbox"); // mapid and findbox are the id of map div and searchbox div
//var map = mp.create();

// Legendes
createLegend(mp.map);

// Secteurs Marseille
if (typeof sectorsData !== 'undefined') {
    processGeojsonData(sectorsData, mp.map); // mp.map est la carte où ajouter les secteurs
    delete sectorsData;
}

// Ecoles Marseille
processJsonData(donnees, mp.markersLayer); // mp.markersLayer est la couche où ajouter les marqueurs
delete donnees;

// Quartiers prioritaires
processData(districtPriorityData, mp.map); // mp.map est la carte où ajouter les quartiers prioritaires
delete districtPriorityData;


/* // Recuperer les quartiers prioritaires a partir du csv
var statesData;
$.ajax({
    type: "GET",
    url: "data/quartiers_prioritaires_ecoles.csv", // "liste_quartiers_prioritairesville.csv",
    dataType: "text",
    success: function(data) {
        statesData = processData(data);
    }
});*/
