console.log("welcome to note taking website..");

showNotes();

// Add event Listener after clicking Add note button Our content which is in the form of text is
//stored into the array(we converted into object using JSON.parse);


let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let myObj={
        title:addTitle.value,
        text:addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();
});


// this function is used to show the content inside the localStorage...
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="cardNote card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>
        `
    });
    let noteElement=document.getElementById("notes");
    if(notesObj.length!=0)
    {
        noteElement.innerHTML=html;
    }else{
        noteElement.innerHTML=`Empty Add your notes in "Add your note" area section:)`;
    }
}
function deleteNote(index){
    console.log("I am deleting this note",index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}

let search=document.getElementById("searchTxt");
search.addEventListener('input',function(){
    let inputVal=search.value;
    let noteCards=document.getElementsByClassName("cardNote");
    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }else{
            element.style.display="none";
        }
    })
});

/*
Further features:
1) Add title.
2) Make a note as Important.
3) Separate notes by user.
4) Sync and host to web-server.
*/