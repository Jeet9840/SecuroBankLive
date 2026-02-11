function doLogin() {
    const emailInput = document.getElementById("email").value.trim();
    const passwordInput = document.getElementById("password").value;

    const storedUser = localStorage.getItem("securoUser");

    if (!storedUser) {
        alert("No account found. Please create an account first!");
        return;
    }

    const user = JSON.parse(storedUser);

    if (user.email === emailInput && user.password === passwordInput) {
        localStorage.setItem("loggedInUser", emailInput); // optional
        alert(`Welcome back, ${user.name}!`);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials. Please check your email and password!");
    }
}

function doLogin() {
    const emailInput = document.getElementById("loginUser").value.trim();
    const passwordInput = document.getElementById("loginPass").value;

    const storedUser = localStorage.getItem("securoUser");

    if (!storedUser) {
        alert("No account found. Please create an account first!");
        return;
    }

    const user = JSON.parse(storedUser);

    if (user.email === emailInput && user.password === passwordInput) {
        localStorage.setItem("loggedInUser", emailInput); // optional
        alert(`Welcome back, ${user.name}!`);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials. Please check your email and password!");
    }
}
