import papersRepo from "../repository/papers-repo.js";

const currentUser = JSON.parse(sessionStorage.getItem("CurrentUser"));
const mainContainer = document.querySelector("#main-container");
let papers = null;

window.addEventListener("load", async () => {
    papers = await papersRepo.getPapersByUserID(currentUser.userID);
    displayPapers();
});

function displayPapers() {
    const papersCards = papers.map((paper) => convertToCards(paper)).join(" ");
    mainContainer.innerHTML = papersCards;
}

function convertToCards(paper) {
    const reviewers = paper.reviewersID;

    let reviewer1Content = "";
    let reviewer2Content = "";

    if (!reviewers[0].evaluated) {
        reviewer1Content = `
            <h3 class="paper-section">Reviewer 1:
            </h3><p>Paper was not reviewed yet.</p>
        `;
    } else {
        reviewer1Content = `
            <h3 class="paper-section">Reviewer 1:</h3>
            <h5 class="paper-section">Overall evaluation: ${reviewers[0].evaluation}</h5>
            <h5 class="paper-section">Paper contribution: ${reviewers[0].contribution}</h5>
            <div class="paper-section">
                <h5>Paper strengths:</h5>
                <p>${reviewers[0].strengths}</p>
            </div>
            <div class="paper-section">
                <h5>Paper weaknesses:</h5>
                <p>${reviewers[0].weaknesses}</p>
            </div>
        `;
    }

    if (!reviewers[1].evaluated) {
        reviewer2Content = `
            <h3 class="paper-section">Reviewer 2:
            </h3><p>Paper was not reviewed yet.</p>
        `;
    } else {
        reviewer2Content = `
            <h3 class="paper-section">Reviewer 2:</h3>
            <h5 class="paper-section">Overall evaluation: ${reviewers[1].evaluation}</h5>
            <h5 class="paper-section">Paper contribution: ${reviewers[1].contribution}</h5>
            <div class="paper-section">
                <h5>Paper strengths:</h5>
                <p>${reviewers[1].strengths}</p>
            </div>
            <div class="paper-section">
                <h5>Paper weaknesses:</h5>
                <p>${reviewers[1].weaknesses}</p>
            </div>
        `;
    }

    return `
        <article>
            <h1>Title: ${paper.paperTitle}</h1>
            <div class="reviewer">
                <div>${reviewer1Content}</div>
                <div>${reviewer2Content}</div>
            </div>
        </article>
    `;
}
