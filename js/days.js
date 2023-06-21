const daysContainer = document.querySelectorAll(".days-container");

daysContainer.forEach(function(container, index, array) {
    for (let i = 1; i <= 7; i++) {
        const dayItem = document.createElement("div");
        const id = "lab-" + (index + 1) + "-day-" + i + "-slots";
        const dayLabel = document.createElement("p");
        const slotList = document.createElement("ul");
        const slotListItem = [];

        dayItem.classList.add("days");
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
