const sessionController = {
    /**
     * Connects session
     * @param req - HTTP request object
     * @param res   - HTTP response object
     * @param success - callback function executed when
     *                  it is logged in
     * @param fail - callback function executed when it is not
     *               logged in
     * returns an object 'detail' with username and flag
     */
    connectSession: function (req, res,
                              success,
                              fail) {
        var details = {};

        if(req.session.username) {
            details.flag = true;
            details.username = req.session.username;

            if (success != undefined)
                success(details);
        } else {
            details.flag = false;

            if (fail != undefined)
                fail(details);
        }
        return details;
    }
}

module.exports = sessionController;
