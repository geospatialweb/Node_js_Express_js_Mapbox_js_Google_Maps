var express = require('express');
var fs = require('fs');
var jsdom = require('jsdom-nocontextifiy').jsdom;
var tj = require('togeojson');

exports.office = express.Router().get('/', function(request, response) {
	response.send(tj.kml(jsdom(fs.readFileSync('./public/kml/office.kml', 'utf8'))));
});

exports.placename = express.Router().get('/', function(request, response) {
    response.send(tj.kml(jsdom(fs.readFileSync('./public/kml/placename.kml', 'utf8'))));
});

exports.trail = express.Router().get('/', function(request, response) {
    response.send(tj.kml(jsdom(fs.readFileSync('./public/kml/trail.kml', 'utf8'))));
});