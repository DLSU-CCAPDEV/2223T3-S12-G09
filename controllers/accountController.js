const db = require('../models/db.js');
const User = require('../models/AccountModel.js');
const Session = require('./sessionController.js');

const accountController = {
    getProfile: async function (req, res) {
        var query = {username: req.params.username};
        // var projection = 'fname lname username description';
        var details = Session.connectSession(req, res);


        // var result = await db.findOne(User, query, projection);
        var result = await db.findOne(User, query);

        if(result !== null){
            details.fname = result.fname;
            details.lname = result.lname;
            details.username_url = result.username;
            details.description = result.description;

            res.render('profile', details);
        } else
            res.redirect('/');
    }
}

module.exports = accountController;
