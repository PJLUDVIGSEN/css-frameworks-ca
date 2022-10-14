import { register } from "../api/auth/register.mjs";

export function registerFormListener() {
  const form = document.querySelector(".regForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());
    register(profile);
  });
}
