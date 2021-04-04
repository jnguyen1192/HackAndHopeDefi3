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

xmlhttp.open("GET", "../php/acces.php");

xmlhttp.send(null);