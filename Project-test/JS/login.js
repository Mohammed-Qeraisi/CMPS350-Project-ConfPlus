const loginForm = document.querySelector("#form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const eyeIcon = document.querySelector("#eye");

loginForm.addEventListener("submit", login);

async function login(event) {
  event.preventDefault();

  const users = await fetchUsers();

  console.log(passwordInput.type);

  const user = users.find(
    (user) =>
      user.email === emailInput.value && user.password === passwordInput.value
  );

  if (user) {
    window.location.href = "/HTML/index.html";
  } else {
    alert("Invalid email or password. Please try again.");
  }
}

async function fetchUsers() {
  const response = await fetch("/JSON/users.json");
  const data = await response.json();
  return data;
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
