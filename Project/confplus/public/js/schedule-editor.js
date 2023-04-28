import repo from "../repository/schedule-repo.js"

const container = document.querySelector('.schedule-info-container');
const button = document.querySelector('#submit-btn');
const select = document.querySelector('#schedule-dropdown');
const dropdown = document.querySelector('.dropdown');
const addForm = document.querySelector('.add-form')

let sessions = [];
let dates = [];
let locations = [];

window.addEventListener('load', async () => {
    sessions = await repo.getSchedule()
    if(sessions.length === 0){
        const addButton = document.querySelector('#add-btn')
        addButton.addEventListener('submit', addSession)
        dropdown.style.display = 'none';
    }
    sessions.forEach(session => {
        addForm.style.display = 'none';
        var option = document.createElement('option')
        option.text = option.value = session.name
        select.appendChild(option)
    });
})

select.addEventListener('change', (e) => {
    const selectedSession = sessions.find(sessions => sessions.name === e.target.value);
    if(selectedSession){
        addForm.style.display = 'none'
        container.style.display = 'flex'
        container.innerHTML = loadInfo(selectedSession);
    }
    if(e.target.value === "add"){
        container.style.display = 'none'
        addForm.style.display = 'flex'
    }
})

//Take form and do POST
function addSession(e){

}

//Take form and do PUT
function updateSession(e){

}

function loadInfo(session){
    return `
    <h3>Edit a session</h3>
    <form action="">
    <label for="name">Session Name</label>
    <input type="text" name="name" id="name" value="${session.name}">

    <label for="location">Location</label>
    <select name="location" id="location">
        
    </select>

    <label for="date">Date</label>
    <select name="date" id="date">

    </select>

    <input type="submit" value="Submit" class="header-btns" id="submit-btn">
</form>
    `
}

//COMPLETE FORM INTO OBJECT TO UPDATE ONE SESSION
async function formSubmit(event) {
    try {
      event.preventDefault();
      console.log()
      const formCheck = event.target;
      const isFormValid = formCheck.checkValidity();
      if (!isFormValid) return;
    
      const evaluation = formToObject(evaluationFromHTML, index);
  
      const updatedSession = await repo.updateSession(selectedSession);
    
      console.log(evaluation);
      console.log("====================");
      console.log(selectedSession);
      console.log("====================");
      console.log(updatedSession);
  
      await reloadPage();
    } catch (error) {
      console.log(error.name + " | " + error.message);
    }
}


function formToObject(formElement, index) {

    const formData = new FormData(formElement);
    const data = selectedPaper.reviewersID[index];
  
    for (const [key, value] of formData) {
      data[key] = value;
    }
  
    return data;
}