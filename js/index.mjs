import { registerFormListener } from "./handlers/registeruser.mjs";
import { loginFormListener } from "./handlers/login.mjs";
import { removePost } from "./api/posts/delete.mjs";
import * as post from "./api/posts/index.mjs";

const signupBtn = document.querySelector("#signupBtn");
const loginBtn = document.querySelector("#loginBtn");
const regAdds = document.querySelectorAll(".reg");
const signupText = "Sign-up";
const loginText = "Login";
const passwordWarning = document.querySelector(".passwordCheck");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#passwordConfirm");
const name = document.querySelector("#name");
const reqGroup = document.querySelectorAll(".req");

// Show signupForm and change buttonText to fit behaviour
signupBtn.addEventListener("click", function regForm() {
  regAdds.forEach((element) => {
    element.classList.toggle("hidden");
  });
  if (signupBtn.textContent.toLowerCase().includes(signupText.toLowerCase())) {
    signupBtn.textContent = "Already Registered?";
    loginBtn.textContent = "Create Account";
    document.getElementById("name").required = true;
    document.getElementById("passwordConfirm").required = true;
  } else {
    signupBtn.textContent = signupText;
    loginBtn.textContent = loginText;
    passwordWarning.classList.add("hidden");
    document.getElementById("name").required = false;
    document.getElementById("passwordConfirm").required = false;
  }
});

loginBtn.addEventListener("click", function formChanger() {
  if (loginBtn.textContent === loginText) {
    loginFormListener();
  } else if (
    loginBtn.textContent === "Create Account" &&
    checkPasswords() === true
  ) {
    registerFormListener();
  } else {
    passwordWarning.classList.remove("hidden");
    event.preventDefault();
  }
});

export function checkPasswords() {
  if (passwordConfirm.value === password.value) {
    return true;
  } else {
    return false;
  }
}
