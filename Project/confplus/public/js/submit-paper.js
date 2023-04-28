import papersRepo from "../repository/papers-repo.js";
import usersRepo from "../repository/users-repo.js";
import institutionsRrepo from "../repository/institutions-repo.js";

let authorNumber = 1;
let affiliations = null;
const addAuthor = document.querySelector("#add-author");
const deleteAuthor = document.querySelector("#delete-author");
const authorsContainer = document.querySelector("#extra-author-container");
const submitPaper = document.querySelector("#submit-paper");
const form = document.querySelector("#submit-paper-form");
const dbAffiliation = document.querySelectorAll(".DropDown");

window.addEventListener("load", async () => {
  affiliations = await institutionsRrepo.getInstitutions();
  fillDropDown();
});

async function fillDropDown() {
  affiliations = await institutionsRrepo.getInstitutions();
  dbAffiliation.forEach((ddm) => {
    ddm.innerHTML += affiliations
      .map(
        (affiliation) =>
          `<option value="${affiliation.name}">${affiliation.name}</option>`
      )
      .join(" ");
  });
}

addAuthor.addEventListener("click", () => {
  const author = extraAuthor();
  authorsContainer.appendChild(author);
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
    const formCheck = event.target;
    const isFormValid = formCheck.checkValidity();
    if (!isFormValid) return;

    const reviewersID = await getRandomReviewer();

    const paper = infoFormToObject(form);

    paper.reviewersID = reviewersID;

    const addedPaper = await papersRepo.addPaper(paper);
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
    reviewers.push({ id: reviewerUsers[index].id });
    reviewerUsers.splice(index, 1);
  }
  return reviewers;
}

function extraAuthor() {
  ++authorNumber;

  const newAuthorHtml = ` 
  <div class="section-title">Author ${authorNumber} </div>
   <div class="form-group">
     <input type="text" id="author-fname" class="author-fname" name="authorFname${authorNumber}" required>
     <label for="author-fname">Author first Name</label>
   </div>

   <div class="form-group">
     <input type="text" id="author-lname" class="author-lname" name="authorLname${authorNumber}" required>
     <label for="author-lname">Author last Name</label>
   </div>

   <div class="form-group">
      <input type="url" id="author-Image" name="authorImage${authorNumber}" required>
      <label for="author-Image">Author Image URL</label>
   </div>

   <div class="form-group">
    <select id="author-Affiliation" class="DropDown" name="authorAffiliation${authorNumber}" required>
       <option value="" selected hidden>Select Affiliation</option>
    </select>
   </div>

 <div class="form-group">
     <input type="text" id="author-email" class="author-email" name="authorEmail${authorNumber}" required>
     <label for="author-email">Email</label>
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
  };
  let authors = [];
  const regex = /\d+$/;

  for (const [key, value] of formData) {
    if (key.startsWith("presenter")) {
      data.presenter[key] = value;
    } else if (key.startsWith("author")) {
      const authorNumber = key.match(regex)[0];
      const author = authors[authorNumber - 2] || {};
      const newKey = key.replace(authorNumber, "");
      author[newKey] = value;
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
