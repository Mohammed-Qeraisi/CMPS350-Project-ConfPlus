const loginBtn = document.querySelector("#login-button");
const isLoggedIn = sessionStorage.getItem("isLoggedIn");
const mainNav = document.querySelector("#main-nav")

if (isLoggedIn) {
  loginBtn.textContent = "Logout";
  loginBtn.addEventListener("click", () => {
    if (confirm(`Are you sure you want LogOut ?`)) {
      sessionStorage.removeItem("isLoggedIn");
      location.reload();
    }
  });
} else {
  loginBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}
