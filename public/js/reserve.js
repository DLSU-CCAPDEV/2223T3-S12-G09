const reserveDiv = document.querySelector("#reserve-container");
const reserveH1 = document.createElement("h1");
const seatH1 = document.createElement("span");
const labH1 = document.createElement("span");

reserveDiv.appendChild(reserveH1);
reserveH1.appendChild(document.createTextNode("Reserve Seat "));
reserveH1.appendChild(seatH1);
reserveH1.appendChild(document.createTextNode(" at Lab "));
reserveH1.appendChild(labH1);


const reserveForm = document.createElement("form");
reserveDiv.appendChild(reserveForm);

const fromLabel = document.createElement("label");
const fromTime = document.createElement("select");
const fromTimeSlots = [];
reserveForm.appendChild(fromLabel);
fromLabel.innerText = "From: ";
reserveForm.appendChild(fromTime);

const toLabel = document.createElement("label");
const toTime = document.createElement("select");
const toTimeSlots = [];
reserveForm.appendChild(toLabel);
toLabel.innerText = "To: ";
reserveForm.appendChild(toTime);

fromTime.classList.add("time-select");
fromTime.id = "from-time";

toTime.classList.add("time-select");
toTime.id = "to-time";

const timeLists = document.querySelectorAll(".time-select");

// break line
reserveForm.appendChild(document.createElement("br"));

const reserveButton = document.createElement("input");
reserveForm.appendChild(reserveButton);
reserveButton.type = "button";
reserveButton.id = "reserve";
reserveButton.value = "Reserve slot";

function checkValidTimeRange() {
    const fromTime = document.getElementById("from-time");
    const toTime = document.getElementById("to-time");

    const fromValue = Number(fromTime.value);
    const toValue = Number(toTime.value);

    console.log(fromValue);
    console.log(toValue);

    if (fromValue > toValue) {
        toTime.value = fromTime.value;
    }

    reserveForm.reset();
    console.log("hello");
}

timeLists.forEach(function(timeListElement, index, array) {
    console.log(timeListElement);
    timeListElement.addEventListener("change", checkValidTimeRange);

    for (var i = 7; i < 21; i++) {
        // console.log(i);

        var hour = i;
        var hourOutput = hour;
        var amPM = "am";
        if (hour > 11) {
            amPM = "pm";

            if (hour > 12)
                hourOutput -= 12;
        }
        for (var j = 0; j < 2; j++) {
            const option = document.createElement("option");
            const minute = j * 30;
            var minuteOutput;

            option.value = hour + "" + minuteOutput;

            if (minute < 9) {
                minuteOutput = "0" + minute;
            }
            else {
                minuteOutput = minute;
            }

            const output = hourOutput + ":" + minuteOutput + amPM;


            timeListElement.appendChild(option);
            option.appendChild(document.createTextNode(output));

            option.value = hour + "" + minuteOutput;
        }
    }
});


reserveDiv.style.display = "none";

console.log("after none");

seatH1.id = "chosen-seat";
labH1.id = "chosen-lab";

function showReserve(labform) {
    const radioForm = labform["lab-radio"];
    const radioValue = radioForm.value;

    if (radioValue == "")
        return;

    // alert(radioValue);
    // console.log(radioValue);

    reserveDiv.style.display = "block";

    const labIdx = labform.id.substr(4, 1);
    labH1.innerText = labIdx;

    seatH1.innerText = radioValue;
    reserveForm.reset();
}

const list = document.querySelectorAll(".crap-time");
// console.log(list);

list.forEach(function(listElement, index, array) {
    listElement.addEventListener("change", checkValidTimeRange);
    listUp(listElement);
});

function checkValidTimeRange() {
    const fromTime = document.getElementById("from-time");
    const toTime = document.getElementById("to-time");

    const fromValue = Number(fromTime.value);
    const toValue = Number(toTime.value);

    console.log(fromValue);
    console.log(toValue);

    if (fromValue > toValue) {
        toTime.value = fromTime.value;
    }
}

function test() {
    const fromTime = document.getElementById("from-time");
    const toTime = document.getElementById("to-time");
    fromTime.value = toTime.value;
}

function listUp(listItem) {
    for (var i = 7; i < 21; i++) {
        console.log(i);
        var hour = i;
        var hourOutput = hour;
        var amPM = "am";
        if (hour > 11) {
            amPM = "pm";

            if (hour > 12)
                hourOutput -= 12;
        }
        for (var j = 0; j < 2; j++) {
            const option = document.createElement("option");
            const minute = j * 30;
            var minuteOutput;

            option.value = hour + "" + minuteOutput;

            if (minute < 9) {
                minuteOutput = "0" + minute;
            }
            else {
                minuteOutput = minute;
            }

            const output = hourOutput + ":" + minuteOutput + amPM;


            listItem.appendChild(option);
            option.appendChild(document.createTextNode(output));

            option.value = hour + "" + minuteOutput;
        }
    }
}
