
import papersRepo from "../repository/papers-repo.js";
import scheduleRepo from "../repository/schedule-repo.js";


const noOfSubmitedPaper = document.querySelector("#NoOfSubmitedPaper");
const noOfAcceptedPaper = document.querySelector("#NoOfAcceptedPaper");
const noOfRejectedPaper = document.querySelector("#NoOfRejectedPaper");
const averageAuthorPaper = document.querySelector("#averageAuthorPaper");
const noOfSessions = document.querySelector("#NoOfSessions");
const averagePresentationSessions = document.querySelector(
    "#averagePresentationSessions"
);

let papers = null;
let schedule = null;

window.addEventListener("load", async () => {
    papers = await papersRepo.getPapers();
    schedule = await scheduleRepo.getSchedule();
    averageAuthorPaper.innerHTML = calculateAverageAuthors()
    noOfSessions.innerHTML = calculateNumberOfSessions()
    averagePresentationSessions.innerHTML = calculateAveragePresenters()
    noOfSubmitedPaper.innerHTML = paperSubmitted()
    noOfAcceptedPaper.innerHTML = paperAccepted("accepted")
    noOfRejectedPaper.innerHTML = paperAccepted("rejected")
});

function calculateAverageAuthors() {
    let totalAuthors = 0;

    papers.forEach((paper) => {
        if (paper.authors.length === 0) {
            totalAuthors++;
        } else {
            totalAuthors = totalAuthors + paper.authors.length + 1;
        }
    });

    const average = totalAuthors / papers.length
    const formatted = Number.isInteger(average) ? average.toFixed(0) : average.toFixed(2);

    return formatted;
}

function calculateNumberOfSessions() {
    let totalSessions = 0;
    totalSessions = schedule.length

    return totalSessions;
}

function calculateAveragePresenters() {
    let totalPapers = 0;
    schedule.forEach(session => {
        totalPapers += session.papers.length
    })

    const average = totalPapers / schedule.length

    const formatted = Number.isInteger(average) ? average.toFixed(0) : average.toFixed(2);

    return formatted;
}

function paperSubmitted() {
    return papers.length;
}
function paperAccepted(check) {
    let acceptedPaper = 0;
    let rejectedPaper = 0;
    papers.forEach((paper) => {
        if (paper.isAccepted === true) {
            acceptedPaper++;
        } else {
            rejectedPaper++;
        }
    });
    if (check === "rejected") {
        return rejectedPaper;
    } else if (check === "accepted"){
        return acceptedPaper;
    }
}