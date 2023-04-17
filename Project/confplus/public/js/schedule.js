
import papersRepo from "../repository/papers-repo.js";
import usersRepo from "../repository/users-repo.js";
import datesRepo from "../repository/dates-repo.js";

window.loadPapers = loadPapers;
window.handleSearch = handleSearch;

let users = [];
let papers = [];
let dates = [];

const currentUser = JSON.parse(sessionStorage.getItem("CurrentUser"));
const organizerSection = document.querySelector('.organizer-section-container');
let papersContainer = document.querySelector('.papers-container');
const filterDropdown = document.querySelector('#date-filter');

window.addEventListener('load', async () => {
    loadDates();
    loadPapers();
    if(currentUser !== null){
        if(currentUser.role === "organizer"){
            organizerSection.style.display = 'block';
        }
    }
});

//Filtering
async function loadDates(){
    dates = await datesRepo.getDates();

    dates.forEach(date => {
        var option = document.createElement('option');
        option.text = option.value = date.date;
        filterDropdown.appendChild(option);
    })
};

filterDropdown.addEventListener('change', filterPapersByDate);

function filterPapersByDate() {
    const selectedDate = filterDropdown.value;

    if (selectedDate === "all") {
        // Show all papers if "all" is selected
        papersContainer.innerHTML = "";
        papers.forEach(paper => {
            papersContainer.innerHTML += generatePaper(paper);
        });
    } else {
        const selectedDay = dates.find(date => date.date === selectedDate);
        
        // Filter papers based on selected day
        const filteredPapers = papers.filter(paper => paper.day === selectedDay.day);
        papersContainer.innerHTML = "";
        filteredPapers.forEach(paper => {
            papersContainer.innerHTML += generatePaper(paper);
        });
    }
};

async function loadPapers() {
    users = await usersRepo.getUserByRole('author');
    papers = await papersRepo.getPapers();

    papers.forEach(paper => {
        papersContainer.innerHTML += generatePaper(paper);
    });
};

function generatePaper(paper){
    const author = users.find(author => author.id === paper.authorId);
    return `
    <article class="schedule-card">
        <section class="card">
            <div class="card-info">
                <div class="card-main-info">
                    <div class="card-info-header">
                        <h3>${paper.title}</h3>
                        <h3>11:00 AM</h3>
                    </div>
                    <p>${paper.abstract}</p>
                </div>
                <h4>Speaker: ${author.first_name} ${author.last_name}</h4>
            </div>
        </section>
    </article>
    `
}

function handleSearch(input){
    if(input !== ''){
        papersContainer.innerHTML = '';
        const searchedPapers = papers.filter(paper => paper.title.toLowerCase().includes(input));
        if(searchedPapers.length > 0){
            searchedPapers.forEach(paper => {
                papersContainer.innerHTML += generatePaper(paper);
            })
        }
    } else {
        papersContainer.innerHTML = '';
        loadPapers();
    }
}