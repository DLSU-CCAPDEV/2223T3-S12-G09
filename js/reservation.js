var days = [];
update_days(days);
var current_date = days[0];
var current_user = "User";
var selected_lab = "a";
var seats = [];

function Seat(seat_id){
    this.seat_id = seat_id;
    this.reservations = [];
}

function Reservation(user, lab, date, time_slot){
    this.user = user;
    this.lab = lab;
    this.date = date;
    this.time_slot = time_slot;
}

$(document).ready(function(){
    generate_buttons();
    generate_time_slots();
    populate_seats(seats);

    // Test
    var time_slot = document.getElementById("time-slots");
    seats[0].reservations.push(new Reservation(current_user, "a", current_date.toString(), time_slot.options[0].text));
    seats[1].reservations.push(new Reservation(current_user, "a", current_date.toString(), time_slot.options[0].text));
    seats[6].reservations.push(new Reservation(current_user, "b", days[2].toString(), time_slot.options[1].text));
    seats[9].reservations.push(new Reservation(current_user, "c", days[5].toString(), time_slot.options[1].text));
    seats[10].reservations.push(new Reservation(current_user, "c", days[5].toString(), time_slot.options[2].text));
    seats[27].reservations.push(new Reservation(current_user, "c", days[5].toString(),time_slot.options[2].text));
    seats[31].reservations.push(new Reservation(current_user, "c", days[6].toString(),  time_slot.options[3].text));

    display_seats(seats, current_date);
});

$("#time-slots").change(function(){
   display_seats(seats, current_date);
});

$("#res-labs > button").click(function(){
    selected_lab = this.id.substring(this.id.indexOf("-") + 1, this.id.length);
    alert("Laboratory " + selected_lab.toUpperCase() + " selected");
    display_seats(seats, current_date);
});

function update_days(days){
   for(var i = 0; i < 7; i++){
        days.push(new Date());
        days[i].setDate(days[i].getDate() + i);
    }
}

function generate_buttons(){
    for(var i = 0; i < 7; i++) {
        var button = document.createElement("button");
        document.getElementById("res-days").append(button);
        button.innerHTML = days[i].getMonth() + "/" + days[i].getDate() + "/" + days[i].getFullYear();
        button.value = days[i].toString();
        button.onclick = function(){
            current_date = new Date(this.value);
            alert("Set date to " + current_date.toString());
            display_seats(seats, current_date);
            reset_selected_time_slot();
        };
    }
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

function display_seat(seat, date, time_slot) {
    var seat_container = document.createElement("div");
    document.getElementById("res-seats-container").append(seat_container);
    seat_container.innerHTML = seat.seat_id;
    seat_container.className = "seat-container";
    seat_container.onclick = function(){
        reserve_seat(seat, selected_lab, time_slot);
        seat_container.classList.add("reserved");
    };

   if(seat.reservations.some(reservation => reservation.date === date &&
                                            reservation.time_slot === time_slot &&
                                            reservation.lab === selected_lab))
       seat_container.classList.add("reserved");
}

function reserve_seat(seat, lab, time_slot){
    seats[seat.seat_id].reservations.push(new Reservation(current_user, lab, current_date.toString(), time_slot));
    alert("Seat " + seat.seat_id + " has been reserved");
}

function display_seats(seats, date){
    document.getElementById("res-seats-container").innerHTML = "";
    var time_slot = document.getElementById("time-slots");

    for(var i = 0; i < seats.length; i++)
        display_seat(seats[i], date.toString(), time_slot.options[time_slot.selectedIndex].text);
}