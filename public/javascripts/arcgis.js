var map;
var office;
var placeName;
var region;
var trail;

function load_arcgis(div) {
    require([ 'esri/map',
        'esri/geometry/Polygon',
        'esri/graphic',
        'esri/layers/GraphicsLayer',
        'esri/layers/KMLLayer',
        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/Color'
        ], function(Map, Polygon, Graphic, GraphicsLayer, KMLLayer, SimpleFillSymbol, SimpleLineSymbol, Color) {
        map = new Map('mapContainer', {
        basemap: "topo",
        center: [ -76.280833, 44.495222],
        logo: false,
        zoom: 9
        });

        $.get('/google').done(function(data) {
            region = new GraphicsLayer();
            region.visible = false;
            map.addLayer(region);

            var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                new Color([ 255,0,0 ]), 2), new Color([ 255,255,0,0.25 ])
            );

            var points = [];

            for (var i = 0; i < data.length; i++) {
                points.push([ data[i].lng, data[i].lat ]);
            }

            region.add(new Graphic(new Polygon(points), symbol));
        });

        office = new KMLLayer('http://geospatialweb.ca:8000/GoogleMaps/kml/office.kml');
        office.visible = false;
        map.addLayer(office);

        placeName = new KMLLayer('http://geospatialweb.ca:8000/GoogleMaps/kml/placename.kml');
        placeName.visible = false;
        map.addLayer(placeName);

        trail = new KMLLayer('http://geospatialweb.ca:8000/GoogleMaps/kml/trail.kml');
        map.addLayer(trail);
    });
}

function displayTrail(n) {
	switch (n) {
		case 1:
			map.centerAndZoom([ -76.038974, 44.512528 ], 13);
			break;

		case 2:
            map.centerAndZoom([ -76.038974, 44.512528 ], 13);
			break;

		case 3:
            map.centerAndZoom([ -76.605531, 44.226044 ], 14);
			break;

		case 4:
            map.centerAndZoom([ -75.753434, 44.580219 ], 12);
			break;

		case 5:
            map.centerAndZoom([ -75.753434, 44.580219 ], 12);
			break;

		case 6:
            map.centerAndZoom([ -76.213444, 44.485748 ], 14);
	}
}