document.getElementById("registerForm").addEventListener("submit", function(e) {

        e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Validation
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Please fill all fields!");
        return;
    }

    // Email format check
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Enter a valid email!");
        return;
    }

    // Password length
    if (password.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
    }

    // Password match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Success
    alert("Registration successful!");

    // Redirect to login
    window.location.href = "login.html";
});