const controllers = require('../controllers/controller.js');
const labControllers = require('../controllers/labController.js');
const reserveController= require('../controllers/reserveController.js');
const signupController = require('../controllers/signupController.js');
const successController = require('../controllers/successController.js');
const loginController = require("../controllers/loginController.js");

const express = require('express');
const validation = require('../helpers/validation.js');
const app = express();

app.get('/', controllers.getIndex);
app.get('/labs', labControllers.getLabs);
app.get('/checkReservation', reserveControllers.checkReservation);
app.get('/listReservations', reserveControllers.listReservations);', accountControllers.getAccount);
app.post('/makeReservation', reserveControllers.makeReservation);
app.delete('/deleteReservation', reserveControllers.deleteReservation);

app.get('/checkEmail', signupController.checkEmail);
app.get('/signup', signupController.getSignUp);
app.post('/signup', validation.signupValidation(), signupController.postSignUp);
//app.post('/signup', signupController.postSignUp);

app.get('/success', successController.getSuccess);

app.post('/login', loginController.postLogIn);

module.exports = app;
