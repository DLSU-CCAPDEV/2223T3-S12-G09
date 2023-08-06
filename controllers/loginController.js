const bcrypt = require("bcrypt");
const db = require("../models/db.js");
const User = require("../models/AccountModel.js");

const loginController = {
    getLogin: function(req, res){
        var details = {};

        if(req.session.username){
            details.flag = true;
            details.username = req.session.username;
            res.redirect('/');
        } else{
            details.flag = false;
            res.render('login', details);
        }
    },

    postLogIn: async function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var result = await db.findOne(User, {username: username}, "");

        if(result){
            var user = {
                username: result.username,
                type: result.type
            };

            bcrypt.compare(password, result.password, function(err, equal){
                if(equal){
                    req.session.username = user.username;
                    req.session.type = user.type;
                    res.redirect('/');
                } else{
                    var details = {
                        flag: false,
                        error: "Username and/or Password is incorrect."
                    };

                    res.render("login", details);
                }
            });
        } else{
            var details = {
                flag: false,
                error: "Username and/or Password is incorrect."
            };

            res.render("login", details);
        }
    }
}

module.exports = loginController;