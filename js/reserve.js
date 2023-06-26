const reserveDiv = document.querySelector("#reserve-container");
const reserveH1 = document.createElement("h1");
const seatH1 = document.createElement("span");
const labH1 = document.createElement("span");

// reserveDiv.appendChild(reserveH1);
reserveH1.appendChild(document.createTextNode("Reserve Seat "));
reserveH1.appendChild(seatH1);
reserveH1.appendChild(document.createTextNode(" at Lab "));
reserveH1.appendChild(labH1);

const reserveForm = document.createElement("form");
reserveDiv.appendChild(reserveForm);



// reserveDiv.style.display = "none";

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
}
