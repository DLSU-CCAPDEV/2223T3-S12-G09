const reserveDiv = document.querySelector("#reserve-container");
const reserveH1 = document.createElement("h1");
const seatH1 = document.createElement("span");
const labH1 = document.createElement("span");

reserveDiv.appendChild(reserveH1);
reserveH1.appendChild(document.createTextNode("Reserve seat "));
reserveH1.appendChild(seatH1);
reserveH1.appendChild(document.createTextNode(" at Lab "));
reserveH1.appendChild(labH1);

reserveDiv.style.display = "none";

seatH1.id = "chosen-seat";
labH1.id = "chosen-lab";

// function test(obj) {
//     alert(obj.idx + ", " + obj.lab);
//     reserveDiv.style.display = "block";
//     seatH1.innerText = obj.idx;
//     labH1.innerText = obj.lab;
// }

// function test(labIdx, seatIdx) {
//     alert(labIdx + ", " + seatIdx);
//     reserveDiv.style.display = "block";
//     seatH1.innerText = seatIdx;
//     labH1.innerText = labIdx;
// }

// function test(obj) {
//     alert(obj.idx);
//     obj.style.backgroundColor = "red";
//     reserveDiv.style.display = "block";
//     seatH1.innerText = seatIdx;
//     labH1.innerText = labIdx;
// }
function showReserve(labform) {
    const radioForm = labform["lab-radio"];
    const radioValue = radioForm.value;

    alert(radioValue);
    console.log(radioValue);

    reserveDiv.style.display = "block";

    const labIdx = labform.id.substr(4, 1);
    labH1.innerText = labIdx;

    seatH1.innerText = radioValue;
}
