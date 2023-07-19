let titles = [];
let notes = [];
let deletedTitles = [];
let deletedNotes = [];
load();
loadDeleted();

function render() {
    let content = document.getElementById('spaceForNotes');
    let newNoteSection = document.getElementById('newNoteSection');

    newNoteSection.innerHTML = `
    <div class="newNoteBox">
        <div class="layout visuals position-relative">
            <a href="javascript:showDeletedNotes(renderDeleted())"><img class="trashcan" src="./img/trashcan.svg"></a>
            <h2>Add a new note</h2>
            <input class="" id="newNoteTitle" placeholder="Title" />
            <textarea class="" id="newNoteValue" placeholder="Take a note..."></textarea>
            <button class="" onclick="newNote()">Save</button>
        </div>
    </div>
    `;

    content.innerHTML = '';
    content.innerHTML += `<h1>My Notes</h1>`;

    for (let i = 0; i < titles.length; i++) {
        content.innerHTML += `
        <div class="visuals margin-side">
            <b>${titles[i]}</b><br>
            ${notes[i]}<br>
            <button onclick="deleteNote(${i})">Delete</button>
        </div>
        `;
    }
}


function renderDeleted(){
    let deletedContent = document.getElementById('deletedNoteSection');

    deletedContent.innerHTML = '';
    deletedContent.innerHTML += `<h1>My Deleted Notes</h1>`;

    for (let i = 0; i < deletedTitles.length; i++){
        deletedContent.innerHTML +=`
        <div class="visuals margin-side">
            <b>${deletedTitles[i]}</b><br>
            ${deletedNotes[i]}<br>
            <button onclick="deletePerma(${i})">Delete permanently</button>
        </div>
        `;
    }
}


function newNote() {
    let newNoteTitle = document.getElementById('newNoteTitle');
    let newNoteValue = document.getElementById('newNoteValue');

    if (newNoteTitle.value === "" || newNoteTitle.value == null) {
        alert("A title is required to proceed!");
    }
    else if (newNoteValue.value === "" || newNoteValue.value == null) {
        alert("A description is required to proceed!");
    }
    else {
        titles.push(newNoteTitle.value);
        notes.push(newNoteValue.value);

        render();
        save();

        document.getElementById('newNoteTitle').value = '';
        document.getElementById('newNoteValue').value = '';
    }
}


function save() {
    let newNoteSave = JSON.stringify(titles);
    let newValueSave = JSON.stringify(notes);

    localStorage.setItem('noteTitles', newNoteSave);
    localStorage.setItem('noteValues', newValueSave);
}


function load() {
    let noteTitleLoad = localStorage.getItem('noteTitles');
    let noteValueLoad = localStorage.getItem('noteValues');

    if (noteTitleLoad && noteValueLoad) {
        titles = JSON.parse(noteTitleLoad);
        notes = JSON.parse(noteValueLoad);
    }
}


function deleteNote(i) { 
    deletedTitles.push(titles[i]);
    deletedNotes.push(notes[i]);
    
    saveDeleted();

    titles.splice(i, 1);
    notes.splice(i, 1);


    render();
    save();
}


function saveDeleted(){
    let deleteTitleSave = JSON.stringify(deletedTitles);
    let deleteNoteSave = JSON.stringify(deletedNotes);

    localStorage.setItem('deletedTitles', deleteTitleSave);
    localStorage.setItem('deletedNotes', deleteNoteSave);
}


function loadDeleted(){
    let deleteTitleLoad = localStorage.getItem('deletedTitles');
    let deleteNoteLoad = localStorage.getItem('deletedNotes');

    if (deleteTitleLoad && deleteNoteLoad){
        deletedTitles = JSON.parse(deleteTitleLoad);
        deletedNotes = JSON.parse(deleteNoteLoad);
    }
}


function showDeletedNotes(){
    document.getElementById('deletedSection').classList.remove('d-none');
}