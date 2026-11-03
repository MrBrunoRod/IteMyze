const verifiedAccounts = [
  { userName: "Bruno123", password: "bgr5135" },
  { userName: "Josmar321", password: "joa5468" },
];

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("user-name");
  const passwordInput = document.getElementById("user-password");

  const validAccount = verifiedAccounts.some((account) => {
    return account.userName === nameInput.value && account.password === passwordInput.value;
  });

  if (validAccount) {
    window.location.href = "HTML/homePage.html";
  } else {
    alert("Invalid username or password. Try again.")
  }
});