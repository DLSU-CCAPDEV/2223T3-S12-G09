const labController = {
    getLabs: function (req, res) {
        var details = {};

        if(req.session.username) {
            details.flag = true;
            details.username = req.session.username;
        } else
            details.flag = false;

        res.render('labs', details);
    }
}

module.exports = labController;
