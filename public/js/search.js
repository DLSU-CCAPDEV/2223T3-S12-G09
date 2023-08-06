$(document).ready(function(event) {
    $("#user-form").submit(function(event) {
        const name = $("#user-text").val();

        if ($(this).css("display") == "none") {
            alert("Bro. It's hidden")
            return;
        }

        preventEmpty(() => name == "", event);
    });

    $("#reservation-form").submit(function(event) {
        const dateReserved = $("#date-reserved").val();
        const reservationDate = $("#reservation-date").val();
        const user = $("#user-reservation").val();

        if ($(this).css("display") == "none") {
            alert("Bro. It's hidden")
            return;
        }

        preventEmpty(() =>
             (dateReserved == "" &&
             reservationDate == "" &&
             user == "")
        , event);
    });
});

function open_form(evt, form_name) {
    const formID = "#" + form_name;

    $(".tabcontent").hide();

    $(".tab button").removeClass("active");

    $(formID).show();
    $(evt.currentTarget).addClass("active");
}

function preventEmpty(condition, event) {
    if (condition()) {
        alert("Why so empty???");
        event.preventDefault();
    }
}
