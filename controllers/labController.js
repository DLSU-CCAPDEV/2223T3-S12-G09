const Session = require('./sessionController.js');

const labController = {
    getLabs: function (req, res) {
        var details = Session.connectSession(req, res);

        res.render('labs', details);
    }
}

module.exports = labController;
