const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes/routes.js');
const hbs = require('hbs');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const db = require('./models/db.js');

const app = express();
const port = 9090;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'));



//app.use(function(req, res) {
   //res.send('Error 404!');
//});

db.connect();

app.use(
    session({
        secret: 'website-session', //secret key
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://admin:EJQYBcLmYB9ptMLB@g09-2223t3-s12.suaaeyb.mongodb.net/labDB?retryWrites=true&w=majority'
        }),
        cookie: {
            maxAge: 3 * 7 * 24 * 60 * 60 * 1000 // 3 weeks in milliseconds
        }
    })
);

app.use('/', routes);

app.use(
    async function (req, res, next){
        var details = {};

        if(req.session.username){
            //user is logged-in
            details.flag = true;
            details.username = req.session.username;
        }else
            details.flag = false;

        next();
    }
);

app.listen(port, function(req, res) {
    console.log(`Server running at: `);
    console.log('app listening at port ' + port);
});
