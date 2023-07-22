const controllers = require('../controllers/controller');
const labControllers = require('../controllers/labController');

const express = require('express');
const app = express();

app.get('/', controllers.getIndex);
app.get('/labs', labControllers.getLabs);

module.exports = app;
