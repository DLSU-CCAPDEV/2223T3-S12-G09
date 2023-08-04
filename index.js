const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const routes = require('./routes/routes.js');
const hbs = require('hbs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
//const mongoose = require('mongoose');

const db = require('./models/db.js');

const app = express();

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

//app.use(function(req, res) { //maybe move this below the logged in part
   //res.send('Error 404!');
//});

db.connect(); 
 
app.use(session({
    secret: 'website-session', //secret key
    resave: false,
    saveUninitialized: false,
    //store: new MongoStore({mongooseConnection: mongoose.connection})
    store: MongoStore.create({mongoUrl: 'mongodb+srv://admin:EJQYBcLmYB9ptMLB@g09-2223t3-s12.suaaeyb.mongodb.net/labDB?retryWrites=true&w=majority'})
}));

app.use('/', routes);


app.use(async function (req, res, next){
    var details = {};

    if(req.session.email){
        //this part will display the logout, delete user modal if
        //user is logged-in
        details.flag = true;
        details.email = req.session.email;
        console.log("user logged in");
    }else{
        details.flag = false;
        console.log("user not logged in");
        //res.send('Error 404!');
    }
    next();
});


app.listen(port, hostname, function(req, res) {
    console.log(`Server running at: `);
    console.log(`http://` + hostname + `:` + port);
});
