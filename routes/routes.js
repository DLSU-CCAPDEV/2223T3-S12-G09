const controllers = require('../controllers/controller');
const labControllers = require('../controllers/labController');
const reserveControllers= require('../controllers/reserveController');
const signupControllers = require('../controllers/signupController');

const express = require('express');
const app = express();

app.get('/', controllers.getIndex);
app.get('/labs', labControllers.getLabs);

app.get('/checkReservation', reserveControllers.checkReservation);
app.post('/makeReservation', reserveControllers.makeReservation);
app.delete('/deleteReservation', reserveControllers.deleteReservation);

app.get('/checkEmail', signupControllers.checkEmail);

module.exports = app;
