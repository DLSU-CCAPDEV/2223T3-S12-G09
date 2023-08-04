const controllers = require('../controllers/controller');
const labControllers = require('../controllers/labController');
const reserveControllers = require('../controllers/reserveController');
const accountControllers = require('../controllers/accountController');

const express = require('express');
const app = express();

app.get('/', controllers.getIndex);
app.get('/labs', labControllers.getLabs);

app.get('/checkReservation', reserveControllers.checkReservation);
app.get('/listReservations', reserveControllers.listReservations);
app.get('/getAccount', accountControllers.getAccount);
app.post('/makeReservation', reserveControllers.makeReservation);

module.exports = app;
