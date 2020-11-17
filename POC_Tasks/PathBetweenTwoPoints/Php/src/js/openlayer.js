
var raster;
var source;
var vector;
var map;
var typeSelect;
var draw;
var features = new ol.Collection();
var format = new ol.format.WKT();
var current_shape = "point";

var fill = new ol.style.Fill({
    color: 'rgba(210, 122, 167,0.2)'
});
var stroke = new ol.style.Stroke({
    color: '#B40404',
    width: 2
});

var styles = [
    new ol.style.Style({
        image: new ol.style.Circle({
            fill: fill,
            stroke: stroke,
            radius: 5
        }),
        fill: fill,
        stroke: stroke
    })
];

function addInteraction(shape) {
    draw = new ol.interaction.Draw({
        features: features,
        type: /** @type {ol.geom.GeometryType} */ shape
    });
    map.addInteraction(draw);
}

/**
 * Let user change the geometry type.
 * @param {Event} e Change event.
 */
function createVector() {
    vector = new ol.layer.Vector({
        source: new ol.source.Vector({ features: features }),
        style: styles
    });
}

function toEPSG4326(element, index, array) {
    element = element.getGeometry().transform('EPSG:3857', 'EPSG:4326');
}

function toEPSG3857(element, index, array) {
    element = element.getGeometry().transform('EPSG:4326', 'EPSG:3857');
}

function selectGeom(shape) {
    current_shape = shape;
    map.removeInteraction(draw);
    addInteraction(shape);
}

function init() {
    // document.getElementById("missing_wkt").style.display = "block";
    createVector();
    raster = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    features.on("add", function (e) {
        restoreDefaultColors();
        features.forEach(toEPSG4326);
        document.getElementById('wktStringTextArea').value = format.writeFeatures(features.getArray(), { rightHanded: true });
        features.forEach(toEPSG3857);
    });

    map = new ol.Map({
        layers: [raster, vector],
        target: 'map',
        view: new ol.View({
            center: [-11000000, 4600000],
            zoom: 4
        })
    });
    plotWKT();
    selectGeom('Point');
}

function restoreDefaultColors() {
    document.getElementById("wktStringTextArea").style.borderColor = "";
    document.getElementById("wktStringTextArea").style.backgroundColor = "";
};

// Plot wkt string on map
function plotWKT() {
    var new_feature;

    wkt_string = document.getElementById("wktStringTextArea").value;
    if (wkt_string == "") {
        document.getElementById("wktStringTextArea").style.borderColor = "red";
        document.getElementById("wktStringTextArea").style.backgroundColor = "#F7E8F3";
        return;
    } else {
        try {
            new_feature = format.readFeature(wkt_string);
        } catch (err) {
        }
    }

    if (!new_feature) {
        document.getElementById("wktStringTextArea").style.borderColor = "red";
        document.getElementById("wktStringTextArea").style.backgroundColor = "#F7E8F3";
        return;
    } else {
        map.removeLayer(vector);
        features.clear();
        new_feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
        features.push(new_feature);
    }
    vector = new ol.layer.Vector({
        source: new ol.source.Vector({ features: features }),
        style: styles
    });

    selectGeom(current_shape);
    map.addLayer(vector);
    derived_feature = features.getArray()[0];
    extent = derived_feature.getGeometry().getExtent();
    minx = derived_feature.getGeometry().getExtent()[0];
    miny = derived_feature.getGeometry().getExtent()[1];
    maxx = derived_feature.getGeometry().getExtent()[2];
    maxy = derived_feature.getGeometry().getExtent()[3];
    centerx = (minx + maxx) / 2;
    centery = (miny + maxy) / 2;
    map.setView(new ol.View({
        center: [centerx, centery],
        zoom: 8,
        maxZoom:18 // TODO correct zoom
    }));
    map.getView().fit(extent, map.getSize());
}

function clearMap() {
    map.removeLayer(vector);
    features.clear();
    vector = new ol.layer.Vector({
        source: new ol.source.Vector({ features: features }),
        style: styles
    });
    selectGeom(current_shape);
    map.addLayer(vector);
    document.getElementById("wktStringTextArea").value = "";
    restoreDefaultColors();
}