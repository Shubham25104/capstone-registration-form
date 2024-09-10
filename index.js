document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

    if (!validateDOB(dob)) {
        alert('Date of birth must be for ages between 18 and 55.');
        return;
    }

    const user = { name, email, password, dob, termsAccepted };
    saveData(user);
    addToTable(user);
});

function validateDOB(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18 && age <= 55;
}

function saveData(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function addToTable(user) {
    const table = document.querySelector('#dataTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${user.name}</td><td>${user.email}</td><td>${user.password}</td><td>${user.dob}</td><td>${user.termsAccepted ? 'Yes' : 'No'}</td>`;
    table.appendChild(row);
}

window.onload = function () {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(addToTable);
};
