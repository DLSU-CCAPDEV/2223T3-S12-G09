const daysContainer = document.querySelectorAll(".days-container");

daysContainer.forEach(function(container, index, array) {
    const formSlot = document.createElement("form");
    const dateSlot = document.createElement("input");

    formSlot.classList.add("form-slot");
    formSlot.name = "filter-slot";
    formSlot.appendChild(dateSlot);

    dateSlot.type = "date";
    container.appendChild(formSlot);

    const dayItem = document.createElement("div");
    dayItem.classList.add("slot-grid");


    for (let i = 1; i <= 7; i++) {
        const id = "lab-" + (index + 1) + "-day-" + i + "-slots";
        const dayLabel = document.createElement("p");
        const slotList = document.createElement("ul");
        const slotListItem = [];



        dayItem.id = id;
        dayLabel.innerText = "Day " + i;

        for (let j = 1; j <= 7; j++) {
            slotListItem.push(document.createElement("li"));
            slotListItem[j - 1].innerText = "Slot " + j;
            slotList.appendChild(slotListItem[j - 1]);
        }

        dayItem.appendChild(dayLabel);
        dayItem.appendChild(slotList);
        container.appendChild(dayItem);
    }
});

function updateGrid() {

}
