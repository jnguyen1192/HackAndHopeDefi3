// control that shows state info on hover
function processGeojsonData(geojsonData, map) {
    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = '<h4>Secteur</h4>' + (props ?
            '<b>' + props.NOM_QUA + '</b><br />'
            : 'Sélectionner un secteur');
    };

    info.addTo(map);


    // get color depending on population density value
    function getSectorColor(d) {
        return d > 1000 ? '#3EA78C' :
            d > 500 ? '#65B9A3' :
                d > 200 ? '#84C7B5' :
                    d > 100 ? '#9DD2C4' :
                        d > 50 ? '#B1DBD0' :
                            d > 20 ? '#C1E2D9' :
                                d > 10 ? '#CDE8E1' :
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
            //layer.bringToFront();
        }

        info.update(layer.feature.properties);
    }

    var geojson;

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        e.target.bringToBack();
        //console.log('Bring to back');
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
                permanent: true,
                direction: 'center',
                className: 'sectorLabel'
            });
    }

    geojson = L.geoJson(geojsonData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);


    /* Zoom show by level*/
    map.eachLayer(function (l) {
        if (l.getTooltip) {
            var toolTip = l.getTooltip();
            if (toolTip) {
                map.closeTooltip(toolTip);
            }
        }
    });


}
