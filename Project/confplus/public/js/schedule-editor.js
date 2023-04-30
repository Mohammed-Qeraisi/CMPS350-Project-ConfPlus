import scheduleRepo from "../repository/schedule-repo.js";
import papersRepo from "../repository/papers-repo.js";
import datesRepo from "../repository/dates-repo.js";
import locationsRepo from "../repository/locations-repo.js";

let select = null;
const scheduleSelector = document.querySelector(".dropdown");
const formContainer = document.querySelector("#form-container");
let form = null;
let addPaperBtn = null;
let deleteSession = null;
let dateDropDown = null;
let locationDropDown = null;

let sessions = [];
let selectedSession = null;
let dates = [];
let locations = [];
let paperNumber = 0;
let papers = null;

window.addEventListener("load", async () => {
  sessions = await scheduleRepo.getSchedule();
  dates = await datesRepo.getDates();
  locations = await locationsRepo.getLocations();

  if (sessions.length === 0) {
    formContainer.innerHTML = addForm();
    form = document.querySelector("#form");
    form.addEventListener("submit", addSession);
    fillDateDropDown();
    fillLocationDropDown();
  } else {
    const scheduleDP = scheduleDropdown();
    scheduleSelector.innerHTML = scheduleDP;
    select = document.querySelector("#schedule-dropdown");
    select.addEventListener("change", handleScheduleDropdownChange);
  }
});

async function handleScheduleDropdownChange(event) {
  selectedSession = sessions.find(
    (sessions) => sessions.name === event.target.value
  );

  if (selectedSession && event.target.value !== "add") {
    formContainer.innerHTML = loadInfo();

    form = document.querySelector("#form");
    form.addEventListener("submit", updateSession);

    addPaperBtn = document.querySelector("#add-Paper");
    addPaperBtn.addEventListener("click", handleAddPaper);

    deleteSession = document.querySelector("#delete-Session");
    deleteSession.addEventListener("click", handleDeleteSession);

    if (selectedSession.papers.length > 0) {
      papers = await papersRepo.getAcceptedPapers();

      const paperFields = document.createElement("div");
      // paperFields.classList.add("papers-container");

      for (const sessionPaper of selectedSession.papers) {
        const paperHtml = await loadPapers(sessionPaper);
        paperFields.innerHTML += paperHtml;
      }

      form.appendChild(paperFields);
    }
  } else {
    formContainer.innerHTML = addForm();
    form = document.querySelector("#form");
    form.addEventListener("submit", addSession);
  }

  fillDateDropDown();
  fillLocationDropDown();
}

async function handleAddPaper() {
  const addPaperFields = document.createElement("div");
  addPaperFields.innerHTML = addPaper();
  const submitBtn = document.querySelector("#submit-btn");
  submitBtn.insertAdjacentElement("afterend", addPaperFields);
}

async function handleDeleteSession() {
  if (confirm(`Are you sure you want to delete this Session ?`)) {
    await confirmedDelete();
    await reloadPage();
  }
}

async function confirmedDelete() {
  const respone = await scheduleRepo.deleteSession(selectedSession.sessionID);

  alert(respone.successMessage || respone.errorMessage);
}

function fillPaperDropDown(id) {
  const paperDropDown = papers
    .map((paper) => {
      if (paper.paperID === id) {
        return `<option value="${paper.paperID}" selected>${paper.paperTitle}</option>`;
      } else {
        return `<option value="${paper.paperID}">${paper.paperTitle}</option>`;
      }
    })
    .join(" ");

  return paperDropDown;
}

function fillDateDropDown() {
  dateDropDown = document.querySelector("#date");

  dateDropDown.innerHTML += dates
    .map((date) => `<option value="${date.day}">${date.date}</option>`)
    .join(" ");

  if (selectedSession) {
    dateDropDown.value = selectedSession.date;
  }
}

function fillLocationDropDown() {
  locationDropDown = document.querySelector("#location");

  locationDropDown.innerHTML += locations
    .map(
      (location) =>
        `<option value="${location.locationID}">${location.location}</option>`
    )
    .join(" ");

  if (selectedSession) {
    locationDropDown.value = selectedSession.location;
  }
}

async function addSession(event) {
  try {
    event.preventDefault();
    const formCheck = event.target;
    const isFormValid = formCheck.checkValidity();
    if (!isFormValid) return;

    const newSchedule = formToObject(formCheck);

    const addedSchedule = await scheduleRepo.addSchedule(newSchedule);

    await reloadPage();
  } catch (error) {
    console.log(error.name + " | " + error.message);
  }
}

async function updateSession(event) {
  try {
    event.preventDefault();
    const formCheck = event.target;
    const isFormValid = formCheck.checkValidity();
    if (!isFormValid) return;

    if (validateTimeInputs()) {
      const updateSession = formToObject(formCheck);

      updateSession.sessionID = selectedSession.sessionID;

      const updated = await scheduleRepo.updateSession(updateSession);

      console.log(updated);
      await reloadPage();
    }
  } catch (error) {
    console.log(error.name + " | " + error.message);
  }
}

function formToObject(formElement) {
  const formData = new FormData(formElement);

  const data = {
    papers: [],
  };

  const regex = /\d+$/;

  for (const [key, value] of formData) {
    if (key.startsWith("paper")) {
      const paperNumber = key.match(regex)[0];
      const paper = data.papers[paperNumber - 1] || {};
      const newKey = key.replace(paperNumber, "");
      paper[newKey] = value;
      data.papers[paperNumber - 1] = paper;
    } else {
      data[key] = value;
    }
  }

  return data;
}

function validateTimeInputs() {
  let isValid = true;

  for (let i = 1; i <= paperNumber; i++) {
    const fromTimeInput = document.getElementById(`from-time-input${i}`);
    const toTimeInput = document.getElementById(`to-time-input${i}`);

    const fromTime = new Date(`1970-01-01T${fromTimeInput.value}:00`);
    const toTime = new Date(`1970-01-01T${toTimeInput.value}:00`);

    if (fromTime >= toTime) {
      alert(`Paper ${i}: Ending time must be after starting time.`);
      isValid = false;
      break;
    }

    for (let j = i + 1; j <= paperNumber; j++) {
      const otherFromTimeInput = document.getElementById(`from-time-input${j}`);
      const otherToTimeInput = document.getElementById(`to-time-input${j}`);

      const otherFromTime = new Date(
        `1970-01-01T${otherFromTimeInput.value}:00`
      );
      const otherToTime = new Date(`1970-01-01T${otherToTimeInput.value}:00`);

      if (
        (fromTime >= otherFromTime && fromTime < otherToTime) ||
        (toTime > otherFromTime && toTime <= otherToTime) ||
        (fromTime < otherFromTime && toTime > otherToTime)
      ) {
        alert(`Paper ${i} and Paper ${j}: Time slots cannot overlap.`);
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      break;
    }
  }

  return isValid;
}

async function reloadPage() {
  location.reload();
}

function scheduleDropdown() {
  return `
    <section class="dropdown">
        <label for="schedule-dropdown">Select a session</label>
        <select name="schedule" id="schedule-dropdown">
            <option value="" selected hidden>Select a session</option>
            <option value="add">+ Add a session</option>
            ${sessions
              .map(
                (session) =>
                  ` <option value="${session.name}">${session.name}</option>`
              )
              .join(" ")}
        </select>
    </section>
    `;
}

function loadInfo() {
  return `
      <h3>Edit a session</h3>
      <form action="" id="form">
          <label for="name">Session Name</label>
          <input type="text" name="name" id="name" value="${selectedSession.name}" required>

          <label for="location">Location</label>

          <select name="location" id="location" required>

          </select>

          <label for="date">Date</label>

          <select name="date" id="date" required>

          </select>

          <div class="btns">
            <button type="button" id="add-Paper" class="header-btns">Add Paper</button>
            <button type="button" id="delete-Session" class="header-btns">Delete session</button>
          </div>

          <input type="submit" value="Update" class="header-btns" id="submit-btn">
          <hr style="height: 3px;">
      </form>
    `;
}

function addForm() {
  return `
    <section class="form">
        <h3>Add a session</h3>
        <form action="" id="form">

            <label for="name">Session Name</label>
            <input type="text" name="name" id="name" required>

            <label for="location">Location</label>

            <select name="location" id="location" required>
                <option value="" selected hidden>Select a location</option>
            </select>

            <label for="date">Date</label>

            <select name="date" id="date" required>
                <option value="" selected hidden>Select a date</option>
            </select>

            <input type="submit" value="Add" class="header-btns" id="add-btn">

        </form>
    </section>
    `;
}

function addPaper() {
  const dbValue = fillPaperDropDown("");
  ++paperNumber;

  return `
  <section class="paper-container">
    <div>
      <select name="paperID${paperNumber}" id="paper" required>
        <option value="" selected hidden>Select a Paper</option>
        ${dbValue}
      </select>
    </div>

    <div>
      <label for="time-input">Select a time:</label>
      <input type="time" id="from-time-input${paperNumber}" name="paperFromTime${paperNumber}" min="09:00" max="17:00" step="1800">
    </div>
    
    <div>
      <label for="time-input">Select a time:</label>
      <input type="time" id="to-time-input${paperNumber}" name="paperToTime${paperNumber}"" min="09:00" max="17:00" step="1800">
    </div>
    </section>
  `;
}

async function loadPapers(sessionPaper) {

  const dbValue = fillPaperDropDown(sessionPaper.paperID);

  ++paperNumber;

  return `
  <section class="paper-container">
    <div>
      <select name="paperID${paperNumber}" id="paper" required>
          ${dbValue}
      </select>
    </div>

    <div>
      <label for="time-input">Select a time:</label>
      <input type="time" id="from-time-input${paperNumber}" name="paperFromTime${paperNumber}" min="09:00" max="17:00" step="1800" value="${sessionPaper.paperFromTime}">
    </div>
  
    <div>
      <label for="time-input">Select a time:</label>
      <input type="time" id="to-time-input${paperNumber}" name="paperToTime${paperNumber}" min="09:00" max="17:00" step="1800" value="${sessionPaper.paperToTime}">
    </div>
  </section>
  `;
}
