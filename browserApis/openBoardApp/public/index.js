let canvas = document.querySelector('.canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let lineWidthValue = "2";
let eraserWidthValue = "5";
let lineColorValue = "black";
let eraseColorValue = "bisque";
let mouseDown = false;
ctx.fillStyle = 'bisque';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fill();

let undoRedoTracker = [];
let tracker = 0;

let url = canvas.toDataURL();
undoRedoTracker.push(url);

let lineWidth = document.querySelector('#lineWidth');
let lineColorRange = document.querySelector(".pencil-color-range");
let lineColorRanges = document.querySelectorAll(".pencil-color-range>span");
let eraserWidth = document.querySelector('#eraserWidth');

let menuCont = document.querySelector(".menu-icons");
let menuItems = document.querySelector(".menu-items");
let menuBtn = document.querySelector("#menu");
let closeBtn = document.querySelector("#close");

let pencilCont = document.querySelector('.pencil-cont');
let pencilBtn = document.querySelector('.pencil-btn');
let eraserCont = document.querySelector('.eraser-cont');
let eraserBtn = document.querySelector('.eraser-btn');

let refreshBtn = document.querySelector('.refresh-btn');
let downloadBtn = document.querySelector('.download-btn');
let uploadBtn = document.querySelector('.upload-btn');
let undoBtn = document.querySelector('.undo-btn');
let redoBtn = document.querySelector('.redo-btn');
let fileBtn = document.querySelector('#fileNote');

let stickyNoteBtn = document.querySelector('.sticky-note-btn');
let stickyNoteCont = document.querySelector('.sticky-notes');

let menuActive = true;
let pencilActive = false;
let eraserActive = false;
let pencilActiveFlag = false;
let eraserActiveFlag = false;

let socket = io.connect("http://localhost:5000");

stickyNoteBtn.addEventListener('click',()=>{
    createNoteTab(`<textarea placeholder="Enter note here .."></textarea>`);
});

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
    pencilActiveFlag = true;
    eraserActiveFlag = false;
    canvas.style.cursor = 'url("./pen.png"),auto';
    inActivePenEraserBtn();
    pencilBtn.classList.add('menu-item-active');
});

lineWidth.addEventListener('input',(e)=>{
    lineWidthValue = e.target.value;
});

eraserWidth.addEventListener('input',(e)=>{
    eraserWidthValue = e.target.value;
});

lineColorRanges.forEach((color)=>{
    color.addEventListener('click',()=>{
        inActiveColorRange();
        color.classList.add('active-color');
    });
});

lineColorRange.addEventListener('click',()=>{
    lineColorRanges.forEach((color)=>{
        if(color.classList.contains("active-color")){
            let pickedColor = color.getAttribute("class").split(" ")[0];
            lineColorValue = pickedColor;
        }
    });
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
    pencilActiveFlag = false;
    eraserActiveFlag = true;
    canvas.style.cursor = 'url("./eraser.png"),auto';
    inActivePenEraserBtn();
    eraserBtn.classList.add('menu-item-active');
});

refreshBtn.addEventListener('click',()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

downloadBtn.addEventListener('click',()=>{
    let url = canvas.toDataURL("image/jpg");
    let link = document.createElement('a');
    link.href = url;
    link.download = "canvas.jpg";
    link.click();
});

uploadBtn.addEventListener('click',()=>{
    fileBtn.click();
    fileBtn.addEventListener('change',()=>{
        let file = fileBtn.files[0];
        let imgUrl = URL.createObjectURL(file);
        createNoteTab(`<img src="${imgUrl}"/>`)
        fileBtn.value = null;
    });
});

undoBtn.addEventListener('click',()=>{
    if(tracker>0){
        tracker -= 1;
        let data = {
            arr:undoRedoTracker,
            idx:tracker
        }
        socket.emit("undoRedo",data);
        // redoUndoTrackerFunc(data);
    }
});

redoBtn.addEventListener('click',()=>{
    if(tracker<undoRedoTracker.length-1){
        tracker += 1;
        let data = {
            arr:undoRedoTracker,
            idx:tracker
        }
        socket.emit("undoRedo",data);
        // redoUndoTrackerFunc(data);
    }
});


canvas.addEventListener('click',()=>{
    if(pencilActive){inActivePencilCont()};
    if(eraserActive){inActiveEraserCont()}; 
});

canvas.addEventListener('mousedown',(e)=>{
    if(pencilActive){inActivePencilCont()};
    if(eraserActive){inActiveEraserCont()}; 
    mouseDown = true;
    let data = {
        x: e.clientX,
        y: (e.clientY + 20),
        lineWidthValue,
        lineColorValue,
        eraserWidthValue,
        eraseColorValue,
        pencilActiveFlag,
        eraserActiveFlag
    }
    socket.emit("beginPath",data);
    // beginPath({x,y});
});

canvas.addEventListener('mousemove',(e)=>{
    if(mouseDown){
        let data = {
            x: e.clientX,
            y: (e.clientY + 20)
        }
        socket.emit("drawPath",data);
        // drawPath(data);
    }
});

canvas.addEventListener('mouseup',(e)=>{
    mouseDown = false;
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    tracker = undoRedoTracker.length - 1;
});

function redoUndoTrackerFunc({arr,idx}){
    let img = new Image();
    img.src = arr[idx];
    img.onload = (e) => {
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    }
}

function beginPath({x,y,pencilActiveFlag,eraserActiveFlag,lineWidthValue,lineColorValue,eraserWidthValue,eraseColorValue}){
    if(pencilActiveFlag){
        ctx.lineWidth = lineWidthValue;
        ctx.strokeStyle = lineColorValue;
    }
    else if(eraserActiveFlag){
        ctx.lineWidth = eraserWidthValue;
        ctx.strokeStyle = eraseColorValue;
    }
    ctx.beginPath();
    ctx.moveTo(x,y);
}

function drawPath({x,y}){
    ctx.lineTo(x,y);
    ctx.stroke();
}

function inActivePenEraserBtn(){
    if(pencilBtn.classList.contains('menu-item-active')){
        pencilBtn.classList.remove('menu-item-active');
    }
    if(eraserBtn.classList.contains('menu-item-active')){
        eraserBtn.classList.remove('menu-item-active');
    }
}

function inActiveColorRange(){
    lineColorRanges.forEach((color)=>{
        if(color.classList.contains('active-color')){
            color.classList.remove('active-color');
        }
    });
}

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

function createNoteTab(innerHtml){
    let dragElementCont = document.createElement('div');
    dragElementCont.setAttribute("class","sticky-note-cont");
    dragElementCont.style.zIndex = 20;
    dragElementCont.innerHTML = `<div class="sticky-note-header" id="note-header" style="z-index: 21;">
                                    <span class="green" id="minimize"></span>
                                    <span class="red" id="remove"></span>
                                </div>
                                <div class="sticky-note-content">
                                    ${innerHtml}
                                </div>`;
    stickyNoteCont.appendChild(dragElementCont);
    removeAndMinimize(dragElementCont);
    dragElement(dragElementCont);
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

  
socket.on("beginPath",(receivedData)=>{
    // console.log(receivedData);
    beginPath(receivedData);
});
socket.on("drawPath",(receivedData)=>{
    // console.log(receivedData);
    drawPath(receivedData);
});
socket.on("undoRedo",(receivedData)=>{
    redoUndoTrackerFunc(receivedData);
});