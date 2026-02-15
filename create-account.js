function createAccountHandler() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let deposit = parseFloat(document.getElementById("deposit").value);

    if (!name || !email || !password || isNaN(deposit) || deposit < 0) {
        alert("Please fill all fields correctly!");
        return;
    }

    // This calls the REAL banking logic from core.js
    createAccount(name, email, password, deposit);

    alert("Account created successfully!");
    window.location.href = "login.html";
}
