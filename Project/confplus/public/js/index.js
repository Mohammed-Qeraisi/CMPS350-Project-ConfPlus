import papersRepo from "../repository/papers-repo.js";
import usersRepo from "../repository/users-repo.js";
import scheduleRepo from "../repository/schedule-repo.js";

const day1 = document.querySelector("#day1");
const day2 = document.querySelector("#day2");
let papersContainer = document.querySelector(".schedule-cards-container");

const organizerContainer = document.querySelector(".organizer-container");
const staffContainer = document.querySelector(".staff-container");
const CurrentUser = JSON.parse(sessionStorage.getItem("CurrentUser"));
// let papersByDay = {};
// let authorUsers = [];
let organizerUsers = [];
let staffUsers = [];
let sessions = [];
let papers = [];

const ctaButton = document.querySelector("#cta-button");

window.addEventListener("load", async () => {
  sessions = await scheduleRepo.getSchedule();
  papers = await papersRepo.getAcceptedPapers();
  //Changing CTA button in home
  if (!CurrentUser) {
    ctaButton.innerHTML = "View Schedule";
    changeCTALocation("schedule.html");
  } else {
    switch (CurrentUser.userRole) {
      case "organizer":
        ctaButton.innerHTML = "Edit Schedule";
        changeCTALocation("schedule-editor.html");
        break;
      case "reviewer":
        ctaButton.innerHTML = "Review Papers";
        changeCTALocation("review.html");
        break;
      case "author":
        ctaButton.innerHTML = "Submit Paper";
        changeCTALocation("submitPaper.html");
        break;
      default:
        break;
    }
  }

  // Generate papers for the first day by default
  generatePapersForDay(1);

  //getting organizer users
  organizerUsers = await usersRepo.getUserByRole("organizer");
  organizerUsers.forEach((user) => {
    organizerContainer.innerHTML += generateUsers(user);
  });

  //getting all users by specifying no email and password argument
  staffUsers = await usersRepo.getUserByRole("reviewer");

  staffUsers.forEach((user) => {
    staffContainer.innerHTML += generateUsers(user);
  });
});

function changeCTALocation(page) {
  ctaButton.addEventListener("click", () => {
    window.location.href = page;
  });
}

day1.addEventListener("click", () => {
  generatePapersForDay("1");
});

day2.addEventListener("click", () => {
  console.log("I am getting called");
  generatePapersForDay("2");
});

function generatePapersForDay(date) {
  papersContainer.innerHTML = "";
  sessions.forEach((session) => {
    if (session.date === date) {
      if (session.papers.length === 0) {
        papersContainer.innerHTML = "<h3>No papers in this session yet...</h3>";
      } else {
        for (const paper in session.papers) {
          const selectedPaper = papers.find(
            (selectedPaper) => selectedPaper.id === paper.id
          );
          papersContainer.innerHTML += generatePaper(selectedPaper, session);
        }
      }
    }
  });
}

function generatePaper(paper, session) {
  const selectedPaper = session.papers.findIndex(
    (indexedPaper) => indexedPaper.paperID === paper.paperID
  );
  return `
    <article class="schedule-card">
    <img src="${paper.presenter.presenterImage}" alt="${paper.presenter.presenterFname}">
    <section class="card">
        <div class="card-info">
            <div class="card-info-header">
                <h3>${paper.paperTitle}</h3>
                <h3>${session.papers[selectedPaper].paperFromTime} - ${session.papers[selectedPaper].paperToTime}</h3>
            </div>
            <p>${paper.paperSummary}</p>
        </div>
    </section>
</article>
    `;
}

function generateUsers(user) {
  return `
    <div class="container">
    
        <div class="card-wrapper">
    
            <div class="staff-card">
    
                <div class="card-image">
                    <img src="${user.image}" alt="profile one">
                </div>
    
                <div class="details">
                    <h2>${user.first_name} ${user.last_name}
                        <br>
                        <span class="job-title">${
                          user.role.charAt(0).toUpperCase() + user.role.slice(1)
                        }</span>
                    </h2>
                </div>
            </div>
        </div>
    </div>
    `;
}

//Handle accordions in HOME
const accordions = document.getElementsByClassName("accordion-btn");

for (let i = 0; i < accordions.length; i++) {
  accordions[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

//-----------------------------------------------------------------
// const scheduleDaysContainer = document.querySelector(".schedule-days");
// let schedule = [];

// window.addEventListener("load", async () => {
//   papers = await papersRepo.getPapers();
//   schedule = await scheduleRepo.getschedule();

//   schedule.forEach((e, index) => {
//     scheduleDaysContainer.innerHTML += scheduleDays(index);
//   });

//   staffUsers = await usersRepo.getUserByRole("nonAuthorUsers");

//   staffUsers.forEach((user) => {
//     staffContainer.innerHTML += generateUsers(user);
//   });
// });

// function scheduleDays(index) {
//   return `
//     <h1 id="day" onclick="showPaper(${index})>DAY ${index + 1}</h1>
//       `;
// }

// function showPaper(index) {
//   const papersScheduleID = schedule[index].papers;
//   const SchedulePapers = papers.filter((paper) =>
//     papersScheduleID.includes(paper.PapersID)
//   );

//   SchedulePapers.forEach((paper) => {
//     papersContainer.innerHTML += generatePaper(paper);
//   });
// }

// function generatePaper(paper) {
//   return `
//       <article class="schedule-card">
//       <img src="${paper.presenter.presenter-image} alt="">
//       <section class="card">
//           <div class="card-info">
//               <div class="card-info-header">
//                   <h3>${paper.paper-title}</h3>
//                   <h3>10:00 AM</h3>
//               </div>
//               <p>${paper.paper-summary}</p>
//           </div>
//       </section>
//   </article>
//       `;
// }
