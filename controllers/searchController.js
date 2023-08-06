const db = require('../models/db.js');
const Account = require('../models/AccountModel.js');
const Reservation = require('../models/ReservationModel.js');

const searchController = {
    getSearch: function (req, res) {
        res.render('search-users', {state: "user"});
    },
    listAccounts: async function (req, res) {
        // console.log("hello");
        // const username = req.body.search;
        // Searching user
        const search_user = req.body["search-user"];
        const state = req.body.state;
        let user_query;
        let user_result;

        // Searching Reservation
        const dateReservedData = req.body["date-reserved"];
        const reservationDateData = req.body["reservation-date"];

        let dateReserved;
        let dateReservedEnd;
        let reservationDate;
        let reservationDateEnd;
        let reservation_result;

        if (dateReservedData != "") {
            dateReserved = new Date(dateReservedData);
            dateReservedEnd = new Date(dateReserved);
            const getDate = dateReservedEnd.getDate();
            dateReservedEnd.setDate(getDate + 1);
        }
        if (reservationDateData != "") {
            reservationDate = new Date(reservationDateData);
            reservationDateEnd = new Date(reservationDate);
            const getDate = reservationDateEnd.getDate();
            reservationDateEnd.setDate(getDate + 1);
        }

        console.log("dateReserved: ");
        console.log(dateReservedData);
        console.log(dateReserved);

        console.log("dateReservedEnd: ");
        console.log(dateReservedEnd);

        console.log("reservationDate: ");
        console.log(reservationDateData);
        console.log(reservationDate);

        console.log("reservationDateEnd: ");
        console.log(reservationDateEnd);

        const reservation_query = {
            $or : [
                {user: req.body.user},
                {
                    // reservation_date: reservationDate
                    reservation_date: {
                        $gte: reservationDate,
                        $lte: reservationDateEnd
                    }
                },
                {
                    // date_reserved: dateReserved
                    date_reserved: {
                        // $gt: dateReserved
                        $gte: dateReserved,
                        $lte: dateReservedEnd
                    }
                }
            ]
        };

        if (search_user == "all") {
            user_query = {};
        } else {
            user_query = {
                $or: [
                    {username: search_user},
                    {fname: search_user},
                    {lname: search_user}
                ]
            };
        }

        console.log("reservation_query: ");
        console.log(reservation_query);

        if (state == "user") {
            user_result = await db.findMany(Account, user_query);
            console.log(user_result);
        }
        else if (state == "reservation") {
            reservation_result = await db.findMany(Reservation,
                                                   reservation_query);
            console.log(reservation_result);
        }
        console.log("user result: ");
        console.log(user_result);

        console.log("reservation result: ");
        console.log(reservation_result);

        // console.log(result);
        res.render("search-users", {
            user_result: user_result,
            reservation_result: reservation_result,
            state: state
        });
    }
}

module.exports = searchController;
