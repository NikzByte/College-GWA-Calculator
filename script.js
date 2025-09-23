function openTab(tabId) {
window.onload = function() {
  openTab('gwa-tab');
};

  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => tab.style.display = "none");
  document.getElementById(tabId).style.display = "block";
}
  const gwaSection = document.getElementById("gwa-section");
  if (tabId === "course-calculator") { 
    gwaSection.style.display = "none"; 
  } else { 
    gwaSection.style.display = "block"; 
  }

const form = document.getElementById("subject-form");
const tableBody = document.querySelector("#subject-table tbody");
const calculateBtn = document.getElementById("calculate-btn");
const resultDisplay = document.getElementById("result");

let subjects = [];


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const subject = document.getElementById("subject").value;
  const grade = parseFloat(document.getElementById("grade").value);
  const units = parseInt(document.getElementById("units").value);

  subjects.push({ subject, grade, units });
  updateTable();

  form.reset();
});

function updateTable() {
  tableBody.innerHTML = "";
  subjects.forEach((s, index) => {
    const row = `<tr>
      <td>${s.subject}</td>
      <td>${s.grade.toFixed(2)}</td>
      <td>${s.units}</td>
      <td><button onclick="removeSubject(${index})">Delete</button></td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

function removeSubject(index) {
  subjects.splice(index, 1);
  updateTable();
}

calculateBtn.addEventListener("click", () => {
  if (subjects.length === 0) {
    resultDisplay.textContent = "Please add at least one subject.";
    return;
  }

  let totalWeighted = 0;
  let totalUnits = 0;

  subjects.forEach((s) => {
    totalWeighted += s.grade * s.units;
    totalUnits += s.units;
  });

    const gwa = totalWeighted / totalUnits;


    const system = document.getElementById("grading-system").value;
    let status = "";
    if (system === "Descending") {
    // 1.00 = highest
    if (gwa <= 1.75) status = "Congratulations! You are a Dean’s Lister!";
    else if (gwa <= 3.00) status = "Congratulations! You've received a Passing Grade!";
    else status = "Needs a little Improvement...";
    } else {
    // Reversed: 5.00 = highest
    if (gwa >= 4.25) status = "Congratulations! You are a Dean’s Lister!";
    else if (gwa >= 2.50) status = "Congratulations! You've received a Passing Grade!";
    else status = "Needs a little Improvement...";
  }

  resultDisplay.textContent = `Your GWA is ${gwa.toFixed(2)} - ${status}`;
});