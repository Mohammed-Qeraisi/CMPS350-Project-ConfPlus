import papersRepo from "../repository/papers-repo.js";
import usersRepo from "../repository/users-repo.js";
import institutionsRrepo from "../repository/institutions-repo.js";

let authorNumber = 1;
let affiliations = null;
const currentUser = JSON.parse(sessionStorage.getItem("CurrentUser"));
const addAuthor = document.querySelector("#add-author");
const deleteAuthor = document.querySelector("#delete-author");
const authorsContainer = document.querySelector("#extra-author-container");
const submitPaper = document.querySelector("#submit-paper");
const form = document.querySelector("#submit-paper-form");
let dbAffiliation = null;

window.addEventListener("load", async () => {
    affiliations = await institutionsRrepo.getInstitutions();
    fillDropDown();
});

function fillDropDown() {
    dbAffiliation = document.querySelectorAll(".DropDown");
    dbAffiliation[dbAffiliation.length - 1].innerHTML += affiliations
        .map(
            (affiliation) =>
                `<option value="${affiliation.institutionID}">${affiliation.institutionName}</option>`
        )
        .join(" ");
}

addAuthor.addEventListener("click", () => {
    const author = extraAuthor();
    authorsContainer.appendChild(author);
    fillDropDown();
});

deleteAuthor.addEventListener("click", () => {
    if (authorNumber > 1) {
        const lastExtraAuthor = authorsContainer.lastElementChild;
        authorsContainer.removeChild(lastExtraAuthor);
        authorNumber--;
    } else {
        alert("There must be at least 1 Author");
    }
});

submitPaper.addEventListener("click", async (event) => {
    try {
        event.preventDefault();
        const formCheck = form;
        const isFormValid = formCheck.checkValidity();
        if (!isFormValid) {
            alert("Please fill in all required fields.");
            return;
        }

        const reviewersID = await getRandomReviewer();

        const paper = infoFormToObject(form);

        paper.ratings = reviewersID;
        paper.userID = parseInt(currentUser.userID);
        paper.paperPDF = "PDF";

        const addedPaper = await papersRepo.addPaper(paper);

        alert(addedPaper.successfully || addedPaper.errorMessage);

        window.location.href = "home.html";
    } catch (error) {
        console.log(error.name + " | " + error.message);
    }
});

async function getRandomReviewer() {
    const reviewerUsers = await usersRepo.getUserByRole("reviewer");
    const reviewers = [];
    const numReviewers = Math.min(2, reviewerUsers.length);
    for (let i = 0; i < numReviewers; i++) {
        const index = Math.floor(Math.random() * reviewerUsers.length);
        reviewers.push({
            userID: reviewerUsers[index].userID,
        });
        reviewerUsers.splice(index, 1);
    }
    return reviewers;
}

function extraAuthor() {
    ++authorNumber;

    const newAuthorHtml = ` 
  <div class="section-title">Author ${authorNumber} </div>
   <div class="form-group">
    <label for="author-fname">Author First Name</label>
    <input type="text" id="author-fname" class="author-fname" name="authorFname${authorNumber}" required>
     
   </div>

   <div class="form-group">
     <label for="author-lname">Author Last Name</label>
     <input type="text" id="author-lname" class="author-lname" name="authorLname${authorNumber}" required>
     
   </div>

   <div class="form-group">
      <label for="author-Image">Author Image URL</label>
      <input type="url" id="author-Image" name="authorImage${authorNumber}" required>
      
   </div>

   <div class="form-group">
   <label for="author-Affiliation">Author Affiliation</label>
    <select id="author-Affiliation" class="DropDown" name="authorAffiliation${authorNumber}" required>
       <option value="" selected hidden>Select Affiliation</option>
    </select>
   </div>

 <div class="form-group">
     <label for="author-email">Author Email</label>
     <input type="text" id="author-email" class="author-email" name="authorEmail${authorNumber}" required>
 </div>
 `;

    const authorContainer = document.createElement("div");

    authorContainer.innerHTML = newAuthorHtml;

    return authorContainer;
}

function infoFormToObject(form) {
    const formData = new FormData(form);

    let data = {
        presenter: {},
        ratings: [],
    };

    let authors = [];
    const regex = /\d+$/;

    const formObject = Object.fromEntries(formData.entries());

    for (const [key, value] of Object.entries(formObject)) {
        if (key.startsWith("presenter")) {
            if (key === "presenterAffiliation") {
                data.presenter["institutionID"] = parseInt(value);
            } else {
                data.presenter[key] = value.toString();
            }
        } else if (key.startsWith("author")) {
            const authorNumber = key.match(regex)[0];
            const author = authors[authorNumber - 2] || {};
            if (key === `authorAffiliation${authorNumber}`) {
                author["institutionID"] = parseInt(value);
            } else {
                const newKey = key.replace(authorNumber, "");
                author[newKey] = value.toString();
            }
            authors[authorNumber - 2] = author;
        } else {
            data[key] = value;
        }
    }

    if (authors.length > 0) {
        data.authors = authors;
    }

    return data;
}
