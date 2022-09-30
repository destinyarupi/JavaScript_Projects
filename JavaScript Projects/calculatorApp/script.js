
// Dark Mode functions
let DarkMode = {
    // variables
    darkMode: localStorage.getItem('darkMode'),
    // function to enable dark mode
    enableDarkMode: 
        () => {
            // add the class to the body
            document.body.classList.add('dark');
            // update darkMode in localStorage
            localStorage.setItem('darkMode', 'enabled');
        },
    // function to disable dark mode
    disableDarkMode: 
        () => {
            // remove the class from the body
            document.body.classList.remove('dark');
            // update darkMode in localStorage 
            localStorage.setItem('darkMode', 'disabled');
        },
    // When someone clicks the toggle button
    toggleMode: 
        () => {
            const toggle = document.querySelector('#toggle');
            // onClick listener to toggle dark mode
            toggle.addEventListener('click', () => {
                // if dark mode has not been enabled, enable it else disable it
                DarkMode.darkMode !== 'enabled' ? DarkMode.enableDarkMode() : DarkMode.disableDarkMode(); 
                // get their darkMode setting
                DarkMode.darkMode = localStorage.getItem('darkMode')
            });
        },   
    // If the user has already visited and enabled darkMode start things off with it on else leave it off
    modeCheck: 
        () => {
            DarkMode.darkMode === 'enabled' ? DarkMode.enableDarkMode() : DarkMode.disableDarkMode();
        },
}
// calling the darkMode functions
DarkMode.toggleMode();
DarkMode.modeCheck();

// calculator
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

buttons.forEach((item) => {
    item.onclick = () => {
        if (item.id == 'clear') {
            display.innerText = ''
        } 
        else if (item.id == 'backspace') {
            let string = display.innerText.toString();
            display.innerText = string.substr(0, string.length - 1);
        } 
        else if (item.id == 'percent') {
            display.innerText = display.innerText / 100
        } 
        else if (item.id == 'negative') {
            display.innerText = display.innerText * -1
        }
        else if (display.innerText != '' && item.id == 'equal') {
            display.innerText = eval(display.innerText)
        } 
        else if (display.innerText == '' && item.id == 'equal') {
            display.innerText = ''
        } 
        else {
            display.innerText += item.id
        }
    }
})



