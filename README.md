# Securo Bank — Backend Integration Guide

## 1️⃣ Overview

- **Frontend:** HTML/CSS/JS (currently uses `localStorage`)  
- **Backend:** Java Servlets + Database (MySQL/PostgreSQL recommended)  
- **Goal:** Replace `localStorage` logic with **real API calls to servlets**.  
- **Structure:** All HTML/JS files are in the root directory. Only `assets/` folder exists.

---

## 2️⃣ Required Servlets

| Servlet Name | HTTP Method | Frontend Action | Description |
|--------------|------------|----------------|------------|
| `CreateAccountServlet` | POST | create-account.html | Receives `{name, email, password, balance}`; stores user in DB |
| `LoginServlet` | POST | login.html | Validates credentials, returns `{success, userId, token}` |
| `BalanceServlet` | GET | balance.html | Returns current balance for logged-in user |
| `TransferServlet` | POST | transfer.html | Moves money between users, updates transactions |
| `TransactionServlet` | GET | transactions.html | Returns transaction history for logged-in user |
| `IPOServlet` | POST | ipo.html | Deducts money, adds IPO shares to user account |
| `LoanServlet` | POST | loan.html | Creates loan record, validates eligibility |
| `ProfileServlet` | GET/PUT | profile.html | Get/update profile info including profile picture |
| `LogoutServlet` | POST | dashboard.html | Invalidates user session / token |

---

## 3️⃣ Frontend Replacements

### **create-account.html**
Replace localStorage logic with:

```js
fetch("/CreateAccountServlet", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({ name, email, password, balance: deposit })
})
.then(res => res.json())
.then(data => {
  if(data.success){
    alert("Account created!");
    window.location.href = "login.html";
  } else {
    alert(data.message);
  }
});


login.html
Replace localStorage login check with:

fetch("/LoginServlet", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({email, password})
})
.then(res => res.json())
.then(data => {
  if(data.success){
    sessionStorage.setItem("securoToken", data.token);
    window.location.href = "dashboard.html";
  } else {
    alert(data.message);
  }
});


balance.html
const token = sessionStorage.getItem("securoToken");
fetch("/BalanceServlet", {
  headers: { "Authorization": "Bearer " + token }
})
.then(res => res.json())
.then(data => {
  document.getElementById("balanceAmount").innerText = "₹ " + data.balance.toFixed(2);
});


transfer.html
fetch("/TransferServlet", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  },
  body: JSON.stringify({toUser: toEmail, amount: amount})
})
.then(res => res.json())
.then(data => {
  if(data.success){
    alert("Transfer successful");
    window.location.href = "balance.html";
  } else {
    alert(data.message);
  }
});

transactions.html
fetch("/TransactionServlet", {
  headers: { "Authorization": "Bearer " + token }
})
.then(res => res.json())
.then(data => {
  renderTransactions(data.transactions);
});


ipo.html
fetch("/IPOServlet", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  },
  body: JSON.stringify({shares: numberOfShares})
})
.then(res => res.json())
.then(data => {
  if(data.success){
    alert("IPO purchased! New balance: ₹" + data.newBalance);
    document.getElementById("balanceAmount").innerText = "₹ " + data.newBalance.toFixed(2);
  } else {
    alert(data.message);
  }
});


loan.html
fetch("/LoanServlet", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  },
  body: JSON.stringify({amount: loanAmount})
})
.then(res => res.json())
.then(data => {
  if(data.success){
    alert("Loan approved! Details sent to your account.");
  } else {
    alert(data.message);
  }
});

profile.html
const formData = new FormData();
formData.append("profileImage", imageFile);

fetch("/ProfileServlet", {
  method: "PUT",
  headers: { "Authorization": "Bearer " + token },
  body: formData
})
.then(res => res.json())
.then(data => {
  if(data.success) alert("Profile updated!");
});

dashboard.html--Logout
function doLogout(){
  const token = sessionStorage.getItem("securoToken");
  fetch("/LogoutServlet", {
    method: "POST",
    headers: { "Authorization": "Bearer " + token }
  }).then(() => {
    sessionStorage.removeItem("securoToken");
    window.location.href = "login.html";
  });
}

