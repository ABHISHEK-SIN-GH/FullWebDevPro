let canvas = document.querySelector('.canvas');

let menuCont = document.querySelector(".menu-icons");
let menuItems = document.querySelector(".menu-items");
let menuBtn = document.querySelector("#menu");
let closeBtn = document.querySelector("#close");

let pencilCont = document.querySelector('.pencil-cont');
let pencilBtn = document.querySelector('.pencil-btn');
let eraserCont = document.querySelector('.eraser-cont');
let eraserBtn = document.querySelector('.eraser-btn');
let stickyNoteBtn = document.querySelector('.sticky-note-btn');
let stickyNoteCont = document.querySelector('.sticky-notes');

stickyNoteBtn.addEventListener('click',()=>{
    let dragElementCont = document.createElement('div');
    dragElementCont.setAttribute("class","sticky-note-cont");
    dragElementCont.style.zIndex = 20;
    dragElementCont.innerHTML = `<div class="sticky-note-header" id="note-header" style="z-index: 21;">
                                    <span class="green" id="minimize"></span>
                                    <span class="red" id="remove"></span>
                                </div>
                                <div class="sticky-note-content">
                                    <textarea placeholder="Enter note here .."></textarea>
                                </div>`;
    stickyNoteCont.appendChild(dragElementCont);
    removeAndMinimize(dragElementCont);
    dragElement(dragElementCont);
})


let menuActive = true;
let pencilActive = false;
let eraserActive = false;

menuCont.addEventListener('click',()=>{
    if(menuActive){
        menuActive = false;
        inActiveMenu();
    }else{
        menuActive = true;
        activeMenu();
    }
});

pencilBtn.addEventListener('click',()=>{
    if(pencilActive){
        inActivePencilCont();
    }else{
        if(getComputedStyle(eraserCont).getPropertyValue("display")=="block"){
            inActiveEraserCont();
        }
        activePencilCont();
    }
});

eraserBtn.addEventListener('click',()=>{
    if(eraserActive){
        inActiveEraserCont();
    }else{
        if(getComputedStyle(pencilCont).getPropertyValue("display")=="block"){
            inActivePencilCont();
        }
        activeEraserCont();
    }   
});

canvas.addEventListener('click',()=>{
    if(pencilActive){inActivePencilCont()};
    if(eraserActive){inActiveEraserCont()}; 
});

function activePencilCont(){
    pencilActive = true;
    pencilCont.style.display = "block";
}

function inActivePencilCont(){
    pencilActive = false;
    pencilCont.style.display = "none";
}

function activeEraserCont(){
    eraserActive = true;
    eraserCont.style.display = "block";
}

function inActiveEraserCont(){
    eraserActive = false;
    eraserCont.style.display = "none";
}

function activeMenu(){
    menuBtn.classList.remove("inactive-menu");
    menuBtn.classList.add("active-menu");
    closeBtn.classList.add("inactive-menu");
    closeBtn.classList.remove("active-menu");
    menuItems.classList.add("menu-animation");
    menuItems.classList.add("active-menu");
    menuItems.classList.remove("inactive-menu");
}

function inActiveMenu(){
    menuBtn.classList.remove("active-menu");
    menuBtn.classList.add("inactive-menu");
    closeBtn.classList.add("active-menu");
    closeBtn.classList.remove("inactive-menu");
    menuItems.classList.remove("menu-animation");
    menuItems.classList.remove("active-menu");
    menuItems.classList.add("inactive-menu");
}

function removeAndMinimize(element){
    let minimizeBtn = element.querySelector('#minimize');
    let removeBtn = element.querySelector('#remove');
    minimizeBtn.addEventListener('click',()=>{
        let content = element.querySelector('.sticky-note-content');
        if(getComputedStyle(content).getPropertyValue("display")=="block"){
            content.style.display="none";
        }else{
            content.style.display="block";
        }
    });
    removeBtn.addEventListener('click',()=>{
        element.remove();
    });
}

function dragElement(dragEle) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (dragEle.querySelector('#note-header')) {
      /* if present, the header is where you move the DIV from:*/
      dragEle.querySelector('#note-header').onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      dragEle.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      dragEle.style.top = (dragEle.offsetTop - pos2) + "px";
      dragEle.style.left = (dragEle.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }