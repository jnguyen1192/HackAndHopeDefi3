function processJsonData(jsonData, markersLayer) {
    /*  1) Icone declaration
        2) Data form creation
        3) Html content popup creation
        4) Marker with popup added on map
    */
    /* 1) Icone declaration */
    // On definie les icones
    /*
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
        icon: 'linode',
        markerColor: 'green',
        prefix: 'fa'
    });*/
    /* https://fontawesome.com/ */
    // 'cubes' maternelle
    // 'linode' elementaire
    // 'child' primaire
    function createAwesomeIcon(icon_, color_) {
        return L.AwesomeMarkers.icon({
            icon: icon_,
            markerColor: color_,
            prefix: 'fa'
        });
    }
    var aiColor;
    var aiIcon;
    /* 2) Data form creation */
    // On boucle sur les données (ES8)
    Object.entries(jsonData.points).forEach(point => {
        // Ici j'ai une seule agence
        // On crée un marqueur pour l'agence
        /*
        var config = {
            title: point[1].ecole_appellation,
            icon: IconINCONNU
        }*/
        aiColor = 'orange';
        aiIcon = 'question'
        /* Icons */
        if(point[1].CRITERE1.indexOf('ELEMENTAIRE') >= 0 || point[1].CRITERE1.indexOf('ÉLÉMENTAIRE') >= 0) {
            aiIcon = 'linode';
        }
        if(point[1].CRITERE1.indexOf('MATERNELLE') >= 0) {
            aiIcon = 'cubes';
        }
        if(point[1].CRITERE1.indexOf('PRIMAIRE') >= 0) {
            aiIcon = 'child';
        }
        /* Colors */
        if (point[1].CRITERE4 == 'FAVORABLE') {
            aiColor = 'green';

        }

        if (point[1].CRITERE4 == 'DEFAVORABLE') {
            aiColor = 'red';
            /*
            var config = {
                title: point[1].ecole_appellation,
                icon: IconDEFAVORABLE
            }*/
        }

        var config = {
            title: point[1].ecole_appellation,
            icon: createAwesomeIcon(aiIcon, aiColor)
        }
        var obj = {
            location: {
                lat: point[1].ecole_lat,
                lng: point[1].ecole_long
            },
            data: {// Onglets et contenus
                "Généralités": {
                    "${button} Obtenir plus d'informations": "https://dev.nos-ecoles.fr/generalite.php?operation=select",
                    "${button} Ajouter des informations": "https://dev.nos-ecoles.fr/generalite.php?operation=insert",
                    "${button} Contacter": "https://dev.nos-ecoles.fr/generalite.php?operation=insert",
                    "Téléphone": "",
                    "Téléphone": "",
                    "Adresse, Code Postal, Ville": point[1].ecole_appellation + ", " + point[1].CRITERE2,
                    "Téléphone": "",
                    "Effectif": point[1].CRITERE5,
                    "OCCE ?": "",
                    "Quartier": point[1].CRITERE3
                },
                "Parents d'élèves": {
                    "${button} Obtenir plus d'informations": "https://dev.nos-ecoles.fr/parent.php?operation=select",
                    "${button} Ajouter des informations": "https://dev.nos-ecoles.fr/parent.php?operation=insert",
                    "${button} Contacter": "https://dev.nos-ecoles.fr/parent.php?operation=insert",
                    "APE / Représentants": "",
                    "Affiliation": "",
                    "Contact": ""
                },
                "Elu Secteur": {
                    "${button} Obtenir plus d'informations": "https://dev.nos-ecoles.fr/elusecteur.php?operation=select",
                    "${button} Ajouter des informations": "https://dev.nos-ecoles.fr/elusecteur.php?operation=insert",
                    "${button} Contacter": "https://dev.nos-ecoles.fr/elusecteur.php?operation=insert",
                    "Ecoles": "",
                    "Bâtis": "",
                    "Quartier": ""
                },
                "Elu Municipal": {
                    "${button} Obtenir plus d'informations": "https://dev.nos-ecoles.fr/elumunicipale.php?operation=select",
                    "${button} Ajouter des informations": "https://dev.nos-ecoles.fr/elumunicipale.php?operation=insert",
                    "${button} Contacter": "https://dev.nos-ecoles.fr/elumunicipale.php?operation=insert",
                    "Ecoles": "",
                    "Périscolaire": "",
                    "Bâti": ""
                },
                "Audit": {
                    "${button} Obtenir plus d'informations": "https://dev.nos-ecoles.fr/audit.php?operation=select",
                    "${button} Ajouter des informations": "https://dev.nos-ecoles.fr/audit.php?operation=insert",
                    "${button} Contacter": "https://dev.nos-ecoles.fr/audit.php?operation=insert",
                    "Liens": point[1].LIENS
                },
                "Informations complémentaires": {
                    "${button} Obtenir plus d'informations": "https://dev.nos-ecoles.fr/infocompl.php?operation=select",
                    "${button} Ajouter des informations": "https://dev.nos-ecoles.fr/infocompl.php?operation=insert",
                    "${button} Contacter": "https://dev.nos-ecoles.fr/infocompl.php?operation=insert",
                    "Circonscription": "",
                    "IEN": "",
                    "DASEN": "",
                    "DDEN": ""
                }
            }
        };

        /* 3) Html content popup creation */
        // Creation des onglets
        var tabs = '<div class="tabs">';
        var ul = '<ul class="tabs-link">';
        var num_tab = 1;
        var num_link_content;
        var link_content;
        var _key;
        var _value;
        // Pour chaque mot clefs, nous ajoutons un onglet
        for(var tab_title_index in Object.keys(obj.data)) {
            // Ajout d'un onglet
            ul += '<li class="tab-link"> <a href="#tab-'+ num_tab.toString() + ' " onclick="$(\'.\' + $(this).attr(\'href\').slice(1,4)).hide();$($(this).attr(\'href\')).show();"><span>'+ Object.keys(obj.data)[tab_title_index] + '</span></a></li>';
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
                    link_content +=    '<button type="button" onClick="javascript:window.open(\''+ _value + '&username=' + getCookie("username") + '\', \'_blank\');" formtarget="_blank">' + _key + '</button>';
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

        /* 4) Marker with popup added on map */
        var marker = L.marker(new L.latLng([obj.location.lat, obj.location.lng]), config)
            .bindTooltip(point[1].ecole_appellation) // Ajout d'une infobulle au marqueur
            .bindPopup(popup); // Ajout de la fenêtre contextuelle du marqueur
        //console.log(markersLayer);
        markersLayer.addLayer(marker); // Ajout du marqueur dans la couche possédant les marqueurs
        // TODO Test
        var test_type = point[1].CRITERE1;
        console.log(test_type);
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
            }
        }
    }
    xmlhttp.open("GET", "php/acces.php", false); // False pour avoir un comportement synchrone
    xmlhttp.send(null);

    return donnees;
}