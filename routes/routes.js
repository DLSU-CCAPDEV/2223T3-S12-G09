const controllers = require('../controllers/controller.js');
const labControllers = require('../controllers/labController.js');
const reserveControllers = require('../controllers/reserveController.js');
const signupController = require('../controllers/signupController.js');
const loginController = require("../controllers/loginController.js");
const accountController = require("../controllers/accountController.js");
const logoutController = require("../controllers/logoutController.js");
const deleteController = require("../controllers/deleteController.js");

const express = require('express');
const validation = require('../helpers/validation.js');
const app = express();

app.get('/', controllers.getIndex);
app.get('/labs', labControllers.getLabs);
app.get('/about', controllers.getAbout);
app.get('/checkReservation', reserveControllers.checkReservation);
app.get('/listReservations', reserveControllers.listReservations);
app.post('/makeReservation', reserveControllers.makeReservation);
app.delete('/deleteReservation', reserveControllers.deleteReservation);

app.get('/checkEmail', signupController.checkEmail);
app.get('/checkUsername', signupController.checkUsername);
app.get('/signup', signupController.getSignUp);
app.post('/signup', validation.signupValidation(), signupController.postSignUp);

app.get('/login', loginController.getLogin);
app.post('/login', loginController.postLogIn);

app.get('/getAccount', function(req, res) {
    res.send(req.session.username);
});

app.get('/profile/:username', accountController.getProfile);

app.get('/logout', logoutController.getLogOut);

app.delete('/delete',  deleteController.deleteAccount);//++

module.exports = app;
