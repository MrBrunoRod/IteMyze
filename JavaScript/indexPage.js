const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("user-name");
  const passwordInput = document.getElementById("user-password");

  try {
    const response = await fetch("data/users.json");

    if (!response.ok) {
      throw new Error("Unable to load verified accounts");
    }

    const verifiedAccounts = await response.json();

    const validAccount = verifiedAccounts.some((account) => {
      return account.userName === nameInput.value &&
             account.password === passwordInput.value;
    });

    if (validAccount) {
      sessionStorage.setItem("currentUser", nameInput.value);
      sessionStorage.setItem("currentPassword", passwordInput.value);
      window.location.href = "HTML/homePage.html";
    } else {
      alert("Invalid username or password. Try again.");
    }
  } catch (error) {
    console.error(error);
    alert("Unable to verify your account. Try again.");
  }
});
