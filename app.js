var express = require('express');
var favicon = require('static-favicon');
var join = require('path').join;

var google = require('./routes/google');
var kml =  require('./routes/kml');
var mapbox = require('./routes/mapbox');

var app = express();
app.use(favicon(join(__dirname, 'public/images/favicon.ico')));
app.use(express.static(join(__dirname, 'public')));

app.use('/google', google);
app.use('/mapbox', mapbox);
app.use('/office', kml.office);
app.use('/placename', kml.placename);
app.use('/trail', kml.trail);

app.listen(80);