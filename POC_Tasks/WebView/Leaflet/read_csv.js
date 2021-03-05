function processData(allText) {

    function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    //var file = loadFile("liste_quartiers_prioritairesville.csv");
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(';');
    var lines = [];
    var statesDataString = '{"type":"FeatureCollection","features":[';

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    // alert(lines);
    for (var i=1; i<lines.length; i++) {
        var test = lines[i][11];
        //console.log(typeof(test));
        //console.log(lines[i]);
        if(test !== "") {
            newTemp = test.replace(/""/g, '"');
            var json_string = newTemp.slice(1, newTemp.length - 1)
            //console.log(json_string);
            //console.log(lines[i][9]);
            statesDataString += '{"type":"Feature","id":"'+ pad(i, 6) +'","properties":{"name":"'+ lines[i][9] +'","density":'+ lines[i][13] +'},"geometry":' + json_string + '},'
            //console.log();
            //console.log(JSON.parse(json_string));

        }
    }
    statesDataString = statesDataString.slice(0, -1);
    statesDataString += ']}';
    //console.log(statesDataString);
    //console.log(statesData);
    //console.log("Process file OK");
    var statesData = JSON.parse(statesDataString);

    // TODO BEGIN select the right map
    // TODO END

    // control that shows state info on hover
    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = '<h4>Quartier prioritaire</h4>' +  (props ?
            '<b>' + props.name + '</b><br />' + '<b>' + props.density + '</b><br />'
            : 'Sélectionner un quartier prioritaire');
    };

    info.addTo(map);


    // get color depending on population density value
    function getColor(d) {
        return d > 1000 ? '#800026' :
            d > 500  ? '#BD0026' :
                d > 200  ? '#E31A1C' :
                    d > 100  ? '#FC4E2A' :
                        d > 50   ? '#FD8D3C' :
                            d > 20   ? '#FEB24C' :
                                d > 10   ? '#FED976' :
                                    '#FFEDA0';
    }

    function style(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: getColor(feature.properties.density)
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
    }

    geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

    map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


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

    //legend.addTo(map);
}

$.ajax({
    type: "GET",
    url: "quartiers_prioritaires_ecoles.csv", // "liste_quartiers_prioritairesville.csv",
    dataType: "text",
    success: function(data) {statesData = processData(data);}
});