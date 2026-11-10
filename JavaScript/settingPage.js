const settingsForm = document.querySelector("#settings-section form");
const usernameInput = document.querySelector("#user-name");
const themeSelect = document.querySelector("#theme");
const statusMessage = document.querySelector("#settings-message");

function loadSettings() {
  // Load the saved values when the page opens
  usernameInput.value = localStorage.getItem("username") || "";
  themeSelect.value = localStorage.getItem("theme") || "Light";
}

// Save the values when the form is submitted
function saveSettings(event) {
  event.preventDefault();

  const username = usernameInput.value.trim();

  if (username === "") {
    localStorage.removeItem("username");
  }
  else {
    localStorage.setItem("username", username);
  }

  localStorage.setItem("theme", themeSelect.value);
  applyTheme(themeSelect.value);

  statusMessage.textContent = "Settings saved!"
}

loadSettings();
settingsForm.addEventListener("submit", saveSettings);