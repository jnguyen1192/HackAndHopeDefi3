class MapBuilder {

  constructor(mapid, searchbox) {
    this.mapid = mapid;
    this.searchbox = searchbox;

    this.markersLayer = new L.LayerGroup();
    this.map = this.create();
  }

  create() {
    let map = L.map(this.mapid).setView([43.28817965, 5.40450052], 11);//[43.32417965, 5.37450052], 14);
    var controlLoading = L.Control.loading();
    map.addControl(controlLoading); // Ajout de l'icône de chargement
    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        edgeBufferTiles: 1
    }).addTo(map); // Ajout du fond de carte

    map.addLayer(this.markersLayer); // Ajout de la couche des marqueurs

    map.addControl( new L.Control.Search({
        container: this.searchbox,
        layer: this.markersLayer,
        initial: false,
        collapsed: false
    }) ); // Ajout de la boîte de recherche

    return map;
  }
}

