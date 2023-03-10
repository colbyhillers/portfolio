import { closeEntryForm } from "./helper.js";

window.addEventListener("DOMContentLoaded", init);

let localData;
let indexTrack = 0;

window.deleteEntry = deleteEntry;
window.editEntry = editEntry;

function init() {
    let entryModal = document.getElementById("journal-entry");
    let addEntryBtn = document.getElementById("add-entry");
    let cancelEntryBtn = document.getElementById("cancel-entry");
    let submitEntryBtn = document.getElementById("submit-entry");
    localData = JSON.parse(localStorage.getItem("localEntries")) || [];

    addEntryBtn.addEventListener("click", () => {
        document.getElementById("submit-entry").innerText = "Submit";
        entryModal.showModal();
    });

    submitEntryBtn.addEventListener("click", submitEntry);

    cancelEntryBtn.addEventListener("click", closeEntryForm);
    listEntries();
}

function deleteEntry(index) {
    console.log(index)
    localData.splice(index, 1);
    localStorage.setItem("localEntries", JSON.stringify(localData));
    listEntries();
}

function editEntry(ind) {
    console.log(ind);
    localData = JSON.parse(localStorage.getItem("localEntries")) || [];

    document.getElementById("eentry-form").reset();
    document.getElementById("eentry-name").value = localData[ind].name;
    document.getElementById("eentry-date").value = localData[ind].date;
    document.getElementById("eentry-summary").value = localData[ind].summary;
    document.getElementById("ejournal-entry").showModal();

    document.getElementById("esubmit-entry").addEventListener("click", () =>{
        let newEntry = {
            name: document.getElementById("eentry-name").value,
            date: document.getElementById("eentry-date").value,
            summary: document.getElementById("eentry-summary").value
        };
    
        console.log(newEntry);
    
        if(!newEntry.name || !newEntry.date || !newEntry.summary) {
            alert("Missing fields!");
        } else {
            deleteEntry(ind);
            localData.push(newEntry);
            localStorage.setItem("localEntries", JSON.stringify(localData));
    
            closeEntryForm();
            listEntries();
        }
    })
}

function submitEntry(e) {
    e.preventDefault();
    let newEntry = {
        name: document.getElementById("entry-name").value,
        date: document.getElementById("entry-date").value,
        summary: document.getElementById("entry-summary").value
    };

    if(!newEntry.name || !newEntry.date || !newEntry.summary) {
        alert("Missing fields!");
    } else {
        localData.push(newEntry);
        localStorage.setItem("localEntries", JSON.stringify(localData));

        closeEntryForm();
        listEntries();
    }
}

function listEntries() {
    document.getElementById("rendered-entries").innerHTML = "";
    for(let i = 0; i < localData.length; i++) {
        let renderEntry = document.getElementById("rendered-entries");
        renderEntry.insertAdjacentHTML("afterbegin", createEntryHTML(i));
    }
}

function createEntryHTML(entry) {
    let entryHTML = `<div>
                            <h2 id="entry">${localData[entry].name}</h2>
                            <p id="date">${localData[entry].date}</p>
                            <p id="summary">${localData[entry].summary}</p>
                            <p>
                                <span onclick=\"editEntry(${entry})\">Edit</span>
                                <span onclick=\"deleteEntry(${entry})\">Remove</span>
                            <p>
                    </div>`;

    return entryHTML;
}