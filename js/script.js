// ======================
// STACK CONFIG
// ======================
const STACK_KEY = "home";

// ======================
// NAVIGATION
// ======================
document.querySelectorAll('[data-page]').forEach(element => {
    element.addEventListener('click', () => {
        const page = element.getAttribute('data-page');
        window.location.href = `pages/${page}.html`;
    });
});

// ======================
// SELECT ELEMENTS
// ======================
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressBar = document.getElementById("progressBar");
const inputs = document.querySelectorAll("input[type='text'], textarea");

// ======================
// LOAD DATA
// ======================
window.addEventListener("load", () => {

    // LOAD TASKS
    const savedTasks = JSON.parse(localStorage.getItem(`tasks_${STACK_KEY}`)) || [];
    checkboxes.forEach((cb, index) => {
        cb.checked = savedTasks[index] || false;
    });

    // LOAD INPUTS
    const savedInputs = JSON.parse(localStorage.getItem(`inputs_${STACK_KEY}`)) || [];
    inputs.forEach((input, index) => {
        if (savedInputs[index] !== undefined) {
            input.value = savedInputs[index];
        }
    });

    updateProgress();
});

// ======================
// SAVE TASKS
// ======================
checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        saveTasks();
        updateProgress();
    });
});

function saveTasks() {
    const data = [];
    checkboxes.forEach(cb => data.push(cb.checked));
    localStorage.setItem(`tasks_${STACK_KEY}`, JSON.stringify(data));
}

// ======================
// SAVE INPUTS
// ======================
inputs.forEach(input => {
    input.addEventListener("input", () => {
        saveInputs();
    });
});

function saveInputs() {
    const data = [];
    inputs.forEach(input => data.push(input.value));
    localStorage.setItem(`inputs_${STACK_KEY}`, JSON.stringify(data));
}

// ======================
// PROGRESS
// ======================
function updateProgress() {
    const total = checkboxes.length;
    let done = 0;

    checkboxes.forEach(cb => {
        if (cb.checked) done++;
    });

    const percent = total > 0 ? (done / total) * 100 : 0;
    progressBar.style.width = percent + "%";
}