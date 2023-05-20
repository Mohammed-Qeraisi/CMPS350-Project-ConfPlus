const loginBtn = document.querySelector("#login-button");
const mainNav = document.querySelector(".main-nav");
const isLoggedIn = sessionStorage.getItem("isLoggedIn");
const CurrentUser = JSON.parse(sessionStorage.getItem("CurrentUser"));

if (isLoggedIn) {
    loginBtn.textContent = "Logout";
    addNav();
    loginBtn.addEventListener("click", () => {
        if (confirm(`Are you sure you want LogOut ?`)) {
            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("CurrentUser");
            window.location.href = "home.html";
        }
    });
} else {
    loginBtn.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}

function addNav() {
  const userRole = CurrentUser.userRole;

  let newNavLinks = '';

  if (userRole === "organizer") {
      newNavLinks += `<li><a href="schedule-editor.html">Edit Schedule</a></li>`;
  } else if (userRole === "reviewer") {
      newNavLinks += `<li><a href="review.html">Review Papers</a></li>`;
  } else {
      newNavLinks += `<li><a href="dashboard.html">Dashboard</a></li>`;
      newNavLinks += `<li><a href="submitPaper.html">Submit Paper</a></li>`;
  }

  mainNav.querySelector("ul").insertAdjacentHTML("afterbegin", newNavLinks);
}

function handleFooterNav(page) {
    switch (page) {
        case "team":
            window.location.href = "home.html";
            break;
        case "about":
            window.location.href = "about.html";
            break;
        case "schedue":
            window.location.href = "schedule.html";
            break;
    }
}
