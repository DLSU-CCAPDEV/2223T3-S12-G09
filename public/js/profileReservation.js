const listReservations = [];
var currentReservations;
var currUser;
var sessUser;

class Reservations {
    constructor(id, edit, deleteButton, seat_id, lab, date_reserved,
                reservation_date, time_slot) {
        // console.log("hello");
        this.id = id;
        this.edit = edit;
        this.deleteButton = deleteButton;
        this.seat_id = seat_id;
        this.lab = lab;
        this.date_reserved = date_reserved;
        this.reservation_date = reservation_date;
        this.time_slot = time_slot;
    }
}

$(document).ready(function() {
    listTables(currUser);
})

function setUsernames(user_url, user_sess) {
    currUser = user_url;
    sessUser = user_sess;
}

async function listTables(username) {
    await $.get('/listReservations', {user: username}, function(result){
        const $table = $("#reservation-list");
        $table.empty();
        listReservations.length = 0;
        $table.append($(
            "<tr>" +
                "<th>Laboratory</th>" +
                "<th>Seat #</th>" +
                "<th>Date Reserved</th>" +
                "<th>Date of Reservation</th>" +
                "<th>Time</th>" +
                "<th class='no-outline'></th>" +
                "<th class='no-outline'></th>" +
            "</tr>"
        ));
        // for (const reserve of result) {
        for (var i = 0; i < result.length; i++) {
            const reserve = result[i];

            // console.log(reserve);

            const reservationDate = new Date(reserve.reservation_date);
            const reservationDateStr = format_date(reservationDate);

            const dateReserved = new Date(reserve.date_reserved);
            const dateReservedStr = format_date(dateReserved);

            const $tr = $("<tr></tr>");
            const $lab = $("<td></td>");
            const $seatNo = $("<td></td>");
            const $dateReserved = $("<td></td>");
            const $dateReservation = $("<td></td>");
            const $timeslot = $("<td></td>");
            const $deleteCell = $("<td></td>");
            const $editCell = $("<td></td>");

            const $deleteButton = $("<button></button>");
            const $editButton = $("<button></button>");

            $lab.text("Laboratory " + reserve.lab.toUpperCase());
            $seatNo.text(reserve.seat_id);
            $dateReserved.text(dateReservedStr);
            $dateReservation.text(reservationDateStr);
            $timeslot.text(reserve.time_slot);

            $deleteButton.text("Delete");
            $editButton.text("Edit");

            $deleteCell.addClass('no-outline');
            $editCell.addClass('no-outline');

            $deleteCell.append($deleteButton);
            $editCell.append($editButton);
            $tr.append($lab, $seatNo, $dateReserved,
                       $dateReservation, $timeslot);

            if (currUser == sessUser) {
                $tr.append($editCell, $deleteCell);
            }

            $table.append($tr);

            listReservations.push(
                new Reservations(i, $editButton,
                                 $deleteButton,
                                 reserve.seat_id, reserve.lab,
                                 reserve.date_reserved,
                                 reserve.reservation_date,
                                 reserve.time_slot)
            );
        }
    });
    // console.log(listReservations);

    // for (const editButton of listReservations) {
    for (var i = 0; i < listReservations.length; i++) {
        const reserveItem = listReservations[i];
        const $editButton = $(reserveItem.edit);
        const $deleteButton = $(reserveItem.deleteButton);

        $editButton.click(function() {
            // console.log(editButton.id);
            editReserve(reserveItem.id);
        })

        $deleteButton.click(function() {
            deleteReserve(reserveItem.id);
        })
    }
}

function format_date(date){
    var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

    return date = months[date.getMonth()] + " " +
                         date.getDate() + ", " + date.getFullYear();
}

function editReserve(index) {
    currentReservations = listReservations[index];
    const date = new Date(currentReservations.reservation_date);
    const dateStr = date.getFullYear() + "-" +
                    date.getMonth().toString().padStart(2, '0') + "-" +
                    date.getDate().toString().padStart(2, '0');
    $("#edit-div").show();
    // console.log(dateStr);

    $("#seat_id").val(currentReservations.seat_id).change();
    $("#lab").val(currentReservations.lab).change();
    $("#reservation_date").val(dateStr);
    $("#time_slot").val(currentReservations.time_slot);
}

async function deleteReserve(index) {
    currentReservations = listReservations[index];
    alert("hello");
    const sendJSON = {
        user: sessUser,
        lab: currentReservations.lab,
        seat_id: currentReservations.seat_id,
        date_reserved: currentReservations.date_reserved,
        reservation_date: currentReservations.reservation_date,
        time_slot: currentReservations.time_slot
    };
    await $.post("/deleteReservation", sendJSON, function (result) {
        listTables(currUser);
    });
}

$("#edit-div").ready(function() {
    // alert("hello");

    $("#reservation_date").click(function() {
        console.log($(this).val());
    });

    $("#cancel-edit").click(function(event) {
        $("#edit-div").hide();
    });

    $("#submit-edit").click(async function(event) {
        const sendJSON = {
            old_lab: currentReservations.lab,
            old_seat_id: currentReservations.seat_id,
            old_date_reserved: currentReservations.date_reserved,
            old_reservation_date: currentReservations.reservation_date,
            old_time_slot: currentReservations.time_slot,

            new_lab: $("#lab").val(),
            new_seat_id: $("#seat_id").val(),
            new_reservation_date: $("#reservation_date").val(),
            new_time_slot: $("#time_slot").val(),
        };
        await $.post("/updateReservation", sendJSON, function (result) {
            alert("hello");
            listTables(currUser);
            $("#edit-div").hide();
        });
    });

    $("#edit-reservation").submit(function(event) {
        event.preventDefault();
    });
});

$("#time_slot").ready(function() {
    // var time_slots = document.getElementById("time-slots");
    // alert("time_slot");
    const $time_slots = $("#time_slot");
    var hr, min, time_period;

    for (var i = 420; i <= 1050; i += 30) {
        hr = Math.floor(i / 60);
        min = i % 60;

        if (min < 10)
            min = '0' + min;

        if (hr % 24 < 12)
            time_period = "AM";
        else
            time_period = "PM";

        hr = hr % 12;

        if (hr === 0)
            hr = 12;

        var end_hr = Math.floor((i + 30) / 60) % 12;

        if (end_hr === 0)
            end_hr = 12;

        var end_min = (i + 30) % 60;

        if (end_min < 10)
            end_min = '0' + end_min;

        // var option = document.createElement("option");
        const timeStr = hr + ":" + min + " " + time_period +
            " to " + end_hr + ":" + end_min + " " + time_period;
        const $option = $("<option></option>");
        $option.val(timeStr);
        $option.text(timeStr);
        $time_slots.append($option);
    }
});

$("#seat_id").ready(function() {
    for (var i = 0; i < 36; i ++) {
        // var option = document.createElement("option");
        const $option = $("<option></option>");
        $option.val(i);
        $option.text("Seat " + i);
        $("#seat_id").append($option);
    }
});
