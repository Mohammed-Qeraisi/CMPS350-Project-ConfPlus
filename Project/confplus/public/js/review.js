import papersRepo from "../repository/papers-repo.js";

const mainContainer = document.querySelector("#main-container");
const currentUser = JSON.parse(sessionStorage.getItem("CurrentUser"));
const page_URL = "evaluation-form.html";
let papers = null;
let selectedPaper = null;
let evaluationFromHTML = null;
let index = null;
let currentPage = 1;
const papersPerPage = 6;

window.addEventListener("load", async () => {
    window.loadPaper = loadPaper;
    papers = await papersRepo.getPapersByReviewerID(currentUser.userID);
    console.log(papers.length);
    displayPapers();
});

function displayPapers() {
    const startIndex = (currentPage - 1) * papersPerPage;
    const endIndex = startIndex + papersPerPage;
    const displayedPapers = papers.slice(startIndex, endIndex);

    const papersCards = displayedPapers
        .map((paper) => convertToCards(paper))
        .join(" ");

    mainContainer.innerHTML = papersCards;

    addPaginationButtons();
}

function convertToCards(paper) {
    const icon = paper.evaluated ? "document-text" : "document-text-outline";
    return `
<article class="title-card" id="title-card" onclick="loadPaper('${paper.paperID}')">
  <h1>${paper.paperTitle}</h1>
  <ion-icon name="${icon}"></ion-icon>
</article>
`;
}

async function loadPaper(id) {
    selectedPaper = await papersRepo.getPaperByID(id);
    const paperDetail = paperDetails(selectedPaper);
    index = selectedPaper.reviewersID.findIndex(
        (reviewer) => reviewer.id === currentUser.userID
    );
    mainContainer.innerHTML = paperDetail;
    await createFormPage();

    if (selectedPaper.reviewersID[index].evaluated) {
        fillForm(selectedPaper.reviewersID[index]);
    }
}

function paperDetails(selectedPaper) {
    const authors = selectedPaper.authors || [];

    return `
<section class="paper-container">

  <div class="presenter-container">
    <h1>Presenter</h1>
    <div class="container">
      <div class="card-wrapper">

        <div class="staff-card">

          <div class="card-image">
            <img src="${
                selectedPaper.presenter.presenterImage
            }" alt="Presenter Image">
          </div>

          <div class="details">
            <h2>${selectedPaper.presenter.presenterFname} ${
        selectedPaper.presenter.presenterLname
    }
              <br>
              <div class="affiliation-email">
                <span>${selectedPaper.presenter.presenterAffiliation}</span>
                <br>
                <span><a
                    href="mailto:${selectedPaper.presenter.presenterEmail}">${
        selectedPaper.presenter.presenterEmail
    }</a></span>
              </div>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="paper-details">

    <h1>${selectedPaper.paperTitle}</h1>
    <p>${selectedPaper.paperSummary}</p>
    <section class="authors">
      ${authors
          .map(
              (author) => `
      <h5><a href="mailto:${author.authorEmail}">${author.authorFname} ${author.authorLname}</a> <br>
        ${author.authorAffiliation} </h5>
      `
          )
          .join(" ")}
    </section>
    <p>Download paper: <a href="http://" download>link to download the paper</a></p>
  </div>

</section>
`;
}

function addPaginationButtons() {
    const totalPages = Math.ceil(papers.length / papersPerPage);
    const maxVisiblePages = 3;

    const paginationContainer = document.createElement("div");
    paginationContainer.classList.add("pagination");

    // Previous Button
    const previousButton = document.createElement("button");
    previousButton.textContent = "Previous";
    previousButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayPapers();
        }
    });
    paginationContainer.appendChild(previousButton);

    // Calculate visible pages range
    let startPageIndex = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPageIndex = Math.min(
        totalPages,
        startPageIndex + maxVisiblePages - 1
    );

    // Display first page button
    if (startPageIndex > 1) {
        const firstPageButton = createPageButton(1);
        paginationContainer.appendChild(firstPageButton);

        if (startPageIndex > 2) {
            paginationContainer.appendChild(createEllipsisButton());
        }
    }

    // Display visible page buttons
    for (let i = startPageIndex; i <= endPageIndex; i++) {
        const button = createPageButton(i);
        paginationContainer.appendChild(button);
    }

    // Add ellipsis and last page if needed
    if (endPageIndex < totalPages) {
        if (endPageIndex < totalPages - 1) {
            paginationContainer.appendChild(createEllipsisButton());
        }
        const lastPageButton = createPageButton(totalPages);
        paginationContainer.appendChild(lastPageButton);
    }

    // Next Button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayPapers();
        }
    });
    paginationContainer.appendChild(nextButton);

    mainContainer.appendChild(paginationContainer);
}

function createPageButton(pageNumber) {
    const button = document.createElement("button");
    button.textContent = pageNumber;
    button.addEventListener("click", () => {
        currentPage = pageNumber;
        displayPapers();
    });

    if (pageNumber === currentPage) {
        button.classList.add("active");
    }

    return button;
}

function createEllipsisButton() {
    const button = document.createElement("button");
    button.textContent = "...";
    button.disabled = true;
    button.classList.add("ellipsis");
    return button;
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
    document.querySelector(
        '.evaluation[value="' + evaluated.evaluation + '"]'
    ).checked = true;
    document.querySelector(
        '.contribution[value="' + evaluated.contribution + '"]'
    ).checked = true;
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
        isAccepted();

        const updatePaper = await papersRepo.updatePaper(selectedPaper);

        await reloadPage();
    } catch (error) {
        console.log(error.name + " | " + error.message);
    }
}

function isAccepted() {
    const sumOfEvaluations = selectedPaper.reviewersID.reduce(
        (total, reviewer) => {
            return total + parseInt(reviewer.evaluation);
        },
        0
    );

    const allReviewed = selectedPaper.reviewersID.every(
        (reviewer) => reviewer.evaluated === true
    );

    if (sumOfEvaluations >= 2 && allReviewed) {
        selectedPaper.isAccepted = true;
    } else {
        selectedPaper.isAccepted = false;
    }
}

function formToObject(formElement) {
    const formData = new FormData(formElement);
    const data = selectedPaper.reviewersID[index];

    for (const [key, value] of formData) {
        data[key] = value;
    }

    data.evaluated = true;
}

async function reloadPage() {
    location.reload();
}
