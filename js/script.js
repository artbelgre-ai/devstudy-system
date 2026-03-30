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

// ======================
// LOAD DATA
// ======================
window.addEventListener("load", () => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];

    checkboxes.forEach((cb, index) => {
        if (saved[index]) cb.checked = true;
    });

    updateProgress();
});

// ======================
// SAVE + UPDATE
// ======================
checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        saveTasks();
        updateProgress();
    });
});

function saveTasks() {
    const data = [];

    checkboxes.forEach(cb => {
        data.push(cb.checked);
    });

    localStorage.setItem("tasks", JSON.stringify(data));
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

    const percent = (done / total) * 100;
    progressBar.style.width = percent + "%";
}