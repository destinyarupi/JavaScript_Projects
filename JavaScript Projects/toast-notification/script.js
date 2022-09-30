
const showToast = document.getElementById('btn');
const toast = document.getElementById('toast');
const closeToast = document.getElementById('close')

showToast.addEventListener('click', ()=>{
    toast.style.transform = 'translateX(0)'
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)'
    }, 4000);
})

closeToast.addEventListener('click', ()=>{
    toast.style.transform = 'translateX(400px)'
})

// or you can use display property then use aos for how the toast transitions on the page

        
            