const form = document.querySelector("#form");
const addTimeBtn = document.querySelector("#add-time");
addTimeBtn.addEventListener("click", handleAddTime);
form.addEventListener("submit", formmmm);

async function handleAddTime() {
  const paperFields = document.createElement("div");
  paperFields.innerHTML += addTime();
  form.appendChild(paperFields);
}

function formmmm(event) {
  event.preventDefault();
  const formCheck = event.target;
  const isFormValid = formCheck.checkValidity();
  if (!isFormValid) return;

  const newSchedule = formToObject(formCheck);
}

function formToObject(formElement) {
  const formData = new FormData(formElement);
  const data = {};

  for (const [key, value] of formData) {
    data[key] = value;
  }

  console.log(data);

  return data;
}

function addTime() {
  return `
      <div>
        <label for="time-input">Select a time:</label>
        <input type="time" id="to-time-input" name="fromTime" min="09:00" max="17:00" step="1800">
      </div>
      <div>
        <label for="time-input">Select a time:</label>
        <input type="time" id="from-time-input" name="toTime" min="09:00" max="17:00" step="1800">
      </div>
    `;
}
