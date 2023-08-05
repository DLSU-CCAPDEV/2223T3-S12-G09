var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'Student'
    },
    pfpURL: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: 'No bio.'
    },
    deleted: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Account', AccountSchema);
