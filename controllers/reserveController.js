const db = require('../models/db');
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
        var seat = req.params.seat_id;
        var email = req.params.email;
        var date = req.params.date;
        var time_slot = req.params.time_slot;
        var lab = req.params.lab;

        var reservation = {
            seat_id: seat,
            user: {},
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
