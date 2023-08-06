const db = require('../models/db.js');
const User = require('../models/AccountModel.js');
const Session = require('./sessionController.js');

const accountController = {
    getProfile: async function (req, res) {
        var query = {username: req.params.username};
        var details = Session.connectSession(req, res);
        var isCurrentUser = false;

        var result = await db.findOne(User, query);

        if(result !== null){
            details.fname = result.fname;
            details.lname = result.lname;
            details.username_url = result.username;
            details.pfpURL = result.pfpURL;
            details.description = result.description;

            if(query.username === req.session.username)
                isCurrentUser = true;

            res.render('profile', {details, isCurrentUser});
        } else
            res.redirect('/');
    }
}

module.exports = accountController;
