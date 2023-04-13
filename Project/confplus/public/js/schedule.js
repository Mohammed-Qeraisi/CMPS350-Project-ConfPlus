import papersRepo from "../repository/papers-repo.js";
import usersRepo from "../repository/users-repo.js";
let users = [];
let papers = [];
let papersContainer = document.querySelector('.papers-container')

window.addEventListener('load', async () => {
    users = await usersRepo.getUserByRole('author');
    papers = await papersRepo.getPapers();
    console.log(papers);
    papers.forEach(paper => {
        papersContainer.innerHTML += generatePaper(paper);
    });
});

function generatePaper(paper){
    const author = users.find(author => author.id === paper.authorId);
    console.log(author)
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