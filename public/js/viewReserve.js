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

popupState = cancel_state;

async function interact_seat(seat_container, user, seat, date, lab,
                       time_slot, event) {
    $seatContainer = $(seat_container);
    let output = "";
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
        user: user,
        lab: lab,
        reservation_date: date,
        time_slot: time_slot
    };
    let receivedJSON = {};

    console.log("--interact_seat()--");
    console.log(sendJSON);

    await $.get("/checkReservation", sendJSON, function(result) {
        if (result) {
            $("<p>Email: {receivedJSON.user}</p>" +
                "<p>Date of Reservation: {receivedJSON.reservation_date}</p>" +
                "<p>Time: {receivedJSON.time_slot}</p>")
            popupState = delete_state;
        }
        else {
            popupState = reserve_state;
        }

        receivedJSON = result;
    });
    console.log(receivedJSON);
    console.log(popupState);

    output += "<p>" + receivedJSON["user"] + "</p>";
    output += "<p>Reserved on</p>";
    output += "<p>" + format_date(new Date(receivedJSON["date_reserved"])) + "</p>";
    console.log(output);

    // Popup that shit
    $seatContainer.append($viewReserve);

    // Display the data
    switch (popupState) {
        case reserve_state:
            $viewBottom.append($reserveButton);
            $viewReserve.append($viewBottom);
            break;
        case delete_state:
            $viewTop.append($(output));
            $viewBottom.append($deleteButton);
            $viewReserve.append($viewTop, $viewBottom);
            break;
    }

    $viewBottom.append($cancelButton);

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
        popupState = reserve_state;

        reserve_seat(seat, lab, time_slot);
        removePopup();
    })

    $deleteButton.click(function(e) {
        e.stopPropagation();
        popupState = delete_state;
        removePopup();
    })

    $(document).ready(function() {
        $("body").click(function() {
            popupState = cancel_state;
            removePopup();
        })
    });
}

function removePopup() {
    console.log("I CLOSE");
    $viewReserve.remove();
}


