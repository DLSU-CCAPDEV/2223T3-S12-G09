const bcrypt = require("bcrypt");
const db = require("../models/db.js");
const User = require("../models/AccountModel.js");

const loginController = {
    getLogin: function(req, res){
        res.render('login');
    },

    postLogIn: async function (req, res) {
        var email = req.body.email;
        var password = req.body.password;

        var result = await db.findOne(User, {email: email}, "");

        if(result){
            var user = {
                email: result.email
            };

            bcrypt.compare(password, result.password, function(err, equal){
                if(equal)
                    res.redirect('/profile/' + user.email);
                else{
                    var details = {error: "Email and/or Password is incorrect."};
                    res.render("login", details);
                }
            });
        } else{
            var details = {error: "Email and/or Password is incorrect."};
            res.render("login", details);
        }
    }
}

module.exports = loginController;