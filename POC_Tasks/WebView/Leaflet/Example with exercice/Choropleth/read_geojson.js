
var map = L.map('map').setView([43.28817965, 5.40450052], 11);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',

}).addTo(map);


// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Marseille Sector</h4>' +  (props ?
        '<b>' + props.NOM_QUA + '</b><br />'
        : 'Hover over a sector');
};

info.addTo(map);


// get color depending on population density value
function getSectorColor(d) {
    return d > 1000 ? '#3EA78C' :
        d > 500  ? '#65B9A3' :
            d > 200  ? '#84C7B5' :
                d > 100  ? '#9DD2C4' :
                    d > 50   ? '#B1DBD0' :
                        d > 20   ? '#C1E2D9' :
                            d > 10   ? '#CDE8E1' :
                                '#D7EDE7';
}


function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getSectorColor(100)
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
    layer.bindTooltip(
        feature.properties.NOM_QUA,
        {
            permanent:true,
            direction:'center',
            className: 'districtLabel'
        });
}

geojson = L.geoJson(sectorsData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('Marseille Sector data &copy; <a href="http://data.gouv.fr/">Data France</a>');

/* Zoom show by level*/
map.eachLayer(function(l) {
    if (l.getTooltip) {
        var toolTip = l.getTooltip();
        if (toolTip) {
            this.map.closeTooltip(toolTip);
        }
    }
});
var lastZoom;
var zoomLevel = 13 ;
map.on('zoomend', function() {
    var zoom = map.getZoom();
    if (zoom < zoomLevel && (!lastZoom || lastZoom >= zoomLevel)) {
        map.eachLayer(function(l) {
            if (l.getTooltip) {
                var toolTip = l.getTooltip();
                if (toolTip) {
                    this.map.closeTooltip(toolTip);
                }
            }
        });
    } else if (zoom >= zoomLevel && (!lastZoom || lastZoom < zoomLevel)) {
        map.eachLayer(function(l) {
            console.log(l);
            if (l.getTooltip) {
                var toolTip = l.getTooltip();
                if (toolTip) {
                    this.map.addLayer(toolTip);
                }
            }
        });
    }
    lastZoom = zoom;
})

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            '<i style="background:' + getColor(from + 1) + '"></i> ' +
            from + (to ? '&ndash;' + to : '+'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(map);
