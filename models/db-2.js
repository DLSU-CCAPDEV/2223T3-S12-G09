
// import module `mongoose`
const mongoose = require('mongoose');

// import module `User` from `../models/UserModel.js`
const Profile = require('./ProfileModel.js');

// ccapdev-mongoose is the name of the database
const url = 'mongodb+srv://admin:EJQYBcLmYB9ptMLB@g09-2223t3-s12.suaaeyb.mongodb.net/?retryWrites=true&w=majority';

// additional connection options
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

// defines an object which contains necessary database functions
const database = {

    /*
        connects to database
    */
    connect: function () {
        mongoose.connect(url, options).then(function(error) {
            console.log('Connected to: ' + url);
        }).catch(function (error) {
            if(error) throw error;
        });
    },

    /*
        inserts a single `doc` to the database based on the model `model`
    */
    insertOne: function(model, doc, callback) {
        model.create(doc).then(function(result) {
            console.log('Added ' + result);
            return callback(true);
        }).catch(function(error) {
            if(error) return callback(false);
        });
    },

    /*
        inserts multiple `docs` to the database based on the model `model`
    */
    insertMany: function(model, docs) {
        model.insertMany(docs).then(function(result) {
            console.log('Added ' + result);
            return callback(true);
        }).catch(function(error) {
            if(error) return callback(false)
        });
    },

    /*
        searches for a single document based on the model `model`
        filtered through the object `query`
        limits the fields returned based on the string `projection`
        callback function is called after the execution of findOne() function
    */
    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection).then(async function(result) {
            return callback(result);
        }).catch(async function(error) {
            if(error) return callback(false);
        });
    },

    /*
        searches for multiple documents based on the model `model`
        filtered through the object `query`
        limits the fields returned based on the string `projection`
        callback function is called after the execution of findMany() function
    */
    findMany: function(model, query, projection, callback) {
        model.find(query, projection).then(function(result) {
            return callback(result);
        }).catch(function(error) {
            if(error) return callback(false);
        });
    },

    /*
        updates the value defined in the object `update`
        on a single document based on the model `model`
        filtered by the object `filter`
    */
    updateOne: function(model, filter, update) {
        model.updateOne(filter, update).then(function(result) {
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        }).catch(function(error) {
            if(error) return callback(false);
        });
    },

    /*
        updates the value defined in the object `update`
        on multiple documents based on the model `model`
        filtered using the object `filter`
    */
    updateMany: function(model, filter, update) {
        model.updateMany(filter, update).then(function(result) {
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        }).catch(function(error) {
            if(error) return callback(false);
        });
    },

    /*
        deletes a single document based on the model `model`
        filtered using the object `conditions`
    */
    deleteOne: function(model, conditions) {
        model.deleteOne(conditions).then(function (result) {
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        }).catch(function (error) {
            if(error) return callback(false);
        });
    },

    /*
        deletes multiple documents based on the model `model`
        filtered using the object `conditions`
    */
    deleteMany: function(model, conditions) {
        model.deleteMany(conditions).then(function (result) {
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        }).catch(function (error) {
            if(error) return callback(false);
        });
    }

}

/*
    exports the object `database` (defined above)
    when another script exports from this file
*/
module.exports = database;
