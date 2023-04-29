import papersRepo from "../repository/papers-repo.js";

const mainContainer = document.querySelector("#main-container");
const currentUser = JSON.parse(sessionStorage.getItem("CurrentUser"));
const page_URL = "evaluation-form.html";
let papers = null;
let selectedPaper = null;
let evaluationFromHTML = null;
let index = null;

window.addEventListener("load", async () => {
  window.loadPaper = loadPaper;
  papers = await papersRepo.getPapersByReviewerID(currentUser.userID);
  displayPapers();
});

function displayPapers() {
  const papersCards = papers.map((paper) => convertToCards(paper)).join(" ");
  mainContainer.innerHTML = papersCards;
}

function convertToCards(paper) {
  return `
        <article class="title-card" id="title-card" onclick="loadPaper('${paper.paperID}')">
            <h1>${paper.paperTitle}</h1>
            <ion-icon name="document-text-outline"></ion-icon>
        </article>
  `;
}

async function loadPaper(id) {
  selectedPaper = await papersRepo.getPaperByID(id);
  const paperDetail = paperDetails(selectedPaper);
  index = selectedPaper.reviewersID.findIndex(reviewer => reviewer.id === currentUser.userID);
  mainContainer.innerHTML = paperDetail;
  await createFormPage();

  if (selectedPaper.reviewersID[index].evaluated) {
    fillForm(selectedPaper.reviewersID[index]);
  }
}

function paperDetails(selectedPaper) {

  const authors = selectedPaper.authors || []

  return `
  <section class="paper-container">

    <div class="presenter-container">

        <article class=card>

            <section class=image>
                <img src="${selectedPaper.presenter.presenterImage}" alt="Presenter">
            </section>

            <section class=content>
                <h3>${selectedPaper.presenter.presenterFname} ${selectedPaper.presenter.presenterLname}</h3>
                <p><a href="mailto:${selectedPaper.presenter.presenterEmail}"> ${selectedPaper.presenter.presenterEmail}</a></p>
                <p>${selectedPaper.presenter.presenterAffiliation}</p>
            </section>

        </article>

    </div>

    <div class="paper-details">

        <h1>${selectedPaper.paperTitle}</h1>
        <p>${selectedPaper.paperSummary}</p>
        <p>Download paper: <a href="http://">link to download the paper</a></p>
        <section class="authors">
              ${authors.map((author) => `
                <h5><a href="mailto:${author.authorEmail}">${author.authorFname} ${author.authorLname}</a> <br> ${author.authorAffiliation} </h5>
                `).join(" ")}
        </section>
    </div>

  </section>
  `;
}

async function createFormPage() {
  mainContainer.innerHTML += await getEvaluationFrom();
  evaluationFromHTML = document.querySelector("#evaluation-form");
  evaluationFromHTML.addEventListener("submit", formSubmit);
}

async function getEvaluationFrom() {
  const response = await fetch(page_URL);
  return await response.text();
}

function fillForm(evaluated) {
  document.querySelector('.evaluation[value="' + evaluated.evaluation + '"]').checked = true;
  document.querySelector('.contribution[value="' + evaluated.contribution + '"]').checked = true;
  document.querySelector("#strengths").value = evaluated.strengths;
  document.querySelector("#weaknesses").value = evaluated.weaknesses;
}

async function formSubmit(event) {
  try {
    event.preventDefault();
    const formCheck = event.target;
    const isFormValid = formCheck.checkValidity();
    if (!isFormValid) return;
  
    formToObject(evaluationFromHTML);

    const updatePaper = await papersRepo.updatePaper(selectedPaper);
  
    // console.log(evaluation);
    console.log("====================");
    console.log(selectedPaper);
    console.log("====================");
    console.log(updatePaper);

    await reloadPage();
  } catch (error) {
    console.log(error.name + " | " + error.message);
  }
}


function formToObject(formElement) {

  const formData = new FormData(formElement);
  const data = selectedPaper.reviewersID[index];

  for (const [key, value] of formData) {
    data[key] = value;
  }

  data.evaluated = true
}

async function reloadPage() {
  location.reload();
}