console.log("welcome to submit-paper.js");
let authorNumber = 1;
const addAuthor = document.querySelector("#add-author");
const deleteAuthor = document.querySelector("#delete-author");
const authorsContainer = document.querySelector("#extra-author-container");
const submitPaper = document.querySelector("#submit-paper");
const form = document.querySelector("#submit-paper-form");

addAuthor.addEventListener("click", async () => {
  console.log("hi this is add author");
  const author = extraAuthor();
  authorsContainer.appendChild(author);
  console.log("hi author number " + authorNumber);
});

deleteAuthor.addEventListener("click", () => {
  console.log("hi this is delete author");
  if (authorNumber > 1) {
    const lastExtraAuthor = authorsContainer.lastElementChild;
    authorsContainer.removeChild(lastExtraAuthor);
    authorNumber--;
  } else {
    alert("There must be at least 1 Author");
  }
});

submitPaper.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("form submitted");

  const data = infoFormToObject(form);
  console.log(data);
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
      console.log(key + " : " + value);
      const authorNumber = key.match(regex)[0];
      const author = authors[authorNumber - 2] || {};
      author[key] = value;
      authors[authorNumber - 2] = author;
    } else {
      data[key] = value;
    }
  }

  data.authors = authors;

  return data;
}
console.log("hi author number " + authorNumber);
