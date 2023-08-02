const controllers = require('../controllers/controller.js');
const labControllers = require('../controllers/labController.js');
const reserveControllers= require('../controllers/reserveController.js');
const signupControllers = require('../controllers/signupController.js');

const express = require('express');
const validation = require('../helpers/validation.js');
const app = express();

app.get('/', controllers.getIndex);
app.get('/labs', labControllers.getLabs);

app.get('/checkReservation', reserveControllers.checkReservation);
app.post('/makeReservation', reserveControllers.makeReservation);
app.delete('/deleteReservation', reserveControllers.deleteReservation);

app.get('/checkEmail', signupControllers.checkEmail);
app.post('/signup', validation.signupValidation, signupControllers.postSignUp);

module.exports = app;
