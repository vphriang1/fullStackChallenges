var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// your first API endpoint...
app.get('/api/timestamp/:date_string?', function(req, res) {
  if (!req.params.date_string) {
    var date = new Date();
    res.json({ unix: Date.parse(date), utc: date.toUTCString() });
  } else {
    var parsed;
    // check if it has all numbers
    if (/\d{10,}/.test(req.params.date_string)) {
      console.log('it has all digits');
      console.log(req.params.date_string);
      parsed = new Date(parseInt(req.params.date_string));
    } else {
      console.log('its not all digits');
      parsed = new Date(req.params.date_string);
    }
    if (!isNaN(parsed.getTime())) {
      res.json({ unix: parsed.getTime(), utc: parsed.toUTCString() });
    } else {
      res.json({ error: 'invalid date' });
    }
  }
});

var listener = app.listen(process.env.PORT, function() {
  console.log('App listening on port: ' + listener.address().port);
});
