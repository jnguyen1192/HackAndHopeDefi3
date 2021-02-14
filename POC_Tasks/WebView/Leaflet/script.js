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
                            table_data += '<td>'+cell_data[cell_count]+'</td>';
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




var map = L.map("mapid").setView([43.32417965, 5.37450052], 10);

L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



let xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = () => {
    // La transaction est terminée ?
    if(xmlhttp.readyState == 4){
        // Si la transaction est un succès
        if(xmlhttp.status == 200){
            // On traite les données reçues
            let donnees = JSON.parse(xmlhttp.responseText)

            // On boucle sur les données (ES8)
            Object.entries(donnees.points).forEach(point => {
                // Ici j'ai une seule agence
                // On crée un marqueur pour l'agence
                //let marker = L.marker([, ]).addTo(carte)
                //marker.bindPopup()

                var obj = {
                    location: {
                        lat: point[1].ecole_lat,
                        lng: point[1].ecole_long
                    },
                    data: {
                        "Généralités": {
                            "Adresse, Code Postal, Ville": point[1].ecole_appellation,
                            "Téléphone": "",
                            "Effectif": "",
                            "OCCE ?": "",
                            "Quartier": "1"
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
                L.marker([obj.location.lat, obj.location.lng])
                    .addTo(map)
                    .bindPopup(popupContent, {
                        minWidth: 500,
                        data: obj
                    });
            })
        }else{
            console.log(xmlhttp.statusText);
        }
    }
}

xmlhttp.open("GET", "./acces.php");

xmlhttp.send(null);




map.on('popupopen', function(e) {
    var firstTabId = _.kebabCase(_.keys(e.popup.options.data.data)[0]);
    if (document.location.hash != '' || document.location.hash != '#'){
        document.location.hash = '#tab-';
    }
    document.location.hash = '#tab-'+firstTabId;
});
