const db = require('../models/db.js');
const User = require('../models/AccountModel.js');

const accountController = {
    getProfile: async function (req, res) {
        var query = {username: req.params.username};
        var projection = 'fname lname username description';
        var details = {};

        if (req.session.username) {
            details.flag = true;
            details.username = true;
        } else
            details.flag = false;

        var result = await db.findOne(User, query, projection);

        if(result !== null){
            details.fname = result.fname;
            details.lname = result.lname;
            details.username = result.username;
            details.description = result.description;

            res.render('profile', details);
        } else
            res.render('error', details);
    }
}

module.exports = accountController;
