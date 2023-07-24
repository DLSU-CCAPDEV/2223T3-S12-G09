// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var ProfileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
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

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('Profile', UserSchema);
