function createAccount(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let deposit = parseFloat(document.getElementById("deposit").value);

    if(!name || !email || !password || isNaN(deposit)){
        alert("Please fill all fields correctly!");
        return;
    }

    let user = { name, email, password, balance: deposit, transactions: [] };
    localStorage.setItem("securoUser", JSON.stringify(user));

    alert("Account created successfully!");
    window.location.href = "login.html";
}
