
// Navbar 1
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", navToggle);

function navToggle() {
   navToggler.classList.toggle("active");
   const nav = document.querySelector(".nav");
   nav.classList.toggle("open");
   if(nav.classList.contains("open")){
       nav.style.maxHeight = nav.scrollHeight + "px";
   }
   else{
       nav.removeAttribute("style");
   }
} 

//Steps
//1. add event listener to your hamburger button
//2. use classlist.toggle to set the properties of the css class active


const btn = document.getElementById("btn")
const nav = document.getElementById("nav3")

btn.addEventListener('click', () => {
    nav.classList.toggle('active3'); 
    btn.classList.toggle("active3");
});

