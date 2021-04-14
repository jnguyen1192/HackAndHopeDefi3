class MapBuilder {

  constructor(mapid, searchbox) {
    this.mapid = mapid;
    this.searchbox = searchbox;

    this.markersLayer = new L.LayerGroup();
    this.map = this.create();
  }

  create() {
    // chargement du cookie s'il existe
    let map_location = [43.28817965, 5.40450052];
    let map_zoom = 11;
    if(getCookie("location") != "") {
        //console.log(getCookie("location").split(",").map(Number));
        map_location = getCookie("location").split(",").map(Number);
        map_zoom = 18;
    }
    let map = L.map(this.mapid).setView(map_location, map_zoom);//[43.32417965, 5.37450052], 14);
    var controlLoading = L.Control.loading();
    map.addControl(controlLoading); // Ajout de l'icône de chargement
    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        edgeBufferTiles: 1
    }).addTo(map); // Ajout du fond de carte

    map.addLayer(this.markersLayer); // Ajout de la couche des marqueurs

    new L.Control.Search({
        //container: this.searchbox,
        layer: this.markersLayer,
        initial: false,
        collapsed: false,
        zoom: 14
        //tooltipLimit:-1
    }).on('search:locationfound', function(e) { // Ouverture de la popup après la recherche
		e.layer.openPopup();
		let object_cookie = [e.layer._latlng.lat, e.layer._latlng.lng] // e.layer; //
		setCookie("location", object_cookie, 30);// enregistrement de la position dans les cookie
	}).addTo(map); // Ajout de la boîte de recherche

    return map;
  }
}

