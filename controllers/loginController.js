const bcrypt = require("bcrypt");
const db = require("../models/db.js");
const User = require("../models/AccountModel.js");

const loginController = { 
    
    postLogIn: async function (req, res) {
        var email = req.body.email;
        var password = req.body.password;

        //console.log(email);
        //console.log(password);

        var result = await db.findOne(User, {email: email}, "");

        console.log("db.findOne result: " + result);
 
        if(result){
            var user = {
                email: result.email,
                description: result.description,
                pfpURL: result.pfpURL,
                type: result.type
            };
            bcrypt.compare(password, result.password, function(err, equal){
                if(equal){
                    req.session.email = user.email;
                    req.session.description = user.description;
                    req.session.pfpURL = user.pfpURL;
                    req.session.type = user.type;
                    console.log("session email: " + req.session.email); //remove later
                    res.send(result);
                }else{
                    console.log("password incorrect"); //remove later
                    var details = {error: "Email and/or Password is incorrect."};
                    res.send(details);
                }
            });
        } else{
            var details = {error: "Email and/or Password is incorrect."};
            res.send(details);
        }
    }
}

module.exports = loginController;