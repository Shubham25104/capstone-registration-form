document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

    // Validate date of birth
    if (!validateDOB(dob)) {
        alert('Date of birth must be for ages between 18 and 55.');
        return;
    }

    // Create a user object
    const user = { name, email, password, dob, termsAccepted };

    // Save user data to localStorage
    saveData(user);

    // Add user to the table immediately
    addToTable(user);

    // Clear form fields after submission
    document.getElementById('registrationForm').reset();
});

// Validate date of birth (18-55 years old)
function validateDOB(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18 && age <= 55;
}

// Save user data in localStorage
function saveData(user) {
    // Retrieve existing users from localStorage, or initialize an empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Add the new user to the array
    users.push(user);

    // Save the updated array back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
}

// Add a user entry to the table
function addToTable(user) {
    const table = document.querySelector('#dataTable tbody');
    const row = document.createElement('tr');

    // Create row with user data
    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.termsAccepted ? 'Yes' : 'No'}</td>
    `;

    // Append the row to the table
    table.appendChild(row);
}

// Load users from localStorage when the page loads
window.onload = function () {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Add each user to the table
    users.forEach(addToTable);
};
