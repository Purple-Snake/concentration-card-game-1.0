"use strict";

const usersApiEndpoint = "http://localhost:3000/api/users";

// sign in
const form = document.querySelector(".sign-in-form");
const email = document.getElementById("floatingEmail");
const signInUserName = document.getElementById("floatingUsername-sign-in");
const signInPassword = document.getElementById("floatingPassword-sign-in");

// log in
const logInForm = document.querySelector(".log-in-form");
const logInUserName = document.getElementById("floatingUsername-log-in");
const logInPassword = document.getElementById("floatingPassword-log-in");

const showPasswordCheckboxSignIn = document.getElementById(
  "show-password-sign-in"
);
const showPasswordCheckboxLogIn = document.getElementById(
  "show-password-log-in"
);
const message = document.getElementById("error-message");
// const userNameHeader = document.getElementById("user-name");
const loginMessage = document.getElementById("login-message");

function loginUser(endpoint, dataObject) {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(dataObject),
    credentials: "include",
  };

  fetch(endpoint, options)
    .then((response) => response.text())
    .then((data) => {
      const dataArray = data.split(".")
      
      sessionStorage.setItem("userName", dataArray[0]);
      sessionStorage.setItem("highScore", dataArray[1])
      window.location.href = "http://127.0.0.1:5500/frontend/index.html";
    })
    .catch((err) => {
      alert(err);
    });
}

function registerUser(endpoint, userData) {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  fetch(endpoint, options)
    .then((response) => response.json())
    .then((data) => (message.innerHTML = data.message))
    .catch((err) => {
      alert(err);
    });
}

function logOutUser(endpoint) {
  fetch(endpoint, {
    credentials: "include",
  })
    .then((response) => response.text())
    .then((data) => {
      localStorage.clear();
      loginMessage.innerHTML = data;
    })
    .catch((err) => {
      alert(err);
    });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let regist = {
    email: email.value,
    userName: signInUserName.value,
    password: signInPassword.value,
  };

  registerUser(usersApiEndpoint, regist);
});

logInForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let login = {
    userName: logInUserName.value,
    password: logInPassword.value,
  };

  loginUser(usersApiEndpoint + "/login", login);
});

function togglePasswordVisibility() {
  if (showPasswordCheckboxSignIn.checked) {
    signInPassword.type = "text";
  } else {
    signInPassword.type = "password";
  }
  if (showPasswordCheckboxLogIn.checked) {
    logInPassword.type = "text";
  } else {
    logInPassword.type = "password";
  }
}
