const db = require('../models/db.js');
const User = require('../models/AccountModel.js');
const Session = require('./sessionController.js');

const accountController = {
    getProfile: async function (req, res) {
        var query = {username: req.params.username};
        var projection = 'fname lname username description';
        var details = Session.connectSession(req, res);

        // if (req.session.username) {
        //     details.flag = true;
        //     details.username = true;
        // } else
        //     details.flag = false;

        var result = await db.findOne(User, query, projection);

        if(result !== null){
            details.fname = result.fname;
            details.lname = result.lname;
            details.username = result.username;
            details.description = result.description;

            res.render('profile', details);
        } else
            res.redirect('/');
    }
}

module.exports = accountController;
