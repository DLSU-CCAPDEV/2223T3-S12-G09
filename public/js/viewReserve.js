console.log("viewReserve.js");

const $viewReserve = $("<div id='view-div'></div>");
const $viewTop= $("<div class='view-content' id='view-top'></div>");
const $viewBottom = $("<div class='view-content' id='view-bottom'></div>");

let $seatContainer;

const $cancelButton = $("<button id='cancel-button'>Cancel</button>")
const $reserveButton = $("<button id='reserve-button'>Reserve</button>")
const $deleteButton = $("<button id='delete-button'>Delete</button>")

// States for interacting the seat
const cancel_state = 0;
const reserve_state= 1;
const delete_state = 2;

async function interact_seat(seat_container, user, seat, date, lab,
                       time_slot, event) {
    let output = "";
  
    const header = "<h2>Seat " + seat.seat_id + "</h2>";
    const details =
        "<p class='seat-details'>" + format_date(date) + "</p>" +
        "<p class='seat-details'>in Laboratory " + lab.toUpperCase() + "</p>" +
        "<p class='seat-details'>Time: " + time_slot + "</p>";

    $seatContainer = $(seat_container);
  
    if ($viewReserve.find($viewTop) != null ||
        $viewReserve.find($viewBottom) != null) {
        $viewTop.empty();
        $viewBottom.empty();
        $viewReserve.empty();

        $viewReserve.css("left", event.clientX);
        $viewReserve.css("top", event.clientY);
    }

    // Request data from server
    const sendJSON = {
        seat_id: seat.seat_id.toString(),
        lab: lab,
        reservation_date: date,
        time_slot: time_slot
    };
    let receivedJSON = {};

    console.log("--interact_seat()--");
    console.log(sendJSON);

    await $.get("/checkReservation", sendJSON, function(result) {
        if (result) {
            popupState = delete_state;
        }
        else {
            popupState = reserve_state;
        }

        receivedJSON = result;
    });

    const username = receivedJSON["user"];
    const link = "/profile/" + username;
    console.log(receivedJSON);
    console.log(popupState);
    output += "<p>";
    output += "<a href='" + link + "'>" + username + "</a>";
    output += "</p>";
    output += "<p>Reserved on</p>";
    output += "<p>" + format_date(new Date(receivedJSON["date_reserved"])) + "</p>";
    console.log(output);

    // Popup that shit
    $seatContainer.append($viewReserve);

    // Display the data
    $viewTop.append($(header));
    switch (popupState) {
        case reserve_state:
            $viewTop.append($(details));
            if (user != null) {
                $viewBottom.append($reserveButton);
            }
            break;
        case delete_state:
            $viewTop.append($(output));
            if (user == username || currType == "DLSU Technician") {
            // if (user == username) {
                // alert(user);
                $viewBottom.append($deleteButton);
            }
            break;
    }
    $viewBottom.append($cancelButton);

    $viewReserve.append($viewTop, $viewBottom);

    $viewReserve.click(function (e) {
        e.stopPropagation();
    });

    $cancelButton.click(function(e) {
        e.stopPropagation();
        popupState = cancel_state;
        removePopup();
    });

    $reserveButton.click(function(e) {
        e.stopPropagation();

        reserve_seat(seat, lab, time_slot);
        removePopup();
    })

    $deleteButton.click(function(e) {
        e.stopPropagation();
        if (user == username || type == "DLSU Technician") {
        // if (user == username) {
            delete_reservation(seat, date, lab, time_slot)
        }
        removePopup();
    })

    $(document).ready(function() {
        $("body").click(function() {
            removePopup();
        })
    });
}

function removePopup() {
    console.log("I CLOSE");
    $viewTop.empty();
    $viewBottom.empty();
    $viewReserve.empty();

    $viewTop.remove();
    $viewBottom.remove();
    $viewReserve.remove();
}


