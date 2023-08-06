const db = require('../models/db.js');
const Reservation = require('../models/ReservationModel.js');

const reserveController = {
    checkReservation: async function (req, res) {
        var result = await db.findOne(Reservation, req.query);
        // console.log(result);
        res.send(result);
    },

    listReservations: async function (req, res) {
        // console.log(req);
        var result = await db.findMany(Reservation, req.query);
        // console.log("listReservations(): ");
        // console.log(req.query);
        // console.log(result);
        res.send(result);
    },

    makeReservation: async function (req, res) {
        var seat = req.body.seat_id;
        var user = req.body.user;
        var lab = req.body.lab;
        var date_reserved = req.body.date_reserved;
        var reservation_date = req.body.reservation_date;
        var time_slot = req.body.time_slot;

        var reservation = {
            seat_id: seat,
            user: user,
            lab: lab,
            date_reserved: date_reserved,
            reservation_date: reservation_date,
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
    },

    deleteReservation: async function(req, res){
        var seat = parseInt(req.body.seat_id);
        var user = req.body.user;
        var date_reserved = req.body.date_reserved;
        var reservation_date = req.body.reservation_date;
        var time_slot = req.body.time_slot;
        var lab = req.body.lab;

        console.log("delete")
        console.log(req.body);

        var query = {
            seat_id: seat,
            user: user,
            date_reserved: date_reserved,
            reservation_date: reservation_date,
            time_slot: time_slot,
            lab: lab
        };

        var response = await db.deleteOne(Reservation, query);

        if(response != null){
            res.send("Reservation deleted successfully");
        }
        else {
            res.send({error: "Failed to delete reservation"});
        }
    },

    updateReservation: async function(req, res) {
        var query = {
            lab: req.body.old_lab,
            seat_id: req.body.old_seat_id,
            reservation_date: req.body.old_reservation_date,
            time_slot: req.body.old_time_slot,
        }

        var update = {
            lab: req.body.new_lab,
            seat_id: req.body.new_seat_id,
            reservation_date: req.body.new_reservation_date,
            time_slot: req.body.new_time_slot,
        }

        // console.log(req.body);
        console.log("update");
        console.log(update);
        console.log("query");
        console.log(query);
        const result = await db.updateOne(Reservation, query, update);
        // console.log(result);
        res.send(result);
    }
};

module.exports = reserveController;
