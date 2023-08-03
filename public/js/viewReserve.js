$viewReserve = $("<div id='view-div'></div>");
$viewTop= $("<div class='view-content'></div>");
$viewBottom = $("<div class='view-content'></div>");

$viewReserve.append($viewTop, $viewBottom);

const bottomHTML =
    "<button class='view-button view-focused'>Cancel</button>" +
    "<button class='view-button'>Remove</button>";
$viewBottom.append($(bottomHTML));

function interactSeat(seat_container, user, seat, date, lab, time_slot) {
    // Request data from server
    const sendJSON = {
        seat_id: seat.seat_id,
        email: user,
        date: date,
        time_slot: time_slot,
        lab: lab
    };
    $.get("/checkReservation", sendJSON, function(result) {
        console.log(result);
    });
    // Popup that shit

    // Display the data

    // Show the butt'ns

}
