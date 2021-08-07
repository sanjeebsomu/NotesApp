console.log("this is a note app for personal use");
showNotes(); //this is for when we reload our page all the notes will be shown up , without this statement notes will be vanished when we reload our page

//if user add a note then add it to the local storage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById('addTitle')
  let time;
  //here notes is an array
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
    time: new Date().toUTCString()
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  showNotes(); //calling shownotes function here when we hit the save button
});

//function to show elements from Local storage

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `<div class="noteCard my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
          <h6>${element.time}</h6>
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}"onclick = "deleteNote(this.id)" class="btn btn-primary">Delete This</button>
        </div>
      </div>`;
  });
  let notesElm = document.getElementById("notes"); //id notes is where we wanna store our notes
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to Show! Click above "Add Note" Button to add a Note`;
  }
}

//function to delete a note

function deleteNote(index) {
  console.log("i am deleting", index); //this function will be call when we click addBtn button
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

//search button

let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function(){
  
  let inputVal = searchTxt.value;
  console.log("Input Event Fired!", inputVal);
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function(element){
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    // console.log(cardTxt);
    if(cardTxt.includes(inputVal)){
      element.style.display = "block";
    }
    else{
      element.style.display = "none";
      
    }
  })
});

/*
1. add title
2. mark a note as important
3. separate note by user
4. sync and host to a webserver
*/