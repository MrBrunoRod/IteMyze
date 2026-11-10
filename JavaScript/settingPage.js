const settingsForm = document.querySelector("#settings-section form");

const usernameInput = document.querySelector("#user-name");
const passwordInput = document.querySelector("#password");

// Load the saved values when the page opens
usernameInput.value = localStorage.getItem("username") || "";
passwordInput.value = localStorage.getItem("password") || "";

// Save the values when the form is submitted
settingsForm.addEventListener("submit", function (event) {
  event.preventDefault();

  localStorage.setItem("username", usernameInput.value);
  localStorage.setItem("password", passwordInput.value);

  alert("Settings saved!");
});
