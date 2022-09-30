const toggle = document.getElementById('toggle');
const button = document.querySelector('indicator')
const body = document.querySelector('body');


toggle.addEventListener("click", () => {
    document.body.classList.toggle('dark');
    toggle.classList.toggle('dark');
    button.classList.toggle('dark');
});
