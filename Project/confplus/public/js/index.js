import papersRepo from "../repository/papers-repo.js";
import usersRepo from "../repository/users-repo.js";
import scheduleRepo from "../repository/schedule-repo.js";

// const day1 = document.querySelector("#day1");
// const day2 = document.querySelector("#day2");
// let papersContainer = document.querySelector(".schedule-cards-container");
const staffContainer = document.querySelector(".staff-container");
// let papersByDay = {};
// let authorUsers = [];
let staffUsers = [];
// let papers = [];

window.addEventListener("load", async () => {
  //   const papers = await papersRepo.getPapers();

  //   papers.forEach((paper) => {
  //     if (!papersByDay.hasOwnProperty(paper.day)) {
  //       papersByDay[paper.day] = [];
  //     }
  //     papersByDay[paper.day].push(paper);
  //   });

  // Generate papers for the first day by default
  // generatePapersForDay(1);

  //getting all users by specifying no email and password argument
  staffUsers = await usersRepo.getUserByRole("nonAuthorUsers");

  staffUsers.forEach((user) => {
    staffContainer.innerHTML += generateUsers(user);
  });
});

// day1.addEventListener("click", () => {
//   generatePapersForDay(1);
// });

// day2.addEventListener("click", () => {
//   generatePapersForDay(2);
// });

// function generatePapersForDay(day) {
//   papersContainer.innerHTML = "";
//   papersByDay[day].forEach((paper) => {
//     papersContainer.innerHTML += generatePaper(paper);
//   });
// }

// function generatePaper(paper) {
//   return `
//     <article class="schedule-card">
//     <img src="${author.image} alt="">
//     <section class="card">
//         <div class="card-info">
//             <div class="card-info-header">
//                 <h3>${paper.title}</h3>
//                 <h3>10:00 AM</h3>
//             </div>
//             <p>${paper.abstract}</p>
//         </div>
//     </section>
// </article>
//     `;
// }

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
