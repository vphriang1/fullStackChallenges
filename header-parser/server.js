var parseHeader = require('./parseHeader.js');

var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/whoami', function(req, res) {
  res.send(parseHeader(req));
});

var listener = app.listen(8080 || process.env.PORT, function() {
  console.log('Your app is listening on port: ' + listener.address().port);
});
