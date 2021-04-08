class MapBuilder {

  constructor(mapid, searchbox) {
    this.mapid = mapid;
    this.searchbox = searchbox;
    this.markersLayer = new L.LayerGroup();
  }

  create() {
    let map = L.map(this.mapid).setView([43.28817965, 5.40450052], 11);//[43.32417965, 5.37450052], 14);
    var controlLoading = L.Control.loading();
    map.addControl(controlLoading);
    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        edgeBufferTiles: 1
    }).addTo(map);

    map.addLayer(this.markersLayer);

    map.addControl( new L.Control.Search({
        container: this.searchbox,
        layer: this.markersLayer,
        initial: false,
        collapsed: false
    }) );
    return map;
  }
}

