const usernameText = document.querySelector("#profile-username");
const gameCountText = document.querySelector("#profile-game-count");
const passwordText = document.querySelector("#profile-password");
const passwordToggle = document.querySelector("#password-toggle");

function getDisplayName() {
    return localStorage.getItem("username") || 
    sessionStorage.getItem("currentUser") ||
    "Guest";
}

function showPassword(visible) {
    const password = sessionStorage.getItem("currentPassword") || "";

    if (visible) {
        passwordText.textContent = password;
        passwordToggle.textContent = "Hide";
    }
    else {
        passwordText.textContent = "•".repeat(password.length);
        passwordToggle.textContent = "Show";
    }

    passwordToggle.setAttribute("aria-pressed", String(visible));
}

function togglePassword() {
    const isVisible = passwordToggle.getAttribute("aria-pressed") === "true";
    showPassword(!isVisible);
}

function showProfile () {
    usernameText.textContent = getDisplayName();
    gameCountText.textContent = loadCollection().length;
}

passwordToggle.addEventListener("click", togglePassword);

showProfile();