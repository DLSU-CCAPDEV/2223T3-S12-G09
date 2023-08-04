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

app.get('/checkReservation', reserveController.checkReservation);
app.post('/makeReservation', reserveController.makeReservation);
app.delete('/deleteReservation', reserveController.deleteReservation);

app.get('/checkEmail', signupController.checkEmail);
//app.post('/signup', validation.signupValidation(), signupController.postSignUp);
app.post('/signup', signupController.postSignUp);

app.get('/success', successController.getSuccess);

app.post('/login', loginController.postLogIn);

module.exports = app;
