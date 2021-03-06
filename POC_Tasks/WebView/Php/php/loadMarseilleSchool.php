<?php

// import lib
require "protoLoadMarseilleSchoolDB.php";
// create object
// load from db
//echo print_r($pmnsd->list_row[0]);
// print in javascript

echo '<script type="text/javascript">';
echo 'var lon = 5.4;
    var lat = 43.30;
    var lon_1 = 5.39;
    var lat_1 = 43.29;
    var attribution = new ol.control.Attribution({
        collapsible: false
    });

    var map = new ol.Map({
        controls: ol.control.defaults({ attribution: false }).extend([attribution]),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
              attributions: [
              ol.source.OSM.ATTRIBUTION,
                \'Tiles courtesy of \' +
                \'<a href="http://openstreetmap.org">\' +
    \'OpenStreetMap\' +
\'</a>\'
              ],
              url: \'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=u6e9tX5rOGAnnlVjt6l7\' // http://c.tile.stamen.com/watercolor/${z}/${x}/${y}.jpg
            })
            })
        ],
        target: \'map\',
        view: new ol.View({
            center: ol.proj.fromLonLat([lon, lat]),
            maxZoom: 18,
            zoom: 12
        })
    });';
function echo_markers($category)
{
    $pmsd = new protoLoadMarseilleSchoolDB($category);// create object nursery
    echo 'var markers = [';
    foreach ($pmsd->list_row as $row){

        echo 'new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat(['. $row['longitude']  .', '. $row['latitude']  .'])),
                    title: \''. str_replace("'", "\'", $row['Nom du site'])  .'\',
                    category: \'' . $row['Categorie'] . '\',
                    address: \'' . str_replace("'", "\'", $row['Adresse 1']) . '\',
                    email: \'' . $row['Email'] . '\',
                    phone: \'' . $row['Numero de telephone'] . '\',
                    }),'; //  TODO POPUP MARKER Add other information
    }
    echo '];
    var layer = new ol.layer.Vector({
        category: \''. $category .'\',
        source: new ol.source.Vector({
        features: markers
               })
    });
    map.addLayer(layer);';
}

function echo_areas($category)
{
    echo '
    var layer = new ol.layer.Vector({
        category: \''. $category .'\',
        source: new ol.source.Vector({
            url: \'data/geojson/liste_quartiers_prioritairesville.geojson\',
            format: new ol.format.GeoJSON(),
        }),
    });
    map.addLayer(layer);';
}

//$pmesd = new protoLoadMarseilleSchoolDB("Ecoles elementaires");// create object elementary
//$category = "Ecoles maternelles";
echo_areas("Quartiers prioritaires");
echo_markers("Ecoles maternelles");
echo_markers("Ecoles elementaires");


echo '
    var container = document.getElementById(\'popup\');
    var content = document.getElementById(\'popup-content\');
    var closer = document.getElementById(\'popup-closer\');
    var infoElement = document.getElementById(\'info\');

    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
    map.addOverlay(overlay);

    closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    map.on(\'singleclick\', function (event) {
        if (map.hasFeatureAtPixel(event.pixel) === true) {
            var coordinate = event.coordinate;
            var feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
                    return feature;
                });
            if (feature.get(\'category\') == "Ecoles elementaires" || feature.get(\'category\') == "Ecoles maternelles") {
                console.log(feature.get(\'category\'));
                // TODO POPUP MARKER CUSTOM DISPLAY
                content.innerHTML = \'<b>Les points proviennent d\\\'une BD Mysql!</b><br />Je rajouterai les effectifs\';
    
    
                
                console.log(infoElement, feature, feature.get(\'title\'));
                
                
                infoElement.innerHTML = feature ? feature.get(\'title\')
                  + "<br>" + feature.get(\'category\')
                  + "<br>" + feature.get(\'address\')
                   + "<br>" + feature.get(\'email\')
                    + "<br>" + feature.get(\'phone\'): \'\';
    
                overlay.setPosition(coordinate);
            }
            else if (feature.get(\'category\') == undefined) {
            // TODO add popup district priority information
            }
            else {
                overlay.setPosition(undefined);
                closer.blur();
            }
        } else {
            overlay.setPosition(undefined);
            closer.blur();
        }
    });
    function ShowHide(chkSchool) {
    for (var i = 0; i < map.getLayers().array_.length; i++) {
        var obj = map.getLayers().array_[i];
        console.log(i + " " + obj.values_.category + " " + chkSchool.value);
        if (obj.values_.category == chkSchool.value) {
            chkSchool.checked ? map.getLayers().array_[i].setVisible(true):map.getLayers().array_[i].setVisible(false);
            console.log(i + " " + obj.values_.category + " " + chkSchool.value);
        }
    }
}';
echo '</script>';