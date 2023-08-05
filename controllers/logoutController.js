const db = require('../models/db.js');
const User = require('../models/AccountModel.js');

const logoutController = {
    getLogOut: function(req, res){
        req.session.destroy(function(err){
            if(err) throw err;

            res.redirect('/');
        });
    }
}

module.exports = logoutController;