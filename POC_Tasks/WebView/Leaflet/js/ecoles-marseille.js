function processJsonData(jsonData) {
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
        //console.log(obj);
        var tabs = '<div class="tabs">';
/*
            '<div class="tab" id="tab-1">' +
            '<div class="content">' +
            '<b>'+ Object.keys(obj.data) +'</b>' +
            '</div>' +
            '</div>' +

            '<div class="tab" id="tab-2">' +
            '<div class="content">' +
            '<b>Tab 2 content</b>' +
            '</div>' +
            '</div>' +

            '<div class="tab" id="tab-3">' +
            '<div class="content">' +
            '<b>Tab 3 content</b>' +
            '</div>' +
            '</div>';*/
        var ul = '<ul class="tabs-link">';
        var num_tab = 1;
        var num_link_content;
        var link_content;
        console.log(obj.data[Object.keys(obj.data)[num_tab-1]]);
        for(var tab_title_index in Object.keys(obj.data)) {
            tabs += '<div class="tab" id="tab-' + num_tab.toString() + '">' +
                '<div class="content">';
            link_content = "";
            num_link_content = 1;
            for(var link_content_index in Object.keys(obj.data[Object.keys(obj.data)[num_tab-1]])) {
                link_content +=    '<p>'+ Object.keys(obj.data[Object.keys(obj.data)[num_tab-1]])[num_link_content-1] + ':'  + obj.data[Object.keys(obj.data)[num_tab-1]][Object.keys(obj.data[Object.keys(obj.data)[num_tab-1]])[num_link_content-1]] + '</p>'; // TODO add content
                num_link_content += 1;
            }
            tabs += link_content + '</div>' +
                '</div>';
            ul += '<li class="tab-link"> <a href="#tab-'+ num_tab.toString() + '"><span>'+ Object.keys(obj.data)[tab_title_index] + '</span></a></li>';
            num_tab += 1;
        }
        var popup = tabs;
        ul += '</ul>';
        popup +=  ul + '</div>';
        /*var popupTemplatePanel = Handlebars.compile(document.getElementById('template-popup').innerHTML);
        // console.log(popupTemplateVertical);
        var popupContent = popupTemplatePanel(obj);*/
        var marker = L.marker(new L.latLng([obj.location.lat, obj.location.lng]), config)
            .bindTooltip(point[1].ecole_appellation)
            .bindPopup(popup);
            /*.bindPopup(popupContent, {
                minWidth:450,
                keepInView: true,
                data: obj
            });*/
        markersLayer.addLayer(marker);

    });

/*
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
    });*/
}