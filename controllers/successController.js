const successController = {
    getSuccess: function(req, res){
        var details = {
            email: req.query.email
        };

        res.send(details);
    }
}

module.exports = successController;