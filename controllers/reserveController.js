const db = require('../models/db');

const reserveController = {
    checkReservation: function (req, res) {
         // gets the parameter `username` from the URL
        // const sendJSON = {
        //     seat: seat.seat_id,
        //     email: currUser,
        //     date: date,
        //     time_slot: time_slot,
        //     lab: selected_lab
        // };
        var seat = req.params.seat;
        var email = req.params.email;
        var date = req.params.date;
        var time_slot = req.params.time_slot;
        var lab = req.params.lab;

        /*
            creates an object `query`
            which assigns the value of the variable `u` to field `username`
        */
        var query = {
            seat: seat.seat_id,
            email: currUser,
            date: date,
            time_slot: time_slot,
            lab: selected_lab
        };

        /*
            calls the function findOne()
            defined in the `database` object in `../models/db.js`
            this function searches the collection `profiles`
            based on the value set in object `query`
            the third parameter is a callback function
            this called when the database returns a value
            saved in variable `result`
        */
        db.findOne('reservation', query, function (result) {
            res.send(result);
        });
    }
}

module.exports = reserveController
