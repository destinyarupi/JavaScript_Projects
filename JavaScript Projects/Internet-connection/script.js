const wrapper = document.querySelector('.wrapper'),
toast = wrapper.querySelector('.toast'),
wifiIcon = wrapper.querySelector('.icon'),
title = wrapper.querySelector('span'),
closeBtn = wrapper.querySelector('.close-icon')

window.onload = () => { 
    function ajax(){
        let xhr = new XMLHttpRequest
        xhr.open("GET", 'https://jsonplaceholder.ir/posts', true); 
        xhr.onload = () => { 
            if(xhr.status == 200 && xhr.status < 300){
                online()
            } else{ 
                offline()
            }
        }
        xhr.onerror = () => {
            offline()
        }
        xhr.send();
    }
    function online(){
        toast.classList.remove('offline');
        wifiIcon.classList.remove('offline');
        wifiIcon.innerHTML = '<img src="https://img.icons8.com/ios-glyphs/30/000000/online.png"/>'
        document.querySelector('p').innerText = 'Your internet connection is up!'
    }
    function offline(){
        toast.classList.add('offline');
        wifiIcon.classList.add('offline');
        wifiIcon.innerHTML = '<img src="offline.png"/>'
        document.querySelector('p').innerText = 'Your internet Connection is down.'
    }
    setInterval(() => {
        ajax();        
    }, 100);
    closeBtn.onclick = () => {
        wrapper.style.display = 'none'
    }

}

