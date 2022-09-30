// Steps
// 1. set the popup display to none in your css
// 2. add event listener on button to show popup
// 3. add event listener on another button to close popup

const open = document.getElementById("open");
const close = document.getElementById("close");
const container = document.getElementById("container");

open.addEventListener("click", () => {
    container.classList.add("active");
});

close.addEventListener("click", () => {
    container.classList.remove("active");
});
