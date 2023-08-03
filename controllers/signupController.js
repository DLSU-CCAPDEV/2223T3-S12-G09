const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
            var password = req.body.pw;
            var type = req.body.acc_type;

            bcrypt.hash(password, saltRounds, async function (err, hash) {
                var user = {
                    email: email,
                    password: hash
                };

                var response = await db.insertOne(User, user);

                if (response !== null)
                    res.send(response);
                else
                    res.render('error');
            });
        }
    }
};

module.exports = signupController;