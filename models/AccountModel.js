var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },/*
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },*/
    description: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pfpURL: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('Account', AccountSchema);
