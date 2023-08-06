const Session = require('./sessionController.js');

const controller = {
    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function (req, res) {
        var details = Session.connectSession(req, res);

        res.render('index', details);
    },

    getAbout: function (req, res) {
        var details = Session.connectSession(req, res);

        res.render('about', details);
    }
}

module.exports = controller;
