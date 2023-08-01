const db = require('../models/db.js');
const Reservation = require('../models/ReservationModel.js');

const reserveController = {
    checkReservation: async function (req, res) {
        var seat = req.params.seat_id;
        var email = req.params.email;
        var date = req.params.date;
        var time_slot = req.params.time_slot;
        var lab = req.params.lab;

        var query = {
            seat: seat,
            email: email,
            date: date,
            time_slot: time_slot,
            lab: lab
        };

        var result = await db.findOne(Reservation, query, 'idNum');
        res.send(result);
    },

    makeReservation: async function (req, res) {
        var seat = parseInt(req.body.seat_id);
        var email = req.body.user;
        var date = req.body.date;
        var time_slot = req.body.time_slot;
        var lab = req.body.lab;

        console.log(req.body);

        var reservation = {
            seat_id: seat,
            user: email,
            lab: lab,
            date: date,
            time_slot: time_slot
        };
        console.log("Reservation: ", reservation);

        var response = await db.insertOne(Reservation, reservation);

        if(response != null){
            res.send("db.insertOne response: " + response);
        }
        else {
            res.send({error: "insert fail!!"});
        }
    }
}

module.exports = reserveController
