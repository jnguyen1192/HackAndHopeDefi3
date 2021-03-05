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
readCsvIntoTable("fonctionnalites.csv", '#funct_tables');
readCsvIntoTable("sources", '#source_tables');

Handlebars.registerHelper('kebabCase', function(name) {
    return _.kebabCase(name)
});

var IconDEFAVORABLE = L.AwesomeMarkers.icon({
    icon: 'exclamation-circle',
    markerColor: 'red',
    prefix: 'fa',
    spin: true
});

var IconINCONNU = L.AwesomeMarkers.icon({
    icon: 'question',
    markerColor: 'orange',
    prefix: 'fa'
});

var IconFAVORABLE = L.AwesomeMarkers.icon({
    icon: 'check',
    markerColor: 'green',
    prefix: 'fa'
});



var map = L.map("mapid").setView([43.32417965, 5.37450052], 14);

var controlLoading = L.Control.loading();
map.addControl(controlLoading);
controlLoading._showIndicator();
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


let xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = () => {
    // La transaction est terminée ?
    if(xmlhttp.readyState == 4){
        // Si la transaction est un succès
        if(xmlhttp.status == 200){
            // On traite les données reçues
            let donnees = JSON.parse(xmlhttp.responseText)
            var i = 0;
            // On boucle sur les données (ES8)
            Object.entries(donnees.points).forEach(point => {
                // Ici j'ai une seule agence
                // On crée un marqueur pour l'agence
                //let marker = L.marker([, ]).addTo(carte)
                //marker.bindPopup()
                var config = {
                    title: point[1].ecole_appellation,
                    icon: IconINCONNU
                }
                if(i == 0) {
                    //console.log(point[1]);
                }
                i = i + 1;
                if (point[1].CRITERE4 == 'FAVORABLE') {
                    var config = {
                        title: point[1].ecole_appellation,
                        icon: IconFAVORABLE
                    }
                }

                if (point[1].CRITERE4 == 'DEFAVORABLE') {
                    var config = {
                        title: point[1].ecole_appellation,
                        icon: IconDEFAVORABLE
                    }
                }

                var obj = {
                    location: {
                        lat: point[1].ecole_lat,
                        lng: point[1].ecole_long
                    },
                    data: {
                        "Généralités": {
                            "Adresse, Code Postal, Ville": point[1].ecole_appellation + ", " + point[1].CRITERE2,
                            "Téléphone": "",
                            "Effectif": point[1].CRITERE5,
                            "OCCE ?": "",
                            "Quartier": point[1].CRITERE3
                        },
                        "Parents d'élèves": {
                            "APE / Représentants": "",
                            "Affiliation": "",
                            "Contact": ""
                        },
                        "Elu Secteur": {
                            "Ecoles": "",
                            "Bâtis": "",
                            "Quartier": ""
                        },
                        "Elu Municipal": {
                            "Ecoles": "",
                            "Périscolaire": "",
                            "Bâti": ""
                        },
                        "Informations complémentaires": {
                            "Circonscription": "",
                            "IEN": "",
                            "DASEN": "",
                            "DDEN": ""
                        }
                    }
                };

                var popupTemplatePanel = Handlebars.compile(document.getElementById('template-popup').innerHTML);
                // console.log(popupTemplateVertical);
                var popupContent = popupTemplatePanel(obj);
                var marker = L.marker(new L.latLng([obj.location.lat, obj.location.lng]), config)
                    .bindPopup(popupContent, {
                        minWidth:450,
                        /*maxWidth: 300,
                        maxHeight: 300,*/
                        keepInView: true,
                        data: obj
                    }).bindTooltip(point[1].ecole_appellation);
                markersLayer.addLayer(marker);

            })
        }else{
            console.log(xmlhttp.statusText);
        }
    }
}

xmlhttp.open("GET", "./acces.php");

xmlhttp.send(null);




map.on('popupopen', function(e) {
    map.invalidateSize();
    var firstTabId = _.kebabCase(_.keys(e.popup.options.data.data)[0]);
    if (document.location.hash != '' || document.location.hash != '#'){
        document.location.hash = '#tab-';
    }
    document.location.hash = '#tab-'+firstTabId;

    var container = $("html,body");
    container.animate({
        scrollTop: 400
    });

    $("a.panel-block").click(function(e) {
        e.preventDefault(); // desactive la fonction precedente
        $('.' + $($(this).attr('href')).attr('class').replace(" ", ".")).hide(); // cache toutes les tabs
        $($(this).attr('href')).show(); // montre la tab courante
    });// Auto-scroll désactivé après un clique sur le marqueur
});

