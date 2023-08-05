const controller = {
    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function (req, res) {
        var details = {};

        if(req.session.username) {
            details.flag = true;
            details.username = req.session.username;
        } else
            details.flag = false;

        res.render('index', details);
    },

    getAbout: function (req, res) {
        var details = {};

        if(req.session.username) {
            details.flag = true;
            details.username = req.session.username;
        } else
            details.flag = false;

        res.render('about', details);
    }
}

module.exports = controller;
