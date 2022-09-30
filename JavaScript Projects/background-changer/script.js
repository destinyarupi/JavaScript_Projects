const btn = document.getElementById("btn");
const text = document.getElementById('text')

btn.addEventListener("click", () => {
    document.body.style.background = randomBg();
    text.innerText = randomBg()
});

function randomBg() {
    return `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
}
