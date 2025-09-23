// ================= TAB HANDLER =================
function openTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => tab.style.display = "none");
  document.getElementById(tabId).style.display = "block";
}

// ================= OVERALL GWA CALCULATOR =================
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
    if (gwa <= 1.75) status = "Congratulations! You are a Dean’s Lister!";
    else if (gwa <= 3.00) status = "Congratulations! You've received a Passing Grade!";
    else status = "Needs a little Improvement...";
  } else {
    if (gwa >= 4.25) status = "Congratulations! You are a Dean’s Lister!";
    else if (gwa >= 2.50) status = "Congratulations! You've received a Passing Grade!";
    else status = "Needs a little Improvement...";
  }

  resultDisplay.textContent = `Your GWA is ${gwa.toFixed(2)} - ${status}`;
});

// ================= COURSE GWA CALCULATOR =================
const courseForm = document.getElementById("course-form");
const courseTableBody = document.querySelector("#course-table tbody");
const calculateCourseBtn = document.getElementById("calculate-course-btn");
const courseResultDisplay = document.getElementById("course-result");
let components = [];

courseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("component-name").value.trim();
  const weight = parseFloat(document.getElementById("component-weight").value);
  const score = parseFloat(document.getElementById("component-score").value);
  const total = parseFloat(document.getElementById("component-total").value);


  if (!name || isNaN(weight) || isNaN(score) || isNaN(total)) {
    alert("⚠️ Please fill in all fields correctly.");
    return;
  }

  if (score > total) {
    alert("⚠️ Score cannot be higher than Total Score!");
    return;
  }

  const percentage = (score / total) * 100;

  components.push({ name, weight, score, total, percentage });
  console.log("✅ Component added:", components); 

  updateCourseTable();
  courseForm.reset(); 
});

function updateCourseTable() {
  courseTableBody.innerHTML = "";
  components.forEach((c, index) => {
    const row = `<tr>
      <td>${c.name}</td>
      <td>${c.weight.toFixed(2)}%</td>
      <td>${c.score}</td>
      <td>${c.total}</td>
      <td>${c.percentage.toFixed(2)}%</td>
      <td><button onclick="removeComponent(${index})">Delete</button></td>
    </tr>`;
    courseTableBody.innerHTML += row;
  });
}

function removeComponent(index) {
  components.splice(index, 1);
  console.log("❌ Component removed:", components); // Debug log
  updateCourseTable();
}

calculateCourseBtn.addEventListener("click", () => {
  if (components.length === 0) {
    courseResultDisplay.textContent = "Please add at least one component.";
    return;
  }

  let totalWeighted = 0;
  let totalWeight = 0;

  components.forEach((c) => {
    totalWeighted += (c.percentage * c.weight) / 100;
    totalWeight += c.weight;
  });

  // Normalize to percentage
  const finalPercentage = totalWeighted / (totalWeight / 100);

  const system = document.getElementById("course-grading-system").value;
  let finalGrade;

  if (system === "Descending") {
    // Convert 100% → 1.00, 0% → 5.00
    finalGrade = 5 - (finalPercentage / 100) * 4;
  } else {
    // Convert 100% → 5.00, 0% → 1.00
    finalGrade = 1 + (finalPercentage / 100) * 4;
  }

  let status = "";
  if (system === "Descending") {
    if (finalGrade <= 1.75) status = "Congratulations! You are a Dean’s Lister!";
    else if (finalGrade <= 3.00) status = "Congratulations! You've received a Passing Grade!";
    else status = "Needs a little Improvement...";
  } else {
    if (finalGrade >= 4.25) status = "Congratulations! You are a Dean’s Lister!";
    else if (finalGrade >= 2.50) status = "Congratulations! You've received a Passing Grade!";
    else status = "Needs a little Improvement...";
  }

  courseResultDisplay.textContent =
    `Your Final Grade is ${finalGrade.toFixed(2)} - ${status}`;
});
