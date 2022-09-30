setInterval(() => {
    const clock = document.getElementById('time');
    const time = new Date()
    let hours = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    sec = sec < 10 ? '0' + sec : sec
    min = min < 10 ? '0' + min : min
    const day = hours >= 12 ? 'PM' : 'AM'
    clock.textContent = hours + ':' + min + ':' + sec + ' ' + day
}, );

