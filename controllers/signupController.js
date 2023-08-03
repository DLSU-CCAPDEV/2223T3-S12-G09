const { validationResult } = require('express-validator');

const db = require('../models/db.js');
const User = require('../models/AccountModel.js');

const signupController = {
    checkEmail: async function(req, res){
        var email = req.query.email;
        var result = await db.findOne(User, {email: email}, 'email');
        res.send(result);
    },

    postSignUp: async function(req, res){
        var errors = validationResult(req);

        if(!errors.isEmpty()){
            errors = errors.errors;
            var details = {};

            for(i = 0; i < errors.length; i++)
                details[errors[i].path + 'Error'] = errors[i].msg;

            res.render('header', details);
        } else{
            var email = req.body.email;
            var description = "No description.";
            var password = req.body.pw;
            var pfpURL = "https://cdn.vectorstock.com/i/preview-1x/70/84/default-avatar-profile-icon-symbol-for-website-vector-46547084.jpg";
            var type = req.body.acc_type;
            var deleted = false;

            var user = {
                email: email,
                description: description,
                password: password,
                pfpURL: pfpURL,
                type: type,
                deleted: deleted
            };

            var response = await db.insertOne(User, user);

            if(response !== null)
                res.send(response);
            else
                res.render('error');
        }
    }
};

module.exports = signupController;