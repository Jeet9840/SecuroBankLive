/* =========================
   SECURO CORE SYSTEM
========================= */

const DB_KEY = "securoUser";

/* -------- MEMORY -------- */
function getUser(){
  return JSON.parse(localStorage.getItem(DB_KEY));
}

function setUser(user){
  localStorage.setItem(DB_KEY, JSON.stringify(user));
}

function clearUser(){
  localStorage.removeItem(DB_KEY);
}

/* -------- AUTH -------- */
function requireAuth(){
  if(!getUser()){
    window.location.href = "login.html";
  }
}

/* -------- ACCOUNT -------- */
function createAccount(name,email,password){
  const user = {
    name,
    email,
    password,
    accountNo: "SEC" + Math.floor(100000 + Math.random()*900000),
    balance: 10000,
    transactions: [],
    profilePic: "",
    created: new Date().toISOString()
  };
  setUser(user);
  return user;
}

/* -------- LOGIN -------- */
function login(email,password){
  const user = getUser();
  if(!user) return false;
  if(user.email === email && user.password === password){
    return true;
  }
  return false;
}

/* -------- TRANSACTIONS -------- */
function addTransaction(type, amount, note){
  const user = getUser();
  user.transactions.unshift({
    id: "TX" + Date.now(),
    type,
    amount,
    note,
    date: new Date().toLocaleString()
  });
  setUser(user);
}

/* -------- BANK OPS -------- */
function credit(amount, note="Credit"){
  const user = getUser();
  user.balance += amount;
  addTransaction("Credit", amount, note);
  setUser(user);
}

function debit(amount, note="Debit"){
  const user = getUser();
  user.balance -= amount;
  addTransaction("Debit", amount, note);
  setUser(user);
}

function transfer(amount, toAccount){
  const user = getUser();
  if(user.balance < amount){
    return false;
  }
  user.balance -= amount;
  addTransaction("Transfer", amount, "To " + toAccount);
  setUser(user);
  return true;
}

/* -------- PROFILE -------- */
function updateProfilePic(img){
  const user = getUser();
  user.profilePic = img;
  setUser(user);
}


