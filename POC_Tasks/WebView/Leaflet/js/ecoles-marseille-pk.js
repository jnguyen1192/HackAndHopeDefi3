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
    // Config files for popup
    var configDict = getContfigTxt();
    var popupHTML = getPopupHTML();
            //console.log(configDict);
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
        // https://www.iloveimg.com/resize-image/resize-svg#resize-options,pixels
        if(point[1].CRITERE1.indexOf('ELEMENTAIRE') >= 0 || point[1].CRITERE1.indexOf('ÉLÉMENTAIRE') >= 0) {
        //linode
            aiIcon = 'M 4.882812 2.210938 C 4.878906 2.203125 4.871094 2.195312 4.867188 2.191406 L 4.085938 1.8125 C 4.074219 1.808594 4.0625 1.808594 4.050781 1.8125 L 3.394531 2.164062 C 3.382812 2.171875 3.378906 2.179688 3.378906 2.191406 L 3.367188 2.496094 L 3.097656 2.339844 C 3.089844 2.335938 3.074219 2.335938 3.066406 2.339844 L 2.679688 2.546875 L 2.664062 2.203125 C 2.664062 2.195312 2.65625 2.1875 2.648438 2.183594 L 2.246094 1.945312 L 2.621094 1.773438 C 2.632812 1.769531 2.640625 1.757812 2.640625 1.746094 L 2.578125 0.453125 C 2.578125 0.445312 2.566406 0.433594 2.558594 0.429688 L 1.546875 0.00390625 C 1.535156 0 1.527344 0 1.519531 0 L 0.140625 0.375 C 0.125 0.382812 0.113281 0.398438 0.117188 0.414062 L 0.425781 1.710938 C 0.433594 1.746094 0.804688 1.980469 0.855469 2.015625 L 0.554688 2.140625 C 0.539062 2.148438 0.53125 2.164062 0.535156 2.171875 L 0.765625 3.152344 C 0.773438 3.179688 1.03125 3.378906 1.066406 3.410156 L 0.875 3.515625 C 0.863281 3.519531 0.855469 3.535156 0.859375 3.542969 C 0.875 3.613281 1.03125 4.304688 1.046875 4.316406 L 1.773438 4.992188 C 1.78125 4.996094 1.789062 4.996094 1.800781 5 C 1.804688 5 1.8125 4.996094 1.816406 4.996094 L 2.753906 4.339844 C 2.761719 4.335938 2.765625 4.328125 2.765625 4.320312 L 2.742188 3.871094 L 3.054688 4.101562 C 3.066406 4.109375 3.085938 4.109375 3.097656 4.101562 L 3.847656 3.578125 C 3.855469 3.574219 3.859375 3.566406 3.859375 3.558594 L 3.882812 3.230469 L 4.109375 3.367188 C 4.121094 3.375 4.140625 3.375 4.152344 3.367188 L 4.761719 2.941406 C 4.769531 2.9375 4.773438 2.929688 4.773438 2.921875 C 4.785156 2.859375 4.886719 2.230469 4.882812 2.210938 Z M 2.597656 2.257812 L 2.640625 3.160156 L 1.628906 3.757812 L 1.472656 2.816406 Z M 2.511719 0.5 L 2.570312 1.730469 L 1.378906 2.269531 L 1.160156 0.953125 Z M 0.492188 1.691406 L 0.199219 0.46875 L 1.089844 0.953125 L 1.308594 2.25 Z M 0.832031 3.132812 L 0.621094 2.246094 L 1.402344 2.816406 L 1.554688 3.726562 Z M 1.105469 4.28125 L 0.949219 3.628906 L 1.640625 4.222656 L 1.746094 4.882812 Z M 1.824219 4.914062 L 1.707031 4.21875 L 2.660156 3.621094 L 2.695312 4.304688 Z M 2.738281 3.789062 C 2.738281 3.757812 2.75 3.566406 2.714844 3.542969 L 2.445312 3.347656 L 2.695312 3.203125 C 2.71875 3.1875 2.707031 3.148438 2.707031 3.125 L 3.035156 3.34375 L 3.042969 4.011719 Z M 3.792969 3.539062 L 3.113281 4.015625 L 3.105469 3.34375 L 3.839844 2.886719 Z M 4.101562 3.289062 L 3.886719 3.160156 L 3.910156 2.828125 C 3.914062 2.820312 3.90625 2.808594 3.898438 2.800781 L 3.4375 2.535156 L 3.445312 2.242188 L 4.164062 2.640625 Z M 4.710938 2.902344 L 4.171875 3.277344 L 4.234375 2.640625 L 4.804688 2.28125 Z M 4.710938 2.902344';
        }
        if(point[1].CRITERE1.indexOf('MATERNELLE') >= 0) {
        //cube
            aiIcon = 'M 4.773438 2.445312 L 3.828125 2.089844 L 3.828125 1.03125 C 3.828125 0.882812 3.738281 0.753906 3.601562 0.703125 L 2.625 0.335938 C 2.542969 0.304688 2.457031 0.304688 2.375 0.335938 L 1.398438 0.703125 C 1.261719 0.753906 1.171875 0.882812 1.171875 1.03125 L 1.171875 2.089844 L 0.226562 2.445312 C 0.0898438 2.496094 0 2.625 0 2.773438 L 0 3.847656 C 0 3.980469 0.0742188 4.101562 0.195312 4.164062 L 1.171875 4.648438 C 1.269531 4.699219 1.386719 4.699219 1.484375 4.648438 L 2.5 4.140625 L 3.515625 4.648438 C 3.613281 4.699219 3.730469 4.699219 3.828125 4.648438 L 4.804688 4.164062 C 4.925781 4.101562 5 3.980469 5 3.847656 L 5 2.773438 C 5 2.625 4.910156 2.496094 4.773438 2.445312 Z M 3.496094 2.097656 L 2.664062 2.410156 L 2.664062 1.742188 L 3.496094 1.382812 Z M 1.503906 1.015625 L 2.5 0.644531 L 3.496094 1.015625 L 3.496094 1.023438 L 2.5 1.425781 L 1.503906 1.023438 Z M 2.324219 3.859375 L 1.492188 4.273438 L 1.492188 3.5 L 2.324219 3.125 Z M 2.324219 2.765625 L 1.328125 3.171875 L 0.332031 2.765625 L 0.332031 2.757812 L 1.328125 2.386719 L 2.324219 2.757812 Z M 4.667969 3.859375 L 3.835938 4.273438 L 3.835938 3.5 L 4.667969 3.125 Z M 4.667969 2.765625 L 3.671875 3.171875 L 2.675781 2.765625 L 2.675781 2.757812 L 3.671875 2.386719 L 4.667969 2.757812 Z M 4.667969 2.765625';
        }
        if(point[1].CRITERE1.indexOf('PRIMAIRE') >= 0) {
        //child
            aiIcon = 'M 1.5625 0.84375 C 1.5625 0.378906 1.980469 0 2.5 0 C 3.019531 0 3.4375 0.378906 3.4375 0.84375 C 3.4375 1.308594 3.019531 1.6875 2.5 1.6875 C 1.980469 1.6875 1.5625 1.308594 1.5625 0.84375 Z M 4.878906 0.859375 C 4.714844 0.714844 4.453125 0.714844 4.289062 0.859375 L 3.160156 1.875 L 1.839844 1.875 L 0.710938 0.859375 C 0.546875 0.714844 0.285156 0.714844 0.121094 0.859375 C -0.0390625 1.007812 -0.0390625 1.242188 0.121094 1.390625 L 1.355469 2.5 L 1.355469 5.625 C 1.355469 5.832031 1.539062 6 1.769531 6 L 1.980469 6 C 2.210938 6 2.394531 5.832031 2.394531 5.625 L 2.394531 4.3125 L 2.605469 4.3125 L 2.605469 5.625 C 2.605469 5.832031 2.789062 6 3.019531 6 L 3.230469 6 C 3.460938 6 3.644531 5.832031 3.644531 5.625 L 3.644531 2.5 L 4.878906 1.390625 C 5.039062 1.242188 5.039062 1.007812 4.878906 0.859375 Z M 4.878906 0.859375';
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

        /*var config = {
            title: point[1].ecole_appellation,
            icon: createAwesomeIcon(aiIcon, aiColor)
        }*/
        //var pathFillColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        var config = {
            icon: L.divIcon({
                className: 'ship-div-icon',
                html: '<svg version="1.1" id="marker-15" xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" viewBox="0 0 15 15">  <path fill="'+aiColor+'"  d="'+aiIcon+'"/> </svg>'
            })
        }
        // Ajout du contenu des onglets dans la fenêtre contextuelle

        if(point[1].pk !== undefined) {
            //console.log(point[1].pk.toString())
            //console.log(point[1].pk)
            // TODO use a file called popup.html to get the code and customize it
            // TODO https://dev.nos-ecoles.fr/demande_intervention.php?operation=insert
            /* const fileUrl = '' // provide file location

fetch(fileUrl)
   .then( r => r.text() )
   .then( t => console.log(t) )
   */
            //console.log(getPopupHTML());
            //popup = '<a class="leaflet-popup-previous-button" title="Retour" href="#" onclick="previousIframe()">&lt;</a><iframe id="inlineFrameExample0" class="iframes" style="padding-top: 2%; width: 100%; height: 98%;border-width: 0px;" title="Inline Frame Example0" src="./php/test_iframe.php?url=https%3A%2F%2Fdev.nos-ecoles.fr%2Fnos_ecoles.php%3Foperation%3Dview%26pk0%3D' + point[1].pk.toString() + '"></iframe>';
            var link = configDict["link"];//"https://dev.nos-ecoles.fr/nos_ecoles.php?operation=view&pk0="; // TODO get link from a config file

            popup = popupHTML.replaceAll("{ecole_pk}",point[1].pk.toString()).replace("{link}", encodeURIComponent(link)).replace("{ecole_rne}", point[1].ecole_RNE);
            //console.log(popup);




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
    xmlhttp.open("GET", "php/acces_iframe.php", false); // False pour avoir un comportement synchrone
    xmlhttp.send(null);

    return donnees;
}
function getPopupHTML() {
    var donnees;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
        // La transaction est terminée ?
        if(xmlhttp.readyState == 4){
            // Si la transaction est un succès
            if(xmlhttp.status == 200){
                // On traite les données reçues
                donnees = xmlhttp.responseText
            }
        }
    }
    xmlhttp.open("GET", "popup.html", false); // False pour avoir un comportement synchrone
    xmlhttp.send(null);

    return donnees;
}
function getContfigTxt() {
    var donnees;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
        // La transaction est terminée ?
        if(xmlhttp.readyState == 4){
            // Si la transaction est un succès
            if(xmlhttp.status == 200){
                // On traite les données reçues
                donnees = xmlhttp.responseText
            }
        }
    }
    xmlhttp.open("GET", "config.txt", false); // False pour avoir un comportement synchrone
    xmlhttp.send(null);

    var mydict = {};
    var lines = donnees.split('\n');
    for(var i = 0;i < lines.length;i++){
    //code here using lines[i] which will give you each line
        var firstequalpos = lines[i].indexOf("=");
        mydict[lines[i].slice(0, firstequalpos)]=lines[i].slice(firstequalpos+1)
    }
    //console.log(mydict);
    return mydict;
}


function previousIframe() {
    $("#inlineFrameExample0").attr('src', window.history.back());
}