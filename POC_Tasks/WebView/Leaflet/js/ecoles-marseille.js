function processJsonData(jsonData, markersLayer) {
/*
    Handlebars.registerHelper('kebabCase', function(name) {
        return _.kebabCase(name)
    });*/

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
    // On boucle sur les données (ES8)

    Object.entries(jsonData.points).forEach(point => {
        // Ici j'ai une seule agence
        // On crée un marqueur pour l'agence
        //let marker = L.marker([, ]).addTo(carte)
        //marker.bindPopup()
        var config = {
            title: point[1].ecole_appellation,
            icon: IconINCONNU
        }
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
                    "${button} Obtenir plus d'informations": "https://dev.nos-ecoles.fr/Document.php?operation=select",
                    "${button} Ajouter des informations": "https://dev.nos-ecoles.fr/Document.php?operation=insert",
                    "${button} Contacter": "https://dev.nos-ecoles.fr/Document.php?operation=insert",
                    "Téléphone": "",
                    "Téléphone": "",
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
                "Audit": {
                    "Liens": point[1].LIENS
                },
                "Informations complémentaires": {
                    "Circonscription": "",
                    "IEN": "",
                    "DASEN": "",
                    "DDEN": ""
                }
            }
        };
        //console.log(obj);
        // Creation des onglets
        var tabs = '<div class="tabs">';
        var ul = '<ul class="tabs-link">';
        var num_tab = 1;
        var num_link_content;
        var link_content;
        var _key;
        var _value;
        //console.log(obj.data[Object.keys(obj.data)[num_tab-1]]);
        // Pour chaque mot clefs, nous ajoutons un onglet
        for(var tab_title_index in Object.keys(obj.data)) {
            // Ajout d'un onglet
            ul += '<li class="tab-link"> <a href="#tab-'+ num_tab.toString() + '"><span>'+ Object.keys(obj.data)[tab_title_index] + '</span></a></li>';
            // Ajout du contenu de l'onglet
            tabs += '<div class="tab" id="tab-' + num_tab.toString() + '">' +
                '<div class="content">';
            link_content = "";
            num_link_content = 1;
            for(var link_content_index in Object.keys(obj.data[Object.keys(obj.data)[num_tab-1]])) {
                _key = Object.keys(obj.data[Object.keys(obj.data)[num_tab-1]])[num_link_content-1];
                _value = obj.data[Object.keys(obj.data)[num_tab-1]][Object.keys(obj.data[Object.keys(obj.data)[num_tab-1]])[num_link_content-1]];
                // case new button b with link
                if(_key.split(" ")[0] == "${button}") {
                    _key = _key.replace("${button} ", ""); // remove magic word from key
                    link_content +=    '<button type="button" onClick="javascript:window.open(\''+ _value + '\', \'_blank\');" formtarget="_blank">' + _key + '</button>';
                }
                else { // case new information p
                    link_content +=    '<p>'+ _key + ':'  + _value + '</p>'; // add content
                }

                num_link_content += 1;
            }
            tabs += link_content + '</div>' +
                '</div>';
            num_tab += 1;
        }
        // Ajout des onglets dans la fenêtre contextuelle
        var popup =  ul + '</ul>';
        // Ajout du contenu des onglets dans la fenêtre contextuelle
        popup += tabs + '</div>';
        var marker = L.marker(new L.latLng([obj.location.lat, obj.location.lng]), config)
            .bindTooltip(point[1].ecole_appellation) // Ajout d'une infobulle au marqueur
            .bindPopup(popup); // Ajout de la fenêtre contextuelle du marqueur
        //console.log(markersLayer);
        markersLayer.addLayer(marker); // Ajout du marqueur dans la couche possédant les marqueurs
    });
}

function getJsonFromDB() {
    var donnees;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
        // La transaction est terminée ?
        if(xmlhttp.readyState == 4){
            // Si la transaction est un succès
            if(xmlhttp.status == 200){
                // On traite les données reçues
                donnees = JSON.parse(xmlhttp.responseText)
                //console.log("In function");
                //console.log(donnees);
            }
        }
    }
    xmlhttp.open("GET", "php/acces.php", false); // False pour avoir un comportement synchrone
    xmlhttp.send(null);

    return donnees;
}