var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var cors = require('cors');
var proxy = require('http-proxy-middleware');

app.use(cors());
app.use(bodyParser.json());
app.use('/restaurant/*', express.static(path.join(__dirname, '../client/dist'))); 
app.use('/reservations', proxy({target: 'http://localhost:3000', changeOrigin: true}));

app.use('/restaurants', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

app.get('/restaurants', (req, res) => {
  res.sendFile(path.join(__dirname + './client/dist'))
})


// Photos ==============================================================
app.get('/restaurants/:id', function(req, res) {
  var id = req.params.id
  res.header("X-Content-Type", "text/javascript");
  res.redirect('http://localhost:3002/restaurants/'+ id);
});


// Reservations ========================================================
app.get('/reservations/:restID/reservations', function(req, res) {
  var restID = req.params.restID
  res.header("X-Content-Type", "text/javascript");
  res.redirect('http://localhost:3010/reservations' + restID + 'reservations');
});

app.get('/reservations/:restID/bookedTimes', function(req, res) {
  var restID = req.params.restID
  res.header("X-Content-Type", "text/javascript");
  res.redirect('http://localhost:3010/reservations/' + restID + 'bookedTimes');
});


// Ratings =============================================================
app.get('/review/:id', function(req, res) {
  var id = req.params.id
  res.header("X-Content-Type", "text/javascript");
  res.redirect('http://localhost:3007/review/' + id);
});

// Details =============================================================
app.get('/restaurant/:name', function(req, res) {
  var name = req.params.name
  res.header("X-Content-Type", "text/javascript");
  res.redirect('http://localhost:3003/restaurant/' + name)
});

app.get('/API/restaurant/:name', function(req, res) {
  var name = req.params.name
  res.header("X-Content-Type", "text/javascript");
  res.redirect('http://localhost:3003/API/restaurant/' + name)
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});