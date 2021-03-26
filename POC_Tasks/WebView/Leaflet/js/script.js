/*var map = new L.Map('map', {
    layers: [
        new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        })
    ],
    center: [0, 0],
    zoom: 0
});*/



/*
var mymap = L.map('mapid').setView([43.32417965, 5.37450052
], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

L.marker([43.32417965, 5.37450052]).addTo(mymap)
    .bindPopup("<b>0130698N\n</b><br />Ecole élémentaire Canet Barbès\n13014\n4\tFAVORABLE\t100-200\n").openPopup();

L.circle([51.508, -0.11], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(mymap).bindPopup("I am a circle.");

L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap).bindPopup("I am a polygon.");


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);
*/
function readCsvIntoTable(filename, id_div) {
    $(document).ready(function(){
        $.ajax({
            url:filename,
            dataType:"text",
            success:function(data)
            {
                var employee_data = data.split(/\r?\n|\r/);
                var table_data = '<table class="table table-bordered table-striped">';
                for(var count = 0; count<employee_data.length; count++)
                {
                    var cell_data = employee_data[count].split(";");
                    table_data += '<tr>';
                    for(var cell_count=0; cell_count<cell_data.length; cell_count++)
                    {
                        if(count === 0)
                        {
                            table_data += '<th>'+cell_data[cell_count]+'</th>';
                        }
                        else
                        {
                            if(cell_data[cell_count] !== "<a target=\"_blank\" href=\"\"></a>") {
                                table_data += '<td>'+cell_data[cell_count]+'</td>';
                            }
                        }
                    }
                    table_data += '</tr>';
                }
                table_data += '</table>';
                $(id_div).html(table_data);
            }
        });

    });
}
if(page !== "index.html") {
    readCsvIntoTable("data/fonctionnalites.csv", '#funct_tables');
    readCsvIntoTable("data/sources", '#source_tables');
}




var map = L.map("mapid").setView([43.28817965, 5.40450052], 11);//[43.32417965, 5.37450052], 14);

var controlLoading = L.Control.loading();
map.addControl(controlLoading);
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var markersLayer = new L.LayerGroup();
map.addLayer(markersLayer);

map.addControl( new L.Control.Search({
    container: 'findbox',
    layer: markersLayer,
    initial: false,
    collapsed: false
}) );
//controlLoading._showIndicator();

// Secteurs Marseille
if (typeof sectorsData !== 'undefined') {
    processGeojsonData(sectorsData);
    delete sectorsData;
}

/*
$.ajax({
    type: "GET",
    url: "data/quartiers_prioritaires_ecoles.csv", // "liste_quartiers_prioritairesville.csv",
    dataType: "text",
    success: function(data) {
        statesData = processData(data);
    }
});*/
/*
*/
// Ecoles Marseille
processJsonData(donnees);
delete donnees;

/*

 */

// Quartiers prioritaires

processData(districtPriorityData);
delete districtPriorityData;