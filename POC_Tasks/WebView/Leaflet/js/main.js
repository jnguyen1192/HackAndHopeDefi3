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

// Iframe
/*
mp.map.on('popupopen', function() {
        $("#inlineFrameExample0").contents().find("li a").each(function() {
            $(this).on('click', function() {
                $("#inlineFrameExample0").contents().find("li a").each(function() {
                    $(this).parent().attr("class","");
                });
                $(this).parent().attr("class","active");
                $("#inlineFrameExample0").contents().find(".tab-pane").each(function() {
                    $(this).attr("class","tab-pane");
                });
                //console.log($(this).attr("href"));
                var id = $(this).attr("href");
                $("#inlineFrameExample0").contents().find(".tab-pane").each(function() {
                    //console.log($(this).attr("id"));
                    if(id == "#" + $(this).attr("id")) {
                        $(this).attr("class","tab-pane active in");
                    }
                });
                //$("div"+$(this).attr("href")).setAttribute("class", "tab-pane active in");


            });

        });
    });
*/
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
