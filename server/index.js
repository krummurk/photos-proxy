var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var proxy = require('http-proxy-middleware');

var app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../dist/')));
app.use(cors());
app.use(bodyParser.json());

const apiPhoto = proxy({target: 'http://localhost:3002/', changeOrigin: true});
const apiReview = proxy({target: 'http://localhost:3007/', changeOrigin: true});
const apiReservation = proxy({target: 'http://localhost:3010/', changeOrigin: true});
const apiMenu = proxy({target: 'http://localhost:3003/', changeOrigin: true});

app.use('/API/restaurant/photo', apiPhoto);
app.use('/review', apiReview);
app.use('/reservation', apiReservation);
app.use('API/menu', apiMenu);

app.get('/restaurant/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.listen(PORT, function() {
  console.log('listening on port ' + PORT + '!');
});