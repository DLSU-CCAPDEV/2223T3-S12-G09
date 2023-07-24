const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const routes = require('./routes/routes.js');
const hbs = require('hbs');
const mongodb = require('mongodb');

const client = mongodb.MongoClient;
const url = "mongodb+srv://admin:EJQYBcLmYB9ptMLB@g09-2223t3-s12.suaaeyb.mongodb.net/";

const options = {useUnifiedTopology: true};

function createDatabase(){
    client.connect(url, options, function(err, db){
        if(err) throw err;
        console.log('Database created!');
        db.close();
    });
}

const app = express();

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/', routes);

app.use(function(req, res) {
   res.send('Error 404!');
});

app.listen(port, hostname, function(req, res) {
    console.log(`Server running at: `);
    console.log(`http://` + hostname + `:` + port);
});
