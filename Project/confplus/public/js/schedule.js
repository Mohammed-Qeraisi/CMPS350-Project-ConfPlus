import scheduleRepo from "../repository/schedule-repo.js";
import papersRepo from "../repository/papers-repo.js";
import datesRepo from "../repository/dates-repo.js";

window.loadPapers = loadPapers;
window.handleSearch = handleSearch;

let papers = [];
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
    option.value = date.day;
    option.text = date.date;
    filterDropdown.appendChild(option);
  });
}

filterDropdown.addEventListener("change", filterPapersByDate);

function filterPapersByDate() {
  const selectedDate = filterDropdown.value;

  if (selectedDate === "all") {
    // Show all papers if "all" is selected
    console.log(papers.length);
    if (papers.length === 0) {
      papersContainer.innerHTML = `<h1>No papers in this session...</h1>`;
    }
    papersContainer.innerHTML = "";
    papers.forEach((paper) => {
      papersContainer.innerHTML += generatePaper(paper);
    });
  } else {
    const selectedDay = dates.find((date) => date.date === selectedDate);

    // Filter papers based on selected day
    const filteredPapers = papers.filter(
      (paper) => paper.day === selectedDay.day
    );
    if (filteredPapers.length === 0) {
      papersContainer.innerHTML = `<h1>No papers in this session...</h1>`;
    }
    papersContainer.innerHTML = "";
    filteredPapers.forEach((paper) => {
      papersContainer.innerHTML += generatePaper(paper);
    });
  }
}

async function loadPapers() {
  const sessions = await scheduleRepo.getSchedule();

  if (sessions.length === 0) {
    papersContainer.innerHTML = `<h1>No papers in this session...</h1>`;
  } else {
    sessions.forEach(async (session) => {
      for (const sessionPaper of session.papers) {
        const paperHtml = await generatePaper(sessionPaper);
        papersContainer.innerHTML += paperHtml;
      }
    });
  }

  papers.forEach((paper) => {
    papersContainer.innerHTML += generatePaper(paper);
  });
}

async function generatePaper(sessionPaper) {
  const paper = await papersRepo.getPaperByID(sessionPaper.paperID);

  return `
    <article class="schedule-card">
    <section class="card">
        <div class="card-info">
            <div class="card-main-info">
                <div class="card-info-header">
                    <h4>${paper.paperTitle}</h4>
                    <h4 id="card-time">${sessionPaper.paperFromTime} - ${sessionPaper.paperToTime}</h4>
                </div>
                <p>${paper.paperSummary}</p>
            </div>
            <h4>Speaker:${paper.presenter.presenterFname} ${paper.presenter.presenterLname}</h4>
        </div>
    </section>
</article>
    `;
}

function handleSearch(input) {
  if (input !== "") {
    papersContainer.innerHTML = "";
    const searchedPapers = papers.filter((paper) =>
      paper.title.toLowerCase().includes(input)
    );
    if (searchedPapers.length > 0) {
      searchedPapers.forEach((paper) => {
        papersContainer.innerHTML += generatePaper(paper);
      });
    }
  } else {
    papersContainer.innerHTML = "";
    loadPapers();
  }
}
