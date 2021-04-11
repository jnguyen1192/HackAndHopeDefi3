function createLegend(map) {

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');




        div.innerHTML += '<label for="toggle" title="Cliquer pour dé/verouiller la légende"><h4>Légende</h4></label><input type="checkbox" id="toggle" class="visually-hidden">'
        div.innerHTML += '<div class="lineLegend"><img class="imgLegend" src="assets/img/child-solid.svg">' + '<span class="txtLegend">Ecole maternelle' + '</span></div>'
        div.innerHTML += '<div class="lineLegend"><img class="imgLegend" src="assets/img/cubes-solid.svg">' + '<span class="txtLegend">Ecole élémentaire' + '</span></div>'
        div.innerHTML += '<div class="lineLegend"><img class="imgLegend" src="assets/img/linode-brands.svg">' + '<span class="txtLegend">Ecole primaire' + '</span></div>'
        div.innerHTML += '<div class="lineLegend"><img class="imgLegend" src="assets/img/markerRed.png">' + '<span class="txtLegend">Défavorable' + '</span></div>'
        div.innerHTML += '<div class="lineLegend"><img class="imgLegend" src="assets/img/markerOrange.png">' + '<span class="txtLegend">Non connu' + '</span></div>'
        div.innerHTML += '<div class="lineLegend"><img class="imgLegend" src="assets/img/markerGreen.png">' + '<span class="txtLegend">Favorable</span></div>'

        return div;/*
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 10, 20, 50, 100, 200, 500, 1000],
            labels = [],
            from, to;

        for (var i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];

            labels.push(
                '<i style="background:' + getSectorColor(from + 1) + '"></i> ' +
                from + (to ? '&ndash;' + to : '+'));
        }

        div.innerHTML = labels.join('<br>');
        return div;*/
    };

    legend.addTo(map);
}