var express = require('express');
var pg = require('pg.js');

var connection = 'postgres://postgres:password@localhost/db';
var select = 'select lat, lng from region';

module.exports = express.Router().get('/', function(request, response) {
    pg.connect(connection, function(error, client, release) {
        if (error) throw error;
        else {
            client.query(select, function(error, result) {
                release();

                if (error) throw error;
                else response.send(result.rows);
            });
        }
    });
});