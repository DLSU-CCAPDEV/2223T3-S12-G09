const db = require('../models/db.js');
const Reservation = require('../models/ReservationModel.js');
const Account = require('../models/AccountModel.js');
const Session = require('./sessionController.js');


const searchController = {
    getSearch: function (req, res) {
        var details = Session.connectSession(req, res);

        res.render('search-users', {
            state:"user",
            username: details.username,
            flag: details.flag,
        });
    },
    listAccounts: async function (req, res) {
        var details = Session.connectSession(req, res);;
        var state = req.body.state;

        // console.log(req.body);
        switch (state) {
            case "user":
                const search = req.body["search-user"];
                var userQuery = {
                    $or: [
                    {username: search},
                    {fname: search},
                    {lname: search}
                    ]
                };
                var userreqult;

                if (search == "all")
                    userResult = await db.findMany(Account, {});
                else
                    userResult = await db.findMany(Account, userQuery);

                res.render("search-users", {
                    user_result: userResult,
                    state: "user",
                    username: details.username,
                    flag: details.flag,
                });
                break;

            case "reservation":
                const reservationDateData = req.body["reservation-date"];
                const dateReservedData = req.body["date-reserved"];

                let reservationDate;
                let reservationDateEnd;

                if (reservationDateData != "") {
                    reservationDate = new Date(reservationDateData);
                    reservationDateEnd = new Date(reservationDate);
                    reservationDateEnd.setDate(reservationDateEnd.getDate() + 1);
                }

                let dateReserved;
                let dateReservedEnd;

                if (dateReservedData != "") {
                    dateReserved = new Date(dateReservedData);
                    dateReservedEnd = new Date(dateReserved);
                    dateReservedEnd.setDate(dateReservedEnd.getDate() + 1);
                }

                console.log("reservationDate:");
                console.log(reservationDateData);
                console.log(reservationDate);

                console.log("reservationDateEnd:");
                console.log(reservationDateEnd);

                console.log("dateReserved:");
                console.log(dateReservedData);
                console.log(dateReserved);

                console.log("dateReserved:");
                console.log(dateReservedEnd);

                const reservationQuery = {
                    $or: [
                    {user: req.body["user"]},
                    {reservation_date: {$gte: reservationDate,
                                        $lte: reservationDateEnd}},
                    {date_reserved: {$gte: dateReserved,
                                        $lte: dateReservedEnd}},
                    {lab: req.body["lab"]}
                    ]
                };

                const reservationResult =
                    await db.findMany(Reservation,
                                      reservationQuery);
                res.render("search-users", {
                    reservation_result: reservationResult,
                    state: "reservation",
                    username: details.username,
                    flag: details.flag,
                });
                break;
        }
    }
};

module.exports = searchController;
