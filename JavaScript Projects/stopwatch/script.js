// Global variables
const minutesContainer = document.getElementById('minutes');
const secondsContainer = document.getElementById('seconds');
const millisecondsContainer = document.getElementById('milliseconds');

const start =  document.getElementById('start');
const pause =  document.getElementById('pause');
const reset =  document.getElementById('reset');

let minutes = 00;
let seconds = 00;
let milliseconds = 00;
let interval;


const startTimer = () => {
    clearInterval(interval);
    interval = setInterval(startWatch, 10);
}

const pauseTimer = () => {
    clearInterval(interval);
}

const resetTimer = () => {
    minutes = 0;
    seconds = 0;
    milliseconds = 0;

    minutesContainer.innerText = '00:'
    secondsContainer.innerText = '00:'
    millisecondsContainer.innerText = '00'
    clearInterval(interval)
}

startWatch = () => {
    // milliseconds
    milliseconds++;
    if (milliseconds < 9) {
        millisecondsContainer.innerText = `0${milliseconds}`
    } 
    else if (milliseconds > 99) {
        milliseconds = 0;
        millisecondsContainer.innerText = '00';
        seconds++;
    }
    else {
        millisecondsContainer.innerText = milliseconds
    }

    // seconds
    if (seconds < 10) {
        secondsContainer.innerText =`0${seconds}:`
    } 
    else if (seconds > 59) {
        minutes++
        seconds = 0;
        secondsContainer.innerText = '00:';
    }
    else {
        secondsContainer.innerText = `${seconds}:`
    }

    // minutes
    if (minutes < 10) {
        minutesContainer.innerText =`0${minutes}:`
    } 
    else {
        minutesContainer.innerText = `${minutes}:`
    }
}

start.addEventListener('click', startTimer);
pause.addEventListener('click', pauseTimer);
reset.addEventListener('click', resetTimer);
