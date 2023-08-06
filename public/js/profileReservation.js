const listReservations = [];
var currentReservations;

class Reservations {
    constructor(id, edit, deleteButton, seat_id, lab, date_reserved,
                reservation_date, time_slot) {
        console.log("hello");
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


async function listTables(username) {
    await $.get('/listReservations', {user: username}, function(result){
        const $table = $("#reservation-list");

        // for (const reserve of result) {
        for (var i = 0; i < result.length; i++) {
            const reserve = result[i];

            console.log(reserve);

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
                       $dateReservation, $timeslot,
                       $editCell, $deleteCell);
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
    console.log(listReservations);

    // for (const editButton of listReservations) {
    for (var i = 0; i < listReservations.length; i++) {
        const editButton = listReservations[i];
        const button = $(editButton.edit);

        button.click(function() {
            // console.log(editButton.id);
            editReserve(editButton.id);
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
    const reserve = listReservations[index];
    const date = new Date(reserve.reservation_date);
    const dateStr = date.getFullYear() + "-" +
                    date.getMonth().toString().padStart(2, '0') + "-" +
                    date.getDate().toString().padStart(2, '0');
    $("#edit-div").show();
    console.log(dateStr);
    // console.log(date.getFullYear());
    // console.log(date.getMonth());
    // console.log(date.getDate());

    $("#lab").val(reserve.lab).change();
    $("#reservation_date").val(dateStr);
    $("#time_slot").val(reserve.time_slot);

    // console.log($("#reservation_date").val());
    // console.log($("#lab").val());
}


$("#edit-div").ready(function() {
    // alert("hello");

    $("#reservation_date").click(function() {
        console.log($(this).val());
    });

    $("#cancel-edit").click(function(event) {
        $("#edit-div").hide();
    });

    $("#submit-edit").click(function(event) {
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
