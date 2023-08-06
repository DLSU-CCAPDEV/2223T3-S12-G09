const controllers = require('../controllers/controller.js');
const searchControllers = require('../controllers/searchController.js');
const labControllers = require('../controllers/labController.js');
const reserveControllers = require('../controllers/reserveController.js');
const signupController = require('../controllers/signupController.js');
const loginController = require("../controllers/loginController.js");
const accountController = require("../controllers/accountController.js");
const logoutController = require("../controllers/logoutController.js");
const deleteController = require("../controllers/deleteController.js");
const editProfileController = require("../controllers/editProfileController");

const express = require('express');
const validation = require('../helpers/validation.js');
const app = express();

app.get('/', controllers.getIndex);
app.get('/labs', labControllers.getLabs);
app.get('/about', controllers.getAbout);
app.get('/search', searchControllers.getSearch);
app.post('/search', searchControllers.listAccounts);
app.post('/listAccounts', searchControllers.listAccounts);
app.get('/checkReservation', reserveControllers.checkReservation);
app.get('/listReservations', reserveControllers.listReservations);
app.post('/makeReservation', reserveControllers.makeReservation);
app.post('/updateReservation', reserveControllers.updateReservation);
app.post('/deleteReservation', reserveControllers.deleteReservation);

app.get('/checkEmail', signupController.checkEmail);
app.get('/checkUsername', signupController.checkUsername);
app.get('/signup', signupController.getSignUp);
app.post('/signup', validation.signupValidation(), signupController.postSignUp);

app.get('/login', loginController.getLogin);
app.post('/login', loginController.postLogIn);

app.get('/getAccount', function(req, res) {
    res.send({
        username: req.session.username,
        type: req.session.type
    });
});

app.get('/profile/:username', accountController.getProfile);

app.get('/logout', logoutController.getLogOut);

app.delete('/delete',  deleteController.deleteAccount);

app.get('/edit-profile', editProfileController.getEditProfile);
app.post('/edit-profile', editProfileController.editProfile);

module.exports = app;
