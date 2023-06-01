import papersRepo from "../repository/papers-repo.js";

const currentUser = JSON.parse(sessionStorage.getItem("CurrentUser"));
const mainContainer = document.querySelector("#main-container");
let papers = null;

window.addEventListener("load", async () => {

    papers = await papersRepo.getPapersByUserID(currentUser.userID);
    displayPapers();
    const cards = document.querySelectorAll('.paper-card');
    console.log(cards)
    cards.forEach(function(card) {
        card.addEventListener('click', function() {
            this.classList.toggle('active');
        });
});

});

function displayPapers() {
    const papersCards = papers.map((paper) => convertToCards(paper)).join(" ");
    mainContainer.innerHTML = papersCards;
}

function convertToCards(paper) {
    const reviewers = paper.reviewersID;

    let status = ""
    if(!reviewers[0].evaluated || !reviewers[1].evaluated){
        status = "hourglass"
    }
    else if(paper.isAccepted){
        status = "checkmark-circle"
    } else {
        status = "close-circle"
    }

    let reviewer1Content = "";
    let reviewer2Content = "";

    if (!reviewers[0].evaluated) {
        reviewer1Content = `
        <div class="reviewer-container-not-reviewed">
            <h3 class="paper-section">Reviewer 1: </h3>
            <p>Paper was not reviewed yet.</p>
        </div>
        `;
    } else {
        reviewer1Content = `
        <div class="reviewer-container">
            <h3 class="paper-section">Reviewer 1:</h3>
            <h5 class="paper-section">Overall evaluation: ${reviewers[0].evaluation}</h5>
            <h5 class="paper-section">Paper contribution: ${reviewers[0].contribution}</h5>
            <div class="evaluation-wrapper">
                <div class="evaluation-content">
                    <h5>Paper Strengths:</h5>
                    <p class="evaluation">${reviewers[0].strengths}</p>
                </div>
            </div>
            <div class="evaluation-wrapper">
                <div class="evaluation-content">
                    <h5>Paper Weaknesses:</h5>
                    <p class="evaluation">${reviewers[0].weaknesses}</p>
                </div>
            </div>
        </div>
        `;
    }

    if (!reviewers[1].evaluated) {
        reviewer2Content = `
        <div class="reviewer-container-not-reviewed">
            <h3 class="paper-section">Reviewer 2: </h3>
            <p>Paper was not reviewed yet.</p>
        </div>
        `;
    } else {
        reviewer2Content = `
            <div class="reviewer-container">
                <h3 class="paper-section">Reviewer 2:</h3>
                <h5 class="paper-section">Overall evaluation: ${reviewers[1].evaluation}</h5>
                <h5 class="paper-section">Paper contribution: ${reviewers[1].contribution}</h5>
                <div class="evaluation-wrapper">
                    <div class="evaluation-content">
                        <h5>Paper Strengths:</h5>
                        <p class="evaluation">${reviewers[1].strengths}</p>
                    </div>
                </div>
                <div class="evaluation-wrapper">
                    <div class="evaluation-content">
                        <h5>Paper Weaknesses:</h5>
                        <p class="evaluation">${reviewers[1].weaknesses}</p>
                    </div>
                </div>
            </div>
        `;
    }

    let details = ""
    details = `
    <div class="details-container">
        <h3>Session Details: </h3>
        <h5>Location: </h5>
        <p>Doha City Center</p>
        <h5>Date: </h5>
        <p>01-05-2023</p>
        <h5>Time: </h5>
        <p>9:00 AM</p>
    </div>
    `;
    
    return `
    <article class="paper-card">
        <div class="paper-header">
            <h3 class="paper-title">Title: ${paper.paperTitle}</h3>
            <ion-icon name="${status}"></ion-icon>
        </div>
        <div class="paper-details">
            ${reviewer1Content}
            ${reviewer2Content}
            ${details}
        </div>
    </article>
    `;
}