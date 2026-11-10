function applyTheme(theme) {
    if (theme === "Dark") {
        document.body.classList.add("dark-theme");
    }
    else {
        document.body.classList.remove("dark-theme")
    }
}

applyTheme(localStorage.getItem("theme") || "Light")