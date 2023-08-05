const controller = {
    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function (req, res) {
        res.render('index');
    },

    getAbout: function (req, res) {
        res.render('about');
    }
}

module.exports = controller;
