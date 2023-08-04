
// import module `mongoose`
const mongoose = require('mongoose');

const Reservation = require('./ReservationModel.js');
const Account = require('./AccountModel.js');

// ccapdev-mongoose is the name of the database
const url = 'mongodb+srv://admin:EJQYBcLmYB9ptMLB@g09-2223t3-s12.suaaeyb.mongodb.net/labDB?retryWrites=true&w=majority';

// additional connection options
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {
    connect: async function () {
        await mongoose.connect(url, options);
        console.log('Connected to: ' + url);
    },

    insertOne: async function(model, doc) {
        return await model.create(doc);
    }, 

    insertMany: async function(model, docs) {
        return await model.insertMany(docs);
    },

    findOne: async function(model, query, projection) {
        return await model.findOne(query, projection);
    },

    findMany: async function(model, query, projection) {
        return await model.find(query, projection);
    },

    updateOne: async function(model, filter, update) {
        return await model.updateOne(filter, update);
    },

    updateMany: async function(model, filter, update) {
        return await model.updateMany(filter, update);
    },

    deleteOne: async function(model, conditions) {
        return await model.deleteOne(conditions);
    },

    deleteMany: async function(model, conditions) {
        return await model.deleteMany(conditions);
    }

}

//module.exports = {database, mongoose};
module.exports = database;

