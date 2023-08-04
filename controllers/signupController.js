const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../models/db.js');
const User = require('../models/AccountModel.js');

const signupController = {
    getSignUp: function(req, res){
        res.render('signup');
    },

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

            console.log(details);

            res.render('signup', details);
        } else{
            var email = req.body.email;
            var password = req.body.password;

            bcrypt.hash(password, saltRounds, async function (err, hash) {
                var user = {
                    email: email,
                    password: hash
                }

                var response = db.insertOne(User, user);

                if (response !== null)
                    res.redirect('/login');
                else
                    res.render('error');
            });
        }
    }
};

module.exports = signupController;