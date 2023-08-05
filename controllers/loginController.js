const bcrypt = require("bcrypt");
const db = require("../models/db.js");
const User = require("../models/AccountModel.js");

const loginController = {
    getLogin: function(req, res){
        res.render('login');
    },

    postLogIn: async function (req, res) {
        var username = req.body.username;
        var password = req.body.password;

        var result = await db.findOne(User, {username: username}, "");

        if(result){
            var user = {
                username: result.username,
                email: result.email,
                type: result.type
            };

            bcrypt.compare(password, result.password, function(err, equal){
                if(equal){
                    req.session.username = user.username,
                    req.session.email = user.email;
                    req.session.type = user.type;
                    console.log("session email: " + req.session.email); //remove later
                    res.redirect('/profile/' + user.username);
                }else{
                    console.log("password incorrect"); //remove later
                    var details = {error: "Username and/or Password is incorrect."};
                    res.render("login", details);
                }
            });
        } else{
            var details = {error: "Username and/or Password is incorrect."};
            res.render("login", details);
        }
    }
}

module.exports = loginController;