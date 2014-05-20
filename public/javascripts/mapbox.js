var map;
var office;
var placeName;
var region;
var trail;

function load_mapBox(div) {
	map = L.mapbox.map(div, null, { doubleClickZoom: false })
    .setView([ 44.495222, -76.280833 ], 9)

	.on('mousemove', function(event) {
		document.getElementById('latlng').innerHTML = event.latlng.toString();
	})

	.on('dblclick', function(event) {
		map.setView(event.latlng, map.getZoom() + 2);
	});

	L.control.layers({
		'Black':   L.mapbox.tileLayer('examples.map-cnkhv76j').addTo(map),
		'Streets': L.mapbox.tileLayer('examples.map-vyofok3q'),
		'Terrain': L.mapbox.tileLayer('examples.map-9ijuk24y'),
		'Warden':  L.mapbox.tileLayer('mapbox.mapbox-warden')
	}).addTo(map);

    $.get('/mapbox').done(function(data) {
        region = L.geoJson($.parseJSON(data), {
            style: { 'color': '#000000', 'weight': 1.5, 'opacity': 0.5, 'fillColor': '#ffffff', 'fillOpacity': 0.4 }
        })

        .on('dblclick', function(event) {
            map.setView(event.latlng, map.getZoom() + 2);
        });
    });

	$.get('/office').done(function(data) {
		office = L.geoJson(data, {
			pointToLayer: function(feature, latlng) {
				return  L.marker(latlng, { icon: L.icon({
				        iconUrl: '/images/office.png',
						iconAnchor: [ 10, 15 ],
						popupAnchor: [ 1, 0 ]
					})
				});
			},

			onEachFeature: function(feature, layer) {
				if (feature.properties.name && feature.properties.description)
					layer.bindPopup('<b>' + feature.properties.name + '</b><br>' + feature.properties.description);
			}
		});
	});

	$.get('/placename').done(function(data) {
		placeName = L.geoJson(data, {
			pointToLayer: function(feature, latlng) {
				return  L.marker(latlng, { icon: L.icon({
						iconUrl: '/images/placename.png',
						iconAnchor: [ 10, 15 ],
						popupAnchor: [ 1, 0 ]
					})
				});
			},

			onEachFeature: function(feature, layer) {
				if (feature.properties.name && feature.properties.description)
					layer.bindPopup('<b>' + feature.properties.name + '</b><br>' + feature.properties.description);
			}
		});
	});

	$.get('/trail').done(function(data) {
		trail = L.geoJson(data, {
			style: { 'color': '#aa0000', 'weight': 3, 'opacity': 1 },

			pointToLayer: function(feature, latlng) {
				return  L.marker(latlng, { icon: L.icon({
						iconUrl: '/images/trail.png',
						iconAnchor: [ 10, 20 ],
						popupAnchor: [ 1, -5 ]
					})
				});
			},

			onEachFeature: function(feature, layer) {
				if (feature.properties.name && feature.properties.description)
					layer.bindPopup('<b>' + feature.properties.name + '</b><br>' + feature.properties.description);
			}
		}).addTo(map);
	});
}

function displayTrail(n) {
	switch (n) {
		case 1:
			map.setView([ 44.512528, -76.038974 ], 13);
			break;

		case 2:
			map.setView([ 44.512528, -76.038974 ], 13);
			break;

		case 3:
			map.setView([ 44.226044, -76.605531 ], 14);
			break;

		case 4:
			map.setView([ 44.580219, -75.753434 ], 12);
			break;

		case 5:
			map.setView([ 44.580219, -75.753434 ], 12);
			break;

		case 6:
			map.setView([ 44.485748, -76.213444 ], 14);
	}
}