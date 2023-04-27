import repo from "../repository/schedule-repo.js"

const container = document.querySelector('.schedule-info-container');
const button = document.querySelector('#submit-btn');

let sessions = [];
let dates = [];
let locations = [];

window.addEventListener('load', async () => {
    sessions = await repo.getSchedule()
    if(sessions.length === 0){
        button.value = 'Add'
    }
    sessions.forEach(session => {
        container.innerHTML += loadInfo(session)
    });
})
function loadInfo(session){
    return `
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
  
    data.evaluated = true
  
    return data;
}