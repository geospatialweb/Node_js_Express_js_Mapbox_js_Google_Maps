var map;
var office;
var placeName;
var region;
var trail;

function load_google(div) {
	map = new google.maps.Map(document.getElementById(div), {
        center: new google.maps.LatLng(44.570222, -76.280833),
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.TERRAIN
	});

    $.get('/google').done(function(data) {
        var points = [];

        for (var i = 0; i < data.length; i++) {
            points.push(new google.maps.LatLng(data[i].lat, data[i].lng));
        }

        region = new google.maps.Polygon({
            paths: points,
            strokeColor: "#000000",
            strokeWeight: 2,
            strokeOpacity: 0.5,
            fillColor: "#FFFFFF",
            fillOpacity: 0.3
        });
    });

	office = new google.maps.KmlLayer({
	  url: 'http://geospatialweb.ca/GoogleMaps/kml/office.kml'
	});

	placeName = new google.maps.KmlLayer({
	  url: 'http://geospatialweb.ca/GoogleMaps/kml/placenames.kml'
	});

	trail = new google.maps.KmlLayer({
	  url: 'http://geospatialweb.ca/GoogleMaps/kml/trails.kml'
	});

    trail.setMap(map);
}

function displayTrail(n) {
    switch (n) {
        case 1:
            map.setCenter(new google.maps.LatLng(44.512528, -76.038974));
            map.setZoom(13);
            break;

        case 2:
            map.setCenter(new google.maps.LatLng(44.512528, -76.038974));
            map.setZoom(13);
            break;

        case 3:
            map.setCenter(new google.maps.LatLng(44.226044, -76.605531));
            map.setZoom(14);
            break;

        case 4:
            map.setCenter(new google.maps.LatLng(44.580219, -75.753434));
            map.setZoom(12);
            break;

        case 5:
            map.setCenter(new google.maps.LatLng(44.580219, -75.753434));
            map.setZoom(12);
            break;

        case 6:
            map.setCenter(new google.maps.LatLng(44.485748, -76.213444));
            map.setZoom(14);
    }
}

function displayLayer(layer, state) {
    switch (layer) {
        case 'regionLayer':
            if (state.checked) region.setMap(map);
            else region.setMap(null);
            break;

        case 'officeLayer':
            if (state.checked) office.setMap(map);
            else office.setMap(null);
            break;

        case 'placeNameLayer':
            if (state.checked) placeName.setMap(map);
            else placeName.setMap(null);
            break;

        case 'trailLayer':
            if (state.checked) trail.setMap(map);
            else trail.setMap(null);
    }
}