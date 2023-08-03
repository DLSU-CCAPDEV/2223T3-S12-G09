$(document).ready(function() {
    $viewReserve = $("<div id='view-div'></div>");
    $viewTop= $("<div class='view-content'></div>");
    $viewBottom = $("<div class='view-content'></div>");

    $viewReserve.append($viewTop, $viewBottom);

    const bottomHTML =
        "<button class='view-button view-focused'>Cancel</button>" +
        "<button class='view-button'>Remove</button>";
    $viewButton.append($(bottomHTML));

    /**
     * Top content:
     * Seat number, Lab number, student's profile
     */

    function test(seat, date, selected_lab, time_slot) {
        console.log(seat, date, selected_lab, time_slot);
    }


    /**
     * Bottom content:
     * If admin:
     *  Show delete button
     */
    if (/*user is admin*/ true) {}
});
