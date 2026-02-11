function createAccount(){

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const pass = document.getElementById("pass").value;
  const deposit = document.getElementById("deposit").value;

  if(!name || !email || !phone || !pass || !deposit){
    alert("Fill all fields");
    return;
  }

  const user = {
    name: name,
    email: email,
    phone: phone,
    pass: pass,
    balance: deposit
  };

  localStorage.setItem("securoUser", JSON.stringify(user));

  alert("Securo Account Created Successfully ✨");
  window.location.href = "login.html";
}

function login(){

  const loginUser = document.getElementById("loginUser").value;
  const loginPass = document.getElementById("loginPass").value;

  const user = JSON.parse(localStorage.getItem("securoUser"));

  if(!user){
    alert("No account found. Create account first.");
    return;
  }

  if(loginUser === user.email && loginPass === user.pass){
    alert("Welcome to Securo Bank 🏦");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid Credentials ❌");
  }
}
