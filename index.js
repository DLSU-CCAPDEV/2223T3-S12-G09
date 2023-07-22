const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')

const routes = require('./routes/routes');

const app = express();

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/', routes);

app.use(function(req, res) {
   res.send('Error 404!');
});

app.listen(port, hostname, function(req, res) {
    console.log('Server running at:');
    console.log('http://' + hostname + ':' + port);
});
