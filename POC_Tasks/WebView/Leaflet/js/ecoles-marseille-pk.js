function processJsonData(jsonData, markersLayer, nb_marker=null) {
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

    if (nb_marker != null) {
        jsonData.points = [jsonData.points[0]]
    }
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
        // Ajout du contenu des onglets dans la fenêtre contextuelle

        if(point[1].pk !== undefined) {
            //console.log(point[1].pk.toString())
            //console.log(point[1].pk)
            // TODO use a file called popup.html to get the code and customize it
            // TODO https://dev.nos-ecoles.fr/demande_intervention.php?operation=insert
            popup = '<a class="leaflet-popup-previous-button" title="Retour" href="#" onclick="previousIframe()">&lt;</a><iframe id="inlineFrameExample0" class="iframes" style="padding-top: 2%; width: 100%; height: 98%;border-width: 0px;" title="Inline Frame Example0" src="./php/test_iframe.php?url=https%3A%2F%2Fdev.nos-ecoles.fr%2Fnos_ecoles.php%3Foperation%3Dview%26pk0%3D' + point[1].pk.toString() + '"></iframe>';

            //console.log(popup)
            /* 4) Marker with popup added on map */
            var marker = L.marker(new L.latLng([point[1].ecole_lat, point[1].ecole_long]), config)
                .bindTooltip(point[1].ecole_appellation) // Ajout d'une infobulle au marqueur
                .bindPopup(popup); // Ajout de la fenêtre contextuelle du marqueur
            //console.log(markersLayer);
            markersLayer.addLayer(marker); // Ajout du marqueur dans la couche possédant les marqueurs
        }
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

function previousIframe() {
    $("#inlineFrameExample0").attr('src', window.history.back());
}