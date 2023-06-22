const containers = document.querySelectorAll(".seats-container");
const numOfSeats = 5;
console.log("test");

// const date = document.createElement("input");
// container.appendChild(date);
// date.type = "date";
//
// const submit = document.createElement("button");
// container.appendChild(submit);
// submit.type = "submit";

function dateElement() {
    const days = [];
    // document.createElement("input")
    for (var i = 0; i < 7; i++) {
        days.push(document.createElement("input"));

        days[i].type = "radio";
        days[i].name = "slot-day-radio";
        days[i].classList.add("top-div-items");

    }
    return days;
}

containers.forEach(function(container, index, array) {
    const topDiv = document.createElement("div");
    container.appendChild(topDiv);
    topDiv.classList.add("top-div");

    // const date = document.createElement("input");
    // date.type = "date";
    // date.name = "slot-date";
    // date.classList.add("top-div-items");
    // topDiv.appendChild(date);
    // topDiv.appendChild(daysRowElement());

    // topDiv.appendChild(document.createElement("br"));

    const days = [];
    const textDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]

    // document.createElement("input")
    for (var i = 0; i < 7; i++) {
        const labelDays = document.createElement("label");
        days.push(document.createElement("input"));
        topDiv.appendChild(days[i]);
        topDiv.appendChild(labelDays);

        days[i].id = "days-radio-" + (i + 1);
        days[i].type = "radio";
        days[i].name = "slot-day-radio";
        days[i].classList.add("top-div-items");

        // labelDays.innerText = textDays[i];
        if (i == 0) {
            labelDays.innerText = "Today";
        }
        else {
            labelDays.innerText = "Day " + (i + 1);
        }
        labelDays.htmlFor = days[i].id;
    }

    const reserve = document.createElement("button");
    topDiv.appendChild(reserve);
    reserve.classList.add("top-div-items");
    reserve.innerText = "Reserve";

    const bottomDiv = document.createElement("div");
    container.appendChild(bottomDiv);
    bottomDiv.classList.add("bottom-div");

    for (var i = 0; i < numOfSeats; i++) {
        const labSeat = document.createElement("div");
        bottomDiv.appendChild(labSeat);
        labSeat.classList.add("lab-seat");
        labSeat.id = "seat-" + (i + 1) + "-lab-" + (index + 1);

        const h2 = document.createElement("h2");
        labSeat.appendChild(h2);
        h2.innerText = "Seat " + (i + 1);

        const p = document.createElement("p");
        labSeat.appendChild(p);
        p.appendChild(document.createTextNode("STATUS: "));

        const status = document.createElement("span");
        p.appendChild(status);
        status.innerText = "AVAILABLE";
        status.classList.add("status");
        status.id = "seat-" + (i + 1) + "-lab-" + (index + 1) + "-status";

        const slotDiv = document.createElement("div");
        labSeat.appendChild(slotDiv);

        let start_hour = 7,
            end_hour = 21;
        for (var j = 0, h = start_hour, half = false;
            h <= end_hour;
            j++, half = !half) {
            // const checkbox = document.createElement("input");
            // slotDiv.appendChild(checkbox);
            // checkbox.type = "checkbox";
            // checkbox.id = "seat-" + (i + 1) + "-lab-" + (index + 1) + "-time-" + (j + 1);
            const slotFlex = document.createElement("div");
            slotDiv.appendChild(slotFlex);
            slotFlex.style.display = "flex";
            slotFlex.style.flexDirection = "row";
            slotFlex.style.alignItems = "center";

            const iconStatus = document.createElement("div");
            iconStatus.style.display = "inline-block";
            iconStatus.style.width = "10px";
            iconStatus.style.height = "10px";
            iconStatus.style.backgroundColor = "lime";
            iconStatus.style.margin = "5px 10px";

            slotFlex.appendChild(iconStatus);

            const label = document.createElement("p");
            const labelLink = document.createElement("a");
            slotFlex.appendChild(labelLink);
            labelLink.appendChild(label);
            // label.htmlFor = checkbox.id;
            label.innerText = h + ":";

            labelLink.href = "#";

            if (half == true) {
                label.innerText += "30";
                h += 1;
            }
            else {
                label.innerText += "00";
            }

            // const br = document.createElement("br");
            // slotDiv.appendChild(br);
        }

    }

})
