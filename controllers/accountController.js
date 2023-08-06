const db = require('../models/db.js');
const User = require('../models/AccountModel.js');
const Session = require('./sessionController.js');

const accountController = {
    getProfile: async function (req, res) {
        var query = {username: req.params.username};
        var currentUser = {username: req.session.username};
        var projection = 'fname lname username description';
        var details = Session.connectSession(req, res);
        var isCurrentUser = false;

        // if (req.session.username) {
        //     details.flag = true;
        //     details.username = true;
        // } else
        //     details.flag = false;

        var result = await db.findOne(User, query, projection);

        if(result !== null){
            details.fname = result.fname;
            details.lname = result.lname;
            details.username_url = result.username;
            details.description = result.description;

            if(query.username === req.session.username)
                isCurrentUser = true;

            res.render('profile', {details, isCurrentUser});
        } else
            res.redirect('/');
    }
}

module.exports = accountController;
