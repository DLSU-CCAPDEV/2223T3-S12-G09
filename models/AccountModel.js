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
        //required: true,
        default: "No description."
    },
    password: {
        type: String,
        required: true
    },
    pfpURL: {
        type: String,
        //required: true,
        default: "https://cdn.vectorstock.com/i/preview-1x/70/84/default-avatar-profile-icon-symbol-for-website-vector-46547084.jpg"
    },
    type: {
        type: String,
        //required: true,
        default: "Student"
    },
    deleted: {
        type: Boolean,
        //required: true
        default: false
    },
});

module.exports = mongoose.model('Account', AccountSchema);
