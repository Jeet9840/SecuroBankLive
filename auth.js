function createAccount(){
let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;
let deposit = parseFloat(document.getElementById("deposit").value);

  if(!name || !email || !phone || !pass || !deposit){
    alert("Fill all fields");
    return;
  }

  let user = {
  name: name,
  email: email,
  password: password,
  balance: deposit,
  transactions: []
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

function logoutUser(){
  localStorage.removeItem("securoSession");
  localStorage.removeItem("securoUser");
  window.location.href = "login.html";
}

