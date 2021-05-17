class MapBuilder {

  constructor(mapid, searchbox) {
    this.mapid = mapid;
    this.searchbox = searchbox;

    this.markersLayer = new L.LayerGroup();
    this.map = this.create();
  }

  create() {
    // chargement du cookie s'il existe
    let map_location = [43.28817965, 5.40450052]; // default map location
    let map_zoom = 11; // default zoom
    if(getCookie("location") != "") {
        //console.log(getCookie("location").split(",").map(Number));
        map_location = getCookie("location").split(",").map(Number); // default map location using cookie
        map_zoom = 18; // default zoom using cookie
    }
    let map = L.map(this.mapid).setView(map_location, map_zoom); // initialisation de la carte
    var controlLoading = L.Control.loading(); // Récupération de l'icône de chargement
    map.addControl(controlLoading); // Ajout de l'icône de chargement
    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', // Lien en bas à droite de la carte
        edgeBufferTiles: 1 // Buffer du nombre de tuile autour de l'affichage courant de la carte
    }).addTo(map); // Ajout du fond de carte

    map.addLayer(this.markersLayer); // Ajout de la couche des marqueurs

    new L.Control.Search({
        //container: this.searchbox,
        layer: this.markersLayer, // Couche des marqueurs choisi pour le champ de recherche
        initial: false,
        collapsed: false,
        zoom: 14 // Zoom après avoir effectué une recherche
        //tooltipLimit:-1
    }).on('search:locationfound', function(e) { // Ouverture de la popup après la recherche
		e.layer.openPopup(); // Ouvre la popup
		let object_cookie = [e.layer._latlng.lat, e.layer._latlng.lng] // Récupère la position
		setCookie("location", object_cookie, 30);// Enregistrement de la position dans les cookie
	}).addTo(map); // Ajout de la boîte de recherche


    return map;
  }
}

