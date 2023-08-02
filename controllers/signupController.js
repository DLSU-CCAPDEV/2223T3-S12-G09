const db = require('../models/db.js');
const User = require('../models/AccountModel.js');

const signupController = {
    checkEmail: async function(req, res){
        var email = req.query.email;
        var result = await db.findOne(User, {email: email}, 'email');
        res.send(result);
    }
};

module.exports = signupController;