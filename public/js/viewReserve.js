console.log("viewReserve.js");

// States for interacting the seat
const cancel_state = 0;
const reserve_state= 1;
const delete_state = 2;

$viewReserve = $("<div id='view-div'></div>");
$viewTop= $("<div class='view-content'></div>");
$viewBottom = $("<div class='view-content'></div>");

$viewReserve.append($viewTop, $viewBottom);

const bottomHTML =
    "<button class='view-button view-focused'>Cancel</button>" +
    "<button class='view-button'>Remove</button>";
$viewBottom.append($(bottomHTML));

function interact_seat(seat_container, user, seat, date, lab, time_slot) {
    let state = cancel_state;

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

    $.get("/checkReservation", sendJSON, function(result) {
        if (result) {
            state = delete_state;
        }
        else {
            state = reserve_state;
        }

        receivedJSON = result;
    });

    // Popup that shit
    seat_container.append($viewReserve);
    // Display the data
    const $cancelButton = $("<button id='cancel-button'>Cancel</button>")
    const $reserveButton = $("<button id='reserve-button'>Reserve</button>")
    const $deleteButton = $("<button id='delete-button'>Delete</button>")

    switch (state) {
        case reserve_state:
            $viewBottom.append($reserveButton);
            break;
        case delete_state:
            $viewTop.append($("<p>Email: {receivedJSON.user}</p>" +
                "<p>Date of Reservation: {receivedJSON.reservation_date}</p>" +
                "<p>Time: {receivedJSON.time_slot}</p>"
            ));
            $viewBottom.append($deleteButton);
            break;
    }

    $viewBottom.append($cancelButton);

    $cancelButton.click(function() {
        state = cancel_state;
        removePopup();
    });

    $reserveButton.click(function() {
        state = reserve_state;
        removePopup();
    })

    $deleteButton.click(function() {
        state = delete_state;
        removePopup();
    })

    function removePopup() {
        $viewReserve.remove();
    }

    return state;
}
