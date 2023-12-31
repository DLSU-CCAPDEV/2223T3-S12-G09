const lab = document.querySelector("#lab-container");
const seatNum = 5;

class Seat {
    constructor(idx, lab, div) {
        this.idx = idx;
        this.lab = lab;
        this.div = div;
    }
}

const seatArray = [];

for (var labIdx = 0; labIdx < 3; labIdx++) {
    const labItem = document.createElement("div");
    lab.appendChild(labItem);
    labItem.classList.add("lab-item");

    const h2 = document.createElement("h2");
    labItem.appendChild(h2);
    h2.id = "lab-" + (labIdx + 1);
    h2.innerText = "Lab " + (labIdx + 1);

    const availCounter = document.createElement("div");
    labItem.appendChild(availCounter);
    availCounter.classList.add("avail-container");

    // date
    const dateTime = document.createElement("input");
    availCounter.appendChild(dateTime);
    // dateTime.setAttribute("step", 1800);
    dateTime.type = "datetime-local";
    dateTime.step = 1800; // 30 minutes * 60 seconds = 1800 s

    // view button
    const viewButton = document.createElement("button");
    availCounter.appendChild(viewButton);
    viewButton.classList.add("view");
    viewButton.innerText = "View";

    // seats-list
    const seatsList = document.createElement("div");
    availCounter.appendChild(seatsList);
    seatsList.classList.add("seats-list");

    // const reserveButtonList = [];
    const formSeat = document.createElement("form");
    seatsList.appendChild(formSeat);
    formSeat.id = "lab-" + (labIdx + 1) + "-form";

    for (var seatIdx = 0; seatIdx < seatNum; seatIdx++) {
        const seatDiv = document.createElement("div");
        formSeat.appendChild(seatDiv);
        seatDiv.style.display = "flex";
        seatDiv.style.alignItems = "center";

        const selectRadio = document.createElement("input");
        seatDiv.appendChild(selectRadio);
        selectRadio.type = "radio";
        selectRadio.id = "lab-" + labIdx + "-seat-" + seatIdx + "-radio";
        selectRadio.value = seatIdx + 1;
        // selectRadio.name = "lab-" + labIdx + "-radio";
        selectRadio.name = "lab-radio";

        const seatStatus = document.createElement("div");
        seatStatus.classList.add("seats-status");
        seatDiv.appendChild(seatStatus);

        const seatLabel = document.createElement("label");
        seatDiv.appendChild(seatLabel);
        seatLabel.htmlFor = selectRadio.id;

        const seatsH2 = document.createElement("h2");
        seatLabel.appendChild(seatsH2);
        seatsH2.appendChild(document.createTextNode("Seat " + (seatIdx + 1)));
        // reserveButtonList.push(reserveButton);
    }

    const reserveButton = document.createElement("button");
    availCounter.appendChild(reserveButton);
    reserveButton.classList.add("reserve-button");
    reserveButton.innerText = "Reserve";
    reserveButton.id = "lab-" + (labIdx + 1) + "-seat-" + (seatIdx + 1);

    reserveButton.addEventListener("click", function() { showReserve(formSeat, labIdx) });
}
