document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "") {
        alert("Please enter username");
        return;
    }
    if (password === "") {
        alert("Please enter Password");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
    }

    // If valid
    alert("Login successful!");

    // Redirect to inventory page
    window.location.href = "inventory.html";
});