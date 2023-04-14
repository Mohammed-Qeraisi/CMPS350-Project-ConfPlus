console.log("welcome to submit-paper.js");
let authorNumber = 1;
const addAuthor = document.querySelector("#add-author");
const deleteAuthor = document.querySelector("#delete-author");
const authorsContainer = document.querySelector("#extra-author-container");
const submitPaper = document.querySelector("#submit-paper");
const form = document.querySelector("#submit-paper-form");
// async function loadExtraAuthors() {}

addAuthor.addEventListener("click", async () => {
  console.log("hi this is add author");
  const author = extraAuthor(true);
  authorsContainer.appendChild(author);
  console.log("hi author number " + authorNumber);
});

deleteAuthor.addEventListener("click", () => {
  console.log("hi this is delete author");
  if (authorNumber > 1) {
    const lastAuthor = authorsContainer.lastElementChild;
    authorsContainer.removeChild(lastAuthor);
    authorNumber--;
  }
});

// submitPaper.addEventListener("submit", (event) => {
//   event.preventDefault();
//   console.log("form submitted");

//   const data = infoFormToObject(form);
//   console.log(data);
// });

function extraAuthor(check) {
  if (check === true) {
    console.log("trying to add author");
    ++authorNumber;
  } else if (check === false && authorNumber > 1) {
    console.log("trying to delete author");
    --authorNumber;
    authorsContainer.remove();
    return;
  }

  const newAuthorHtml = ` 
  <div class="section-title">Author ${authorNumber} </div>
   <div class="form-group">
     <input type="text" id="author-fname" class="author-fname" name="author-fname" required>
     <label for="author-fname">Author first Name</label>
   </div>
   <div class="form-group">
     <input type="text" id="author-lname" class="author-lname" name="author-lname" required>
     <label for="author-lname">Author last Name</label>
   </div>
   <div class="form-group">
     <input type="text" id="author-affiliation" class="author-affiliation" name="author-affiliation"
         required>
     <label for="author-affiliation">Author Affiliation</label>
   </div>

 <div class="form-group">
     <input type="text" id="author-email" class="author-email" name="author-email" required>
     <label for="author-email">Email</label>
 </div>
 `;

  const authorContainer = document.createElement("div");
  authorContainer.innerHTML = newAuthorHtml;

  return authorContainer;
}

function infoFormToObject(form) {
  const formData = new FormData(form);
  data = {};
  for (const [key, value] of formData) {
    data[key] = value;
  }
  return data;
}
console.log("hi author number " + authorNumber);
