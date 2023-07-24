const controllers = require('../controllers/controller');
const labControllers = require('../controllers/labController');
const reserveControllers= require('../controllers/reserveController');

const express = require('express');
const app = express();

app.get('/', controllers.getIndex);
app.get('/labs', labControllers.getLabs);

app.get('/checkReservation', reserveControllers.checkReservation);
app.post('/makeReservation', reserveControllers.makeReservation);

module.exports = app;
