// Navegação
document.querySelectorAll('[data-page]').forEach(element => {
    element.addEventListener('click', () => {
        const page = element.getAttribute('data-page');
        window.location.href = `pages/${page}.html`;
    });
});

// Progresso
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(cb => {
    cb.addEventListener('change', updateProgress);
});

function updateProgress() {
    const total = checkboxes.length;
    let done = 0;

    checkboxes.forEach(cb => {
        if (cb.checked) done++;
    });

    const percent = (done / total) * 100;
    document.getElementById("progressBar").style.width = percent + "%";
}