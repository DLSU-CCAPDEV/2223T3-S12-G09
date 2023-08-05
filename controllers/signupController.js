const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../models/db.js');
const User = require('../models/AccountModel.js');

const signupController = {
    getSignUp: function(req, res){
        var details = {}

        if(req.session.username){
            details.flag = true;
            details.username = req.session.username;
            res.redirect('/');
        } else {
            details.flag = false;
            res.render('signup', details);
        }
    },

    checkUsername: async function(req, res){
        var username = req.query.username;
        var result = await db.findOne(User, {username: username}, 'username');
        res.send(result);
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
            var fname = req.body.fname;
            var lname = req.body.lname;
            var username = req.body.username;
            var email = req.body.email;
            var password = req.body.password;

            bcrypt.hash(password, saltRounds, async function (err, hash) {
                var user = {
                    fname: fname,
                    lname: lname,
                    username: username,
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