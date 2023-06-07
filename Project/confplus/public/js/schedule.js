import scheduleRepo from "../repository/schedule-repo.js";
import papersRepo from "../repository/papers-repo.js";
import datesRepo from "../repository/dates-repo.js";

let dates = [];

let papersContainer = document.querySelector(".papers-container");
const filterDropdown = document.querySelector("#date-filter");

window.addEventListener("load", async () => {
  loadDates();
  loadPapers();
});

//Filtering
async function loadDates() {
  dates = await datesRepo.getDates();

  dates.forEach((date) => {
    var option = document.createElement("option");
    option.value = date.dayNo;
    option.text = date.date;
    filterDropdown.appendChild(option);
  });
}

filterDropdown.addEventListener("change", filterPapersByDate);

async function filterPapersByDate() {
  if (filterDropdown.value === "all") {
    loadPapers();
  } else {
    const selectedSession = await scheduleRepo.getSessionByDate(
      filterDropdown.value
    );
    if(!selectedSession.papers){
      papersContainer.innerHTML = `<h1>No papers in this session...</h1>`;
    } else {
      papersContainer.innerHTML = "";
      for (const sessionPaper of selectedSession.papers) {
        const paperHtml = await generatePaper(sessionPaper);
        papersContainer.innerHTML += paperHtml;
      }
    }
  }
}

async function loadPapers() {
  const sessions = await scheduleRepo.getSchedule();
  papersContainer.innerHTML = "";

  if (sessions.length === 0) {
    papersContainer.innerHTML = `<h1>No papers in this session...</h1>`;
  } else {
    for (const session of sessions) {
      let papersHtml = `
      <h1>Conference Name: ${session.name}</h1>
      `;
      for (const sessionPaper of session.papers) {
        const paperHtml = await generatePaper(sessionPaper);
        papersHtml += paperHtml;
      }
      papersContainer.innerHTML += papersHtml;
    }
  }
}

async function generatePaper(sessionPaper) {
  const paper = await papersRepo.getPaperByID(sessionPaper.paperID);
  console.log(paper)
  return `
    <article class="schedule-card">
    <section class="card">
        <div class="card-info">
            <div class="card-main-info">
                <div class="card-info-header">
                    <h4>Title: ${paper.paperTitle}</h4>
                    <h4 id="card-time">${sessionPaper.paperFromTime} - ${sessionPaper.paperToTime}</h4>
                </div>
                <p>Abstract: ${paper.paperSummary}</p>
            </div>
            <h4>Speaker: ${paper.presenter.presenterFname} ${paper.presenter.presenterLname}</h4>
        </div>
    </section>
</article>
    `;
}
