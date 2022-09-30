const display = document.querySelector("input");
const button = document.querySelector("button");
const copyBtn = document.querySelector("span.far");
const copyActive = document.querySelector("span.fas");
let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";

button.addEventListener('click', () => {
    let i,
    randomPassword = "";
    copyBtn.style.display = "block";
    copyActive.style.display = "none";
    for (i = 0; i < 16; i++) {
        randomPassword = randomPassword + chars.charAt(
            Math.floor(Math.random() * chars.length)
        );
    }
    display.value = randomPassword;
});

copy = () => {
    copyBtn.style.display = "none";
    copyActive.style.display = "block";
    display.select();
    document.execCommand("copy");
};   

copyBtn.addEventListener('click', () => {
    copy()
});

copyActive.addEventListener('click', () => {
    copy()
});
