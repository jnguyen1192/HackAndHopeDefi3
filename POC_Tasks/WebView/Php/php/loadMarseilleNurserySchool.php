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
                source: new ol.source.OSM()
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
        // TODO POPUP MARKER Add other information
        echo 'new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat(['. $row['longitude']  .', '. $row['latitude']  .'])),
                    title: \''. str_replace("'", "\'", $row['Nom du site'])  .'\',
                    category: \'' . $row['Categorie'] . '\',
                    }),';
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
//$pmesd = new protoLoadMarseilleSchoolDB("Ecoles elementaires");// create object elementary
//$category = "Ecoles maternelles";
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
            // TODO POPUP MARKER CUSTOM DISPLAY
            content.innerHTML = \'<b>Les points proviennent d\\\'une BD Mysql!</b><br />Je rajouterai les effectifs\';


            var feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
                return feature;
            });
            console.log(infoElement, feature, feature.get(\'title\'));
            infoElement.innerHTML = feature ? feature.get(\'title\') : \'\';

            overlay.setPosition(coordinate);
        } else {
            overlay.setPosition(undefined);
            closer.blur();
        }
    });
    function ShowHide(chkSchool) {
    for (var i = 0; i < map.getLayers().array_.length; i++) {
        var obj = map.getLayers().array_[i];
        if (obj.values_.category == chkSchool.value) {
            chkSchool.checked ? map.getLayers().array_[i].setVisible(true):map.getLayers().array_[i].setVisible(false);
            console.log(i);
        }
    }
}';
echo '</script>';