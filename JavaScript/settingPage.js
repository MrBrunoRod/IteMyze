const settingsForm = document.querySelector("#settings-section form");

const usernameInput = document.querySelector("#user-name");
const emailInput = document.querySelector("#email");

// Load the saved values when the page opens
usernameInput.value = localStorage.getItem("username") || "";
emailInput.value = localStorage.getItem("email") || "";

// Save the values when the form is submitted
settingsForm.addEventListener("submit", function (event) {
  event.preventDefault();

  localStorage.setItem("username", usernameInput.value);
  localStorage.setItem("email", emailInput.value);

  alert("Settings saved!");
});
