let canvas = document.querySelector('.canvas');

let menuCont = document.querySelector(".menu-icons");
let menuBtn = document.querySelector("#menu");
let closeBtn = document.querySelector("#close");

let pencilCont = document.querySelector('.pencil-cont');
let pencilBtn = document.querySelector('.pencil-btn');
let eraserCont = document.querySelector('.eraser-cont');
let eraserBtn = document.querySelector('.eraser-btn');

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
}

function inActiveMenu(){
    menuBtn.classList.remove("active-menu");
    menuBtn.classList.add("inactive-menu");
    closeBtn.classList.add("active-menu");
    closeBtn.classList.remove("inactive-menu");
}

canvas.addEventListener('click',()=>{
    if(pencilActive){inActivePencilCont()};
    if(eraserActive){inActiveEraserCont()}; 
});