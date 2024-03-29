function fetchDataFromDatabase() {
    // Example data from the database
    return [
        { coffee: "Espresso", frequency: "Daily", duration: "10 minutes", status: "Active" },
        { coffee: "Latte", frequency: "Weekly", duration: "20 minutes", status: "Inactive" }
        // Add more entries as needed
    ];
}

function editRow(button) {
    let row = button.parentNode.parentNode;
    let cells = row.getElementsByTagName("td");
    for (let i = 0; i < cells.length - 1; i++) {
        let cellText = cells[i].innerText;
        let dropdown = document.createElement("select");
        if (i == 0) {
            dropdown.innerHTML = `
                <option value="Cloud King Espresso">Cloud King Espresso</option>
                <option value="Durable Solution">Durable Solution</option>
                <option value="Seasonal Single Origin: African">Seasonal Single Origin: African</option>
                <option value="Seasonal Single Origin: Latin American"> Seasonal Single Origin: Latin American</option>
                <option value="Decaf">Decaf</option>
                <option value="Roasters Choice">Roasters Choice</option>
            `;
        }
        if (i == 1) {
            dropdown.innerHTML = `
                <option value="2 Weeks">2 Weeks</option>
                <option value="4 Weeks">4 Weeks</option>
            `;
        }
        if (i == 2) {
            dropdown.innerHTML = `
                <option value="Ongoing">Ongoing</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
            `;
        }
        if (i == 3) {
            dropdown.innerHTML = `
                <option value="Ongoing">Ongoing</option>
                <option value="Paused">Paused</option>
                <option value="Canceled">Canceled</option>
            `;
        }
        dropdown.value = cellText;
        dropdown.onchange = function () {
            cellText = dropdown.value;
        };
        cells[i].innerText = "";
        cells[i].appendChild(dropdown);
    }

    button.innerText = "Save";
    button.onclick = function () {
        saveRow(row);

    };
}

function saveRow(row) {
    let cells = row.getElementsByTagName("td");
    for (let i = 0; i < cells.length - 1; i++) {
        let dropdown = cells[i].getElementsByTagName("select")[0];
        cells[i].innerText = dropdown.value;
    }

    let button = cells[cells.length - 1].getElementsByTagName("button")[0];
    button.innerText = "Edit";
    button.onclick = function () {
        editRow(button);
    };
}

function populateTable() {
    let table = document.getElementById("coffee-table");
    let data = fetchDataFromDatabase();

    data.forEach(entry => {
        let newRow = table.insertRow(-1);
        let coffeeCell = newRow.insertCell(0);
        let frequencyCell = newRow.insertCell(1);
        let durationCell = newRow.insertCell(2);
        let statusCell = newRow.insertCell(3);
        let editCell = newRow.insertCell(4);

        coffeeCell.innerText = entry.coffee;
        frequencyCell.innerText = entry.frequency;
        durationCell.innerText = entry.duration;
        statusCell.innerText = entry.status;

        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.className = "edit-button";
        editButton.onclick = function () {
            editRow(editButton)
        };

        editCell.appendChild(editButton);
    });
}

populateTable();
