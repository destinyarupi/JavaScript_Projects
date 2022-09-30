// Gobal variables
const preview = document.querySelector('.preview');
const addTodo = document.querySelector('.addtodo');
const popUp = document.querySelector('.pop-up-bg');
const closeTodo = document.querySelector('.cancel');
const saveTodo = document.querySelector('.save');
const todoForm = document.querySelector('.input-fields');
const todoInput = document.querySelector('.input-fields input');
const cat = document.querySelector('.selected');
const heading = document.querySelector('.header h3');
const todo_list = document.querySelector('.todo-list');

// dropDown gobal variables
const dropdown = document.querySelector('.dropdown');
const select = dropdown.querySelector('.select');
const caret = dropdown.querySelector('.caret');
const menu = dropdown.querySelector('.menu');
const options = dropdown.querySelectorAll('label p');
const selected = dropdown.querySelector('.selected');

// getting item from localStorage
const todos = JSON.parse(localStorage.getItem('todoList')) || [];
let edit = false, editId;

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
            const toggle = document.querySelectorAll('.toggle');
            // onClick listener to toggle dark mode
            toggle.forEach( mode => {
                mode.addEventListener('click', () => {
                    // if dark mode has not been enabled, enable it else disable it
                    DarkMode.darkMode !== 'enabled' ? DarkMode.enableDarkMode() : DarkMode.disableDarkMode(); 
                    // get their darkMode setting
                    DarkMode.darkMode = localStorage.getItem('darkMode')
                });
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

// dropdown menu
let dropDown = {
    dropdownBtn: 
        select.addEventListener('click', e => {
            caret.classList.toggle('caret-rotate');
            menu.classList.toggle('menu-open');
        }),
    dropdownItems:
        options.forEach(option => {
            option.addEventListener('click', e => {
                selected.value = option.innerText;
                caret.classList.remove('caret-rotate');
                menu.classList.remove('menu-open');
                options.forEach(option => {
                    option.classList.remove('active')
                })
                option.classList.add('active')
            })
        })
}

// todoApp functionalities
let views = {
    todoCheck:
        window.addEventListener('load', e => {
            todos.length == 0 ? preview.style.display = 'block' : preview.style.display = 'none';
        }),
    addTodoBtn:
        addTodo.addEventListener('click', e => {
            todoInput.value = '';
            cat.value = '';
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            popUp.classList.add('show')
        }),
    closeTodoBtn: 
        closeTodo.addEventListener('click', e => {
            popUp.classList.remove('show');
        }),
    saveTodoBtn: 
        todoForm.addEventListener('submit', e => {
            e.preventDefault();
            let task = todoInput.value;
            let category = e.target.elements.category.value;
            if (task || category) {
                    todoData = {
                        task: task,
                        category: category,                
                        createdAt: new Date().toLocaleString(undefined, {dateStyle: 'medium', timeStyle: 'short'})
                    }
                    if (!edit) {
                        todos.push(todoData);
                    } else {
                        edit = false;
                        todos[editId] = todoData   
                    }
                    localStorage.setItem('todoList', JSON.stringify(todos));
                    todos.length == 0 ? preview.style.display = 'block' : preview.style.display = 'none';
                    closeTodo.click()
                    views.displayTodo()
            }
            e.target.reset();
        }),
    deleteTodo:
        (id) => {
            if (!document.body.classList.contains('dark')) {
                Swal.fire({
                    text: "Are you sure you want to delete this todo?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#e4b01b',
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel'
                  }).then((result) => {
                        // if the user confirms
                        if (result.isConfirmed) {
                            // array method to delete note based on the id of the note selected
                            todos.splice(id, 1)
                            localStorage.setItem('todoList', JSON.stringify(todos));
                            todos.length == 0 ? preview.style.display = 'block' : preview.style.display = 'none';
                            views.displayTodo()
                        }
                       
                })     
            } else {
                Swal.fire({
                    text: "Are you sure you want to delete this todo?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#e4b01b',
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel',
                    color: '#f5f3f3',
                    background: '#222831',
                  }).then((result) => {
                        // if the user confirms
                        if (result.isConfirmed) {
                            // array method to delete note based on the id of the note selected
                            todos.splice(id, 1)
                            localStorage.setItem('todoList', JSON.stringify(todos));
                            todos.length == 0 ? preview.style.display = 'block' : preview.style.display = 'none';
                            views.displayTodo()
                        }
                       
                })
            }
        },
    completedTodo:
        (done) => {
            let input = done.parentElement.firstElementChild
            let cross = done.parentElement.parentElement.firstElementChild.nextElementSibling
            !input.checked ? cross.style.textDecoration = 'line-through' : cross.style.textDecoration = 'none'
        },
    editTodo:
        (editTodo, id, category) => {
            addTodo.click()
            heading.innerText = 'Edit your Todo'
            todoInput.value = editTodo.parentElement.parentElement.firstElementChild.nextElementSibling.innerText;
            cat.value = category;
            edit = true;
            editId = id;
            views.displayTodo();
        },
    displayTodo:
        () => {
            let todo_item = ''
            todos.forEach((todo, id) => {
                todo_item += `
                    <div class="todo-item">
                        <label >
                            <input type="checkbox"/>
                            <span class="checkbox ${todo.category}" onclick="views.completedTodo(this)"></span>
                        </label>
                        <p class="todo">${todo.task}</p>
                        <div class="actions">
                            <button class="editBtn" onclick="views.editTodo(this, ${id}, '${todo.category}')"><i class="fa-regular fa-pen-to-square"></i></button>
                            <button class="delBtn" onclick="views.deleteTodo(${id})"><i class="fa-regular fa-trash-can"></i></button>
                        </div>
                    </div>
                `  
            })
            todo_list.innerHTML = todo_item
        } 

}



views.displayTodo()