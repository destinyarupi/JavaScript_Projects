// Global variables
const main = document.querySelector('main');
const searchBar = document.querySelector('.search-wrapper');
const search = document.querySelector('.search-bar');
const preview = document.querySelector('.preview');
const text_editor = document.querySelector('.text-editor');
const notesCardHolder = document.querySelector('.container');

const addNoteBtn = document.querySelector('.addNote');
const returnBtn = document.querySelector('.form-head i');
const saveBtn = document.querySelector('.saveNote');

const noteTitle = document.querySelector('.title input');
const noteBody = document.querySelector('textarea');
const MediaQuery = matchMedia(' (min-width: 768px) ');

// getting saved items from localStorage and parsing them to js obj else passing an empty array
const notes = JSON.parse(localStorage.getItem('notepad') || '[]');
console.log(notes.sort((a, b) => {
    return new Date(a.updated) > new Date(b.updated) ? 1 : 1
}))
let edit = false, editId;

// Dark Mode functions
let DarkMode = {
    // variables
    darkMode: localStorage.getItem('darkMode'),
    noteImgSmall: document.querySelector('.add-icon-small'),
    // function to enable dark mode
    enableDarkMode: 
        () => {
            // add the class to the body
            document.body.classList.add('dark');
            // update darkMode in localStorage
            localStorage.setItem('darkMode', 'enabled');
            // statement to change src img 
            document.body.classList.contains('dark') ? DarkMode.noteImgSmall.src = 'icons8-notes-64-white.png' : '';
        },
    // function to disable dark mode
    disableDarkMode: 
        () => {
            // remove the class from the body
            document.body.classList.remove('dark');
            // update darkMode in localStorage 
            localStorage.setItem('darkMode', 'disabled');
            // statement to change src img back
            !document.body.classList.contains('dark') ? DarkMode.noteImgSmall.src = 'icons8-notes-64.png' : '';
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

// App functionalities
let views = {
    // check to see if there are any saved notes on page in order to display the preview page or not
    notesCheck:
        window.addEventListener('load', (event) => {
            const ifMatchesChange = e => {
                if (!e.matches) {
                    notes.length == 0 ? preview.style.display = 'block' : 'none';
                } 
            };
            // calling the medaiQuery function
            MediaQuery.addListener( ifMatchesChange );
            ifMatchesChange( MediaQuery );
        }),
    // to add new notes
    addNoteBtn:
        addNoteBtn.addEventListener('click', () => {
            // rendering elements on page
            text_editor.classList.add('show');
            addNoteBtn.classList.add('hide');
            // media query function for rendering elements
            const ifMatchesChange = e => {
                // if screen min-width: 768px
                if (e.matches) {
                    searchBar.style.display = 'block';
                    notesCardHolder.style.display = 'block';
                    preview.style.display = 'none';
                } // else
                else {
                    searchBar.style.display = 'none'; 
                    notesCardHolder.style.display = 'none';
                    preview.style.display = 'none';
                } 
            };
            // calling the medaiQuery function
            MediaQuery.addListener( ifMatchesChange );
            ifMatchesChange( MediaQuery );
        }),
    // to close notes
    closeNoteBtn: 
        returnBtn.addEventListener('click', () => {
            // rendering elements on page
            edit = false;
            noteTitle.value = '';
            noteBody.value = '';
            text_editor.classList.remove('show');
            addNoteBtn.classList.remove('hide');
            // media query function for rendering elements
            const ifMatchesChange = e => {
                // if screen min-width: 768px
                if (e.matches) { 
                    preview.style.display ='block';
                } // else
                else {
                    searchBar.style.display = 'block';
                    notesCardHolder.style.display = 'block';  
                    notes.length == 0 ? preview.style.display = 'block' : 'none';
                }
            }
            // calling the medaiQuery function
            MediaQuery.addListener( ifMatchesChange );
            ifMatchesChange( MediaQuery );
        }),
    // to save new notes
    saveNoteBtn:
        saveBtn.addEventListener('click', (e) => {
            // grabbing the values of the input field and textarea
            let title = noteTitle.value,
            body = noteBody.value
            // statement to prevent saving note unless title or body field is filled
            if (title || body) {
                // note data saved to localStorage in an object
                let noteData = {
                    title: title,
                    body: body,
                    updated: new Date().toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })
                }
                // statement to add new note or update existing note baseed on the noteID
                if(!edit){
                    notes.push(noteData);
                } else {
                    edit = false;
                    notes[editId] = noteData;
                } 
                // closing the notepad after saving/without saving
                returnBtn.click();
                views.showNotes();
            }
            // prevents default reload on form submission
            e.preventDefault()
        }),
    // to search notes
    searchNotes:
        search.addEventListener('keyup', () => {
            // variables
            const keyword = search.value
            const allNotes = document.querySelectorAll('.note')
            const noteName = notesCardHolder.querySelectorAll('.details p')

            for (let i = 0; i < noteName.length; i++) {
                let match = allNotes[i].querySelectorAll('.details p')[0]
                if (match) {
                    let textValue = match.textContent ||match.innerHTML
                    if (textValue.indexOf(keyword) > -1) {
                        allNotes[i].style.display = '';
                    } else {
                        allNotes[i].style.display = 'none';
                    }
                } 
            }
        }),
    // to delete notes
    deleteNoteBtn: 
        (id) => { 
            // pop-up modal to confirm note deletion
            Swal.fire({
                text: "Are you sure you want to delete this note?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#706fc8',
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel',
              }).then((result) => {
                    // if the user confirms
                    if (result.isConfirmed) {
                        // array method to delete note based on the id of the note selected
                        notes.splice(id, 1)
                        localStorage.setItem('notepad', JSON.stringify(notes));
                        // function to display screen back showing all notes
                        const ifMatchesChange = e => {
                            if (!e.matches) {
                                notes.length == 0 ? preview.style.display = 'block' : 'none';
                            } 
                        };
                        // calling the medaiQuery function
                        MediaQuery.addListener( ifMatchesChange );
                        ifMatchesChange( MediaQuery );
                        views.showNotes()
                    }
            })
        },
    // to edit notes
    editNotes:
        (editNote, id) => {
            // function to display the note contents
            addNoteBtn.click();
            // grabbing the values of the note after clciking for editing
            noteTitle.value = editNote.firstElementChild.innerText 
            noteBody.value = editNote.lastElementChild.innerText 
            // checking the note ID
            edit = true;
            editId = id;
            // function to display screen back showing all notes
            views.showNotes();
        },
    // function to display saved notes 
    showNotes: 
        showNotes = () => {
            document.querySelectorAll('.note').forEach(note => note.remove());
            // looping through each of the notes in the array and displaying their contents dynamically
            notes.forEach((note, id) => {
                // innerHTML
                let eachNote =`
                    <div class="note">
                        <div class="details" onclick="views.editNotes(this, ${id})">
                            <p>${note.title}</p>
                            <span>${note.body}</span>
                        </div>
                        <div class="bottom-content">
                            <span class="dateTime">${note.updated}</span>
                            <div id="settings" onclick="views.deleteNoteBtn(${id})">
                                <i class="fa-regular fa-trash-can"></i>
                            </div>
                        </div>
                    </div>`
                // inserting the innerHTML on the page
                notesCardHolder.insertAdjacentHTML('afterbegin', eachNote)
            });
        },
    // function for displaying date and time on page
    date_time: 
        () => {
            // variables
            const date_time = new Date().toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' });
            const dateTime = document.querySelectorAll('.dateTime');
            // used to display the date and time above the text editor of the notes
            dateTime.forEach( Datetime => {
                Datetime.innerText = date_time
            });
        },
}
// calling the views functions
views.showNotes();
views.date_time();

    

