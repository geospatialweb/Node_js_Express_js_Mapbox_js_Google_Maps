var express = require('express');
var pg = require('pg.js');

var connection = 'postgres://postgres:password@localhost/table';
var select = 'select lat, lng from region';

module.exports = express.Router().get('/', function(request, response) {
	pg.connect(connection, function(error, client, release) {
		if (error) throw error;
        else {
			client.query(select, function(error, result) {
				release();

				if (error) throw error;
                else {
					var geojson = '{"type": "Feature", "properties": {}, "geometry": {"type": "Polygon", "coordinates": [[';

					for (var i = 0; i < result.rows.length; i++) {
						geojson += '[' + result.rows[i].lng + ',' + result.rows[i].lat + '],';
					}

					response.send(geojson.substr(0, geojson.length - 1) + ']]}}');
				}
			});
		}
	});
});