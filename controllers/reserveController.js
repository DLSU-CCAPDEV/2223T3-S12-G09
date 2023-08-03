const db = require('../models/db');
const Reservation = require('../models/ReservationModel.js');

const reserveController = {
    checkReservation: async function (req, res) {
        var seat = req.query.seat_id;
        var user = req.query.user;
        var lab = req.query.lab;
        var date = req.query.date;
        var time_slot = req.query.time_slot;

        var query = {
            seat_id: seat,
            // user: user,
            lab: lab,
            // date: date,
            time_slot: time_slot
        };

        console.log(query);
        var result = await db.findOne(Reservation, query);
        res.send(result);
    },

    makeReservation: async function (req, res) {
        var seat = req.body.seat_id;
        var user = req.body.user;
        var lab = req.body.lab;
        var date = req.body.date;
        var time_slot = req.body.time_slot;

        var reservation = {
            seat_id: seat,
            user: user,
            lab: lab,
            date: date,
            time_slot: time_slot
        };

        var response = await db.insertOne(Reservation, reservation);

        if(response != null){
            res.send(response);
        }
        else {
            res.send({error: "insert fail!!"});
        }
    }
}

module.exports = reserveController
