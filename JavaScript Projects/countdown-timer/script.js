const days = document.getElementById('days'),
hours = document.getElementById('hours'),
minutes = document.getElementById('minutes'),
seconds = document.getElementById('seconds');

const year = new Date().getFullYear();

const birthday = new Date(`August 1 ${year + 1} 00:00:00`)


countdownTimer = () => {
    const currentday = new Date();
    const diff = birthday - currentday;
   
    const d = Math.floor(diff / 1000/60/60/24);
    const h = Math.floor(diff / 1000/60/60) % 24;
    const m = Math.floor(diff / 1000/60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    days.innerText =  d < 10 ? '0' + d : d;
    hours.innerText = h < 10 ? '0' + h : h;
    minutes.innerText = m < 10 ? '0' + m : m;
    seconds.innerText = s < 10 ? '0' + s : s;
}

setInterval(countdownTimer, 1000);