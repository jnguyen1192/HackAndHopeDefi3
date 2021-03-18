function processJsonData(jsonData) {
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
}