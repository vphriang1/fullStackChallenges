require('dotenv').config();

var express = require('express');
var mongoose = require('mongoose');
var app = express();
var shortid = require('shortid');
var bodyParser = require('body-parser');
var dns = require('dns');
var validUrl = require('valid-url');

var port = process.env.PORT || 3000;

console.log('proc. env . MongoURI: ' + process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('error', () => console.log('connection error'));

var MyModel = mongoose.model(
  'url',
  new mongoose.Schema({ original_url: String, short_url: String })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/shorturl/new', function(req, res) {
  if (validUrl.isUri(req.body.url)) {
    var hostName = req.body.url.match(/www.*.../);
    dns.lookup(hostName.toString(), function(err, address, family) {
      if (err) {
        console.log('err from dns.lookup\n\n');
        res.json({ error: 'error from dns.lookup' });
      } else {
        var findOne = function(done) {
          console.log('search in the database');
          MyModel.findOne({ original_url: hostName.toString() }, function(
            err,
            data
          ) {
            if (err) {
              console.error(err);
            } else if (data == null) {
              var shortUrl = function(done) {
                var entry = new MyModel({
                  original_url: hostName.toString(),
                  short_url: shortid.generate()
                });
                entry.save(function(err, data) {
                  if (err) return console.error(err);
                  done(null, data);
                  console.log('saved to data base\n\n');
                  res.json({
                    original_url: hostName.toString(),
                    shortened_url: data.short_url
                  });
                });
              };
              shortUrl(function(err, data) {});
            } else {
              done(null, data);
              res.json({
                original_url: data.original_url,
                short_url: data.short_url
              });
            }
          });
        };
        findOne(function(err, data) {
          console.log('findOne init\n\n');
        });
      }
    });
  } else {
    res.json({ error: 'invalid url format' });
  }
});

app.get('/api/shorturl/:short', function(req, res) {
  MyModel.findOne({ short_url: req.params.short }, function(err, data, next) {
    if (err) return err;
    if (data !== null) res.redirect('https://' + data.original_url);
    else {
      res.json({ error: 'not found' });
    }
  });
});

app.listen(port, function() {
  console.log('\n\nlistening on port: ' + port);
});
