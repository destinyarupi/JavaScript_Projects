const actions = Array.from(document.querySelectorAll('[data-action]'));

let counter = 0 
document.querySelector('.counter-value').innerText = counter

actions.forEach(action => {
    action.addEventListener('click', () => {
        const type = action.dataset.action;
        if (type == 'increase') {
            counter++
        } else if (type == 'decrease') {
            counter--
        } else if (type == 'reset') {
            counter = 0
        }
        document.querySelector('.counter-value').innerText = counter
    })
})