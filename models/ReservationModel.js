var mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({
    seat_id: {
        type: Number,
        required: true
    },
    user: {
        email: {
            type: Object,
            required: true
        },

        type: Object,
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
