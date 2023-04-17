import papersRepo from "../repository/papers-repo.js";

let authorNumber = 1;
const addAuthor = document.querySelector("#add-author");
const deleteAuthor = document.querySelector("#delete-author");
const authorsContainer = document.querySelector("#extra-author-container");
const submitPaper = document.querySelector("#submit-paper");
const form = document.querySelector("#submit-paper-form");

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

    const paper = infoFormToObject(form);
    const addedPaper = await papersRepo.addPaper(paper);
    console.log(addedPaper);
  } catch (error) {
    console.log(error.name + " | " + error.message);
  }
});

function extraAuthor() {
  ++authorNumber;

  const newAuthorHtml = ` 
  <div class="section-title">Author ${authorNumber} </div>
   <div class="form-group">
     <input type="text" id="author-fname" class="author-fname" name="author-fname-${authorNumber}" required>
     <label for="author-fname">Author first Name</label>
   </div>
   <div class="form-group">
     <input type="text" id="author-lname" class="author-lname" name="author-lname-${authorNumber}" required>
     <label for="author-lname">Author last Name</label>
   </div>
   <div class="form-group">
     <input type="text" id="author-affiliation" class="author-affiliation" name="author-affiliation-${authorNumber}"
         required>
     <label for="author-affiliation">Author Affiliation</label>
   </div>

 <div class="form-group">
     <input type="text" id="author-email" class="author-email" name="author-email-${authorNumber}" required>
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
    if (key.startsWith("presenter-")) {
      data.presenter[key] = value;
    } else if (key.startsWith("author-")) {
      const authorNumber = key.match(regex)[0];
      const author = authors[authorNumber - 2] || {};
      author[key] = value;
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
