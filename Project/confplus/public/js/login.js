import usersRepo from "../repository/users-repo.js";

const loginForm = document.querySelector("#form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const eyeIcon = document.querySelector("#eye");

loginForm.addEventListener("submit", login);

async function login(event) {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    const user = await usersRepo.getUser(email, password);

    if (user.errorMessage) {
        alert("Invalid email or password. Please try again.");
    } else {
        window.location.href = "home.html";
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem(
            "CurrentUser",
            JSON.stringify({ userRole: user.role, userID: user.userID })
        );
    }
}

eyeIcon.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";

    passwordInput.type = type;

    if (type === "password") {
        eyeIcon.name = "eye-outline";
    } else {
        eyeIcon.name = "eye-off-outline";
    }
});
