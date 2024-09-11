const form = document.querySelector("#submit-form");
const table = document.querySelector("tbody");

function updateTable(){
    // Clear the table content before updating it
    table.innerHTML = "";

    let entries = JSON.parse(localStorage.getItem("user-entries")) || [];
    
    entries.forEach(element => {
        let entry = document.createElement("tr");
        table.appendChild(entry);
        
        let name_entry = document.createElement("td");
        name_entry.append(element.name);
        entry.appendChild(name_entry);

        let email_entry = document.createElement("td");
        email_entry.append(element.email);
        entry.appendChild(email_entry);

        let password = document.createElement("td");
        password.append(element.password);
        entry.appendChild(password);

        let date = document.createElement("td");
        date.append(element.dob);
        entry.appendChild(date);

        let checked  = document.createElement("td");
        checked.append(element.checked ? "true" : "false");
        entry.appendChild(checked);
    });
}

function handleSubmit(event) {
    event.preventDefault();
    
    let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];

    const name = document.querySelector("#name").value;
    const dob = document.querySelector("#dob").value;
    const password = document.querySelector("#password").value;
    const email = document.querySelector("#email").value;
    let checked = document.querySelector("#terms").checked;

    const data = {
        name,
        dob,
        password,
        email,
        checked
    };
    
    userEntries.push(data);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    
    updateTable(); // Update table after submission
}

form.addEventListener("submit", handleSubmit);

// Initialize entries from localStorage on page load
updateTable();

// Set max date for the Date of Birth input field
const dateInput = document.querySelector("#dob");
const today = new Date();
const formattedMax = today.getFullYear()-18 + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0');
const formattedMin = today.getFullYear()-55 + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0');
dateInput.max = formattedMax;
dateInput.min = formattedMin;

console.log(typeof(dateInput.max));  // Outputs string
console.log(dateInput.value);  // Check current date value
