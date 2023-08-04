var days = [];
update_days(days);
var current_date = days[0];
var selected_lab = "a";
var seats = [];

function Seat(seat_id){
    this.seat_id = seat_id;
    this.reservations = [];
}

function Reservation(seat_id, user, lab, date_reserved, reservation_date,
                    time_slot){
    this.seat_id = seat_id;
    this.user = user;
    this.lab = lab;
    this.date_reserved = date_reserved; // when the user put a reservation
    this.reservation_date = reservation_date; // the date when the user will
                                              // come to borrow a computer
    this.time_slot = time_slot;
}

$(document).ready(function(){
    generate_buttons();
    generate_time_slots();
    populate_seats(seats);
    display_seats(seats, current_date);
    // display_user_reservations();
    $("#login_ID").click(function() {
        console.log("logged in");
        display_user_reservations()
    });

    $("#logout_ID").click(function() {
        document.getElementById("user-res-container").innerHTML = "";
    })
});

$("#time-slots").change(function(){
   display_seats(seats, current_date);
});

$("#res-labs > button").click(function(){
    var btn_index = Array.from(this.parentNode.children).indexOf(this);

    if(btn_index === 0)
        selected_lab = "a";
    else if (btn_index === 1)
        selected_lab = "b";
    else
        selected_lab = "c";

    alert("Laboratory " + selected_lab.toUpperCase() + " selected");
    display_seats(seats, current_date);
});

// Setup for the reservation_date, not the date_reserved
function update_days(days){
   for(var i = 0; i < 7; i++){
        var currentDate = new Date();
        var noHourDate = new Date(currentDate.setHours(0, 0, 0, 0));
        console.log(noHourDate);
        days.push(noHourDate);
        days[i].setDate(days[i].getDate() + i);
    }
}

function generate_buttons(){
    for(var i = 0; i < 7; i++) {
        var button = document.createElement("button");
        document.getElementById("res-days").append(button);
        button.innerHTML = format_date(days[i]);
        button.onclick = function(){
            current_date = days[Array.from(this.parentNode.children).indexOf(this)];
            alert("Set date to " + current_date.toString());
            display_seats(seats, current_date);
            reset_selected_time_slot();
        };
    }
}

function format_date(date){
    var months = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

    return date = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

function reset_selected_time_slot(){
    document.getElementById("time-slots").selectedIndex = "0";
}

function generate_time_slots() {
    var time_slots = document.getElementById("time-slots");
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

        var option = document.createElement("option");
        option.value = option.innerHTML = hr + ":" + min + " " + time_period + " to " + end_hr + ":" + end_min + " " + time_period;
        time_slots.append(option);
    }
}


function populate_seats(seats){
    for(var i = 0; i < 36; i++)
        seats.push(new Seat(i));
}

function display_seats(seats, date){
    document.getElementById("res-seats-container").innerHTML = "";
    var time_slot = document.getElementById("time-slots");

    for(var i = 0; i < seats.length; i++)
        display_seat(seats[i], date, time_slot.options[time_slot.selectedIndex].text);
}

function display_seat(seat, date, time_slot) {
    var seat_container = document.createElement("div");
    document.getElementById("res-seats-container").append(seat_container);
    seat_container.innerHTML = seat.seat_id;
    seat_container.className = "seat-container";

    const sendJSON = {
            seat_id: seat.seat_id.toString(),
            lab: selected_lab,
            reservation_date: date,
            time_slot: time_slot
    };
    console.log("display_seat()");
    console.log(sendJSON);

    $.get('/checkReservation', sendJSON, (result, status) => {
        // console.log("AJAX Get result: ");
        // console.log(result.reservation_date);
        // const res_date = result.reservation_date;
        const res_date = new Date(result.reservation_date);
        console.log(res_date);
        console.log(date);
        if (result.seat_id == seat.seat_id.toString() &&
            res_date == date &&
            result.time_slot == time_slot &&
            result.lab == selected_lab
        ) {
            seat_container.classList.add("reserved");
        }
    });

    seat_container.onclick = function(){
        if (currUser == null) {
            alert("Sign in first!!");
            return;
        }
        console.log(currUser);

        const state = interact_seat(seat_container, currUser, seat, date,
                                    selected_lab, time_slot);
        switch (state) {
            case reserve_state:
                reserve_seat(seat, selected_lab, time_slot);
                break;
            case delete_state:
                delete_reservation(seat, date, selected_lab, time_slot);
                break;
        }
        // if(seat_container.classList.contains("reserved")){
        //
        //     // seat_container.classList.remove("reserved");
        // }
        // else{
        // }


    };



    // const sendJSON = {
    //     seat_id: seat.seat_id,
    //     email: currUser,
    //     date: date,
    //     time_slot: time_slot,
    //     lab: selected_lab
    // };
    //

    // if(seat.reservations.some(reservation =>
    //     reservation.date === date &&
    //     reservation.time_slot === time_slot &&
    //     reservation.lab === selected_lab
    // ))
    //     seat_container.classList.add("reserved");
}

function reserve_seat(seat, lab, time_slot){
    // seats[seat.seat_id].reservations.push(new Reservation(seat.seat_id, currUser, lab, current_date, time_slot));

    const sendJSON = {
            seat_id: seat.seat_id,
            user: currUser,
            lab: selected_lab,
            date_reserved: new Date(),
            reservation_date: current_date,
            time_slot: time_slot
    };

    $.post('/makeReservation', sendJSON, (result, status) => {
        console.log("--reserve_seat()--");
        console.log('Status:', status);
        console.log(result);

        if (result == null) {
            alert("Failed to reserve Seat " + seat.seat_id + ".");
            return false;
        }
    });
    alert("Seat " + seat.seat_id + " has been reserved");
    return true;
}

function delete_reservation(seat, date, lab, time_slot){
    // seat.reservations.splice(seat.reservations.findIndex(reservation =>
    //     reservation.date === date &&
    //     reservation.lab === lab &&
    //     reservation.time_slot === time_slot), 1);

    const sendJSON = {
        seat_id: seat.seat_id,
        user: currUser,
        lab: selected_lab,
        date: current_date,
        time_slot: time_slot
    };

    $.ajax({
       url: 'deleteReservation',
       type: 'DELETE',
       data: sendJSON,

       success: function(sendJSON){
           console.log(sendJSON);
           alert("Seat " + seat.seat_id + " reservation has been removed");
       },

        error: function(error){
           console.log("Error: ", error);
        }
    });
}

async function display_user_reservations(){
    document.getElementById("user-res-container").innerHTML = "";
    var user_reservations = (await filter_reservations(currUser)).slice();

    // for(var i = 0; i < user_reservations.length; i++)
    // $.get("/listReservations", {}, function(result, status) {
    //     console.log(result);
    // });
    console.log("display_user_reservations()");
    console.log(user_reservations);

    for (const reservations of user_reservations)
        display_user_reservation(reservations);
        // display_user_reservation(user_reservations[i]);
}

function display_user_reservation(reservation){
    var lab = document.createElement("div");
    var date = document.createElement("div");
    var time_slot = document.createElement("div");
    var seat_id = document.createElement("div");
    var container = document.createElement("div");

    container.append(lab);
    container.append(date);
    container.append(time_slot);
    container.append(seat_id);

    document.getElementById("user-res-container").append(container);
    document.getElementById("user-res-container").append(document.createElement("br"));

    console.log("display_user_reservation()");
    console.log(reservation);

    seat_id.innerHTML = "Seat " + reservation.seat_id;
    lab.innerHTML = "Laboratory " + reservation.lab.toUpperCase();
    if (reservation.date != null)
        date.innerHTML = format_date(new Date(reservation.date));

    if (reservation.reservation_date != null)
        date.innerHTML = format_date(new Date(reservation.reservation_date));
    time_slot.innerHTML = reservation.time_slot;
}

async function filter_reservations(user){
    var filtered_array = [];

    // seats.forEach(seat => {
    //     if(seat.reservations)
    //         seat.reservations.forEach(reservation => {
    //            if(reservation.user === user)
    //                filtered_array.push(reservation);
    //         });
    // });

    await $.get("/listReservations", {user: user}, function(result, status) {
        for (const data of result) {
            filtered_array.push(data);
        }
    });

    console.log("filter_reservations()");
    console.log(filtered_array);
    return filtered_array;
}
