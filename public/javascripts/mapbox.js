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
        'Aerial':  L.mapbox.tileLayer('examples.map-qfyrx5r8'),
	    'Black':   L.mapbox.tileLayer('examples.map-cnkhv76j').addTo(map),
        'Streets': L.mapbox.tileLayer('examples.map-i87786ca'),
	    'Terrain': L.mapbox.tileLayer('examples.map-i875mjb7'),
	    'Warden':  L.mapbox.tileLayer('mapbox.mapbox-warden')
	}).addTo(map);

    // geocode origin & destination input, then pass respective coordinates to determine route, returned as geoJSON array
    $.ajax({
        type: 'GET',
        data: { q: 'kingston ontario', locale: 'en', debug: 'true', key: '196v82Q2c6eJ9Td7GFa9upjn8bW4LgUf6Tby1sn6' },
        url: 'http://graphhopper.com/api/1/geocode',
        success: function(data) {
            var orig = {'lat': data.hits[0].point.lat, 'lng': data.hits[0].point.lng};

            $.ajax({
                type: 'GET',
                data: { q: 'brockville ontario', locale: 'en', debug: 'true', key: '196v82Q2c6eJ9Td7GFa9upjn8bW4LgUf6Tby1sn6' },
                url: 'http://graphhopper.com/api/1/geocode',
                success: function(data) {
                    var dest = {'lat': data.hits[0].point.lat, 'lng': data.hits[0].point.lng};

                    $.ajax({
                        type: 'GET',
                        url:'http://graphhopper.com/api/1/route?point=' + orig.lat + ',' + orig.lng + '&point=' + dest.lat + ',' + dest.lng + '&vehicle=car&locale=en&key=196v82Q2c6eJ9Td7GFa9upjn8bW4LgUf6Tby1sn6&points_encoded=false&debug=true',
                        success: function(data) {
                            L.marker([ orig.lat, orig.lng ]).addTo(map);
                            L.marker([ dest.lat, dest.lng ]).addTo(map);
                            L.geoJson(data.paths[0].points, {style: { 'color': 'purple', 'weight': 4 }}).addTo(map);
                        }
                    });
                }
            });
        }
    });

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