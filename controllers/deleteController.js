const db = require("../models/db.js");
const User = require("../models/AccountModel.js");
const reservations = require("../models/ReservationModel.js");

const deleteController = {
    deleteAccount: async function (req, res){
        var username = req.session.username;
        var result = await db.findOne(User, {username: username}, "");

        if(result){
            var user = {
                email: result.email
            }
        }

        var check = await db.findOne(reservations, {user: user.email}, "");

        if (check) {
            var isDeletedRes = await db.deleteMany(reservations, {user: user.email});
            if(isDeletedRes){
                console.log("Account resrevations deleted");
                var isDeletedAcc = await db.deleteOne(User, {email: user.email});

                if(isDeletedAcc){
                    console.log("Account deleted");
                    req.session.destroy(function(err){
                        if(err) throw err;
                        res.redirect('/');
                    });
                }
                else {
                    console.log("Error deleting account.");
                }
            }
            else{
                console.log("Error deleting account reservations.");
            }
        }
        else {
            var isDeletedAcc = await db.deleteOne(User, {email: user.email});
            if(isDeletedAcc){
                console.log("Account deleted");
                req.session.destroy(function(err){
                    if(err) throw err; 
                    res.redirect('/');
                });
            }
            else{
                console.log("Error deleting account.");
            }
        }   
    }
}

module.exports = deleteController;
