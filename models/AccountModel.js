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
        default: 'https://d2w9rnfcy7mm78.cloudfront.net/8040974/original_ff4f1f43d7b72cc31d2eb5b0827ff1ac.png?1595022778?bc=0'
    },
    description: {
        type: String,
        default: 'No bio.'
    }
});

module.exports = mongoose.model('Account', AccountSchema);
