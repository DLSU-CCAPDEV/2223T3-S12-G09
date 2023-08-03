var mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({
    seat_id: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    lab: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time_slot: {
        type: String,
        required: true
    }
}, {collection : 'reservation'});


module.exports = mongoose.model('Reservation', ReservationSchema);
