const db = require("../models/db.js");
const User = require("../models/AccountModel.js");
const Session = require('./sessionController.js');

const editProfileController = {
    getEditProfile: function(req, res){
        Session.connectSession(req, res,
            function(details) {
                res.render('edit-profile', details);
            },
            function(details) {
                res.redirect('/login');
        });
    },

    editProfile: async function (req, res) {
        var pfpURL = req.body.pfpURL;
        var description = req.body.description;

        if(pfpURL !== null)
            pfpURL = 'https://d2w9rnfcy7mm78.cloudfront.net/8040974/original_ff4f1f43d7b72cc31d2eb5b0827ff1ac.png?1595022778?bc=0';

        if(description !== null)
            description = 'No bio.';

        var result = await db.updateOne(User, {username: req.session.username}, {pfpURL: pfpURL, description: description});

        if(result !== null)
            res.redirect('/profile/' + req.session.username)
        else
            res.render('error');
    }
}

module.exports = editProfileController;