let priorityChooser = document.querySelectorAll('.priority-chooser-btn');
let body = document.querySelector('.body');
let modal = document.querySelector('#modal');
let updateModal = document.querySelector('#updateModal');
let addBtn = document.querySelector('#AddBtn');
let cancelBtn = document.querySelector('#CancelBtn');
let cancelUpdateBtn = document.querySelector('#CancelUpdateBtn');
let cardContainer = document.querySelector('.card-container');
let textarea = document.querySelector('#textareaAdd');
let textareaUpdate = document.querySelector('#textareaUpdate');
let bug = "";
let bugUpdate = "";

priorityChooser.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        priorityChooser.forEach((btnx)=>{
            if(btnx.classList.contains('border-btn')){
                btnx.classList.remove('border-btn');
            }
        });
        btn.classList.add('border-btn');
    });
});

const setId = (ID) =>{
    let id = localStorage.setItem("ID",ID);
    return id;
}

const getId = () => {
    return localStorage.getItem("ID");
}

if(getId()==null){
    setId(1);
}

// console.log(getId());

const openModal = () => {
    modal.style.display = "flex"; 
    body.style.opacity = 0.3;
}

const openUpdateModal = () => {
    updateModal.style.display = "flex"; 
    body.style.opacity = 0.3;
}

const closeModal = () => {
    textarea.value = "";
    bug = "";
    modal.style.display = "none";
    body.style.opacity = 1;
}

const closeUpdateModal = () => {
    textareaUpdate.value = "";
    bugUpdate = "";
    updateModal.style.display = "none";
    body.style.opacity = 1;
}

addBtn.addEventListener('click',()=>{
    openModal();
});

cancelBtn.addEventListener('click',()=>{
    closeModal();
});

cancelUpdateBtn.addEventListener('click',()=>{
    closeUpdateModal();
});

textarea.addEventListener('input',(e)=>{
   bug = e.target.value;
});

textareaUpdate.addEventListener('input',(e)=>{
   bugUpdate = e.target.value;
});

let cardBox = (id,statusClr,desc) => {
    return `<div class="card" bug-id="${id}" onclick=(openLock(event,${id}))>
                <div class="card-status ${statusClr}"></div>
                <div class="card-details">
                    <div class="card-title">#ID : BUG@${id}</div>
                    <div class="card-desc">${desc}</div>
                    <div class="card-lock" locked="true" bug-id="${id}" onclick=(lockFn(event,${id}))>
                        <i id="lock" class="fa-2x fa-solid fa-lock"></i>
                    </div>
                </div>
            </div>`;
}

let findCard = (bugId) => {
    let child = document.querySelector(`.card[bug-id="${bugId}"]`); 
    let parent = document.querySelector('.card-container'); 
    return {child,parent};
}

let deleteBug = (id) => {
    let child = findCard(id).child;
    let parent = findCard(id).parent;
    parent.removeChild(child.parentNode);
    return "Deleted Successfully!";
}

let openLock = (event,id) => {
    openUpdateModal();
    console.log("Opened: ",id);
}

let lockFn = (event,id) =>{
    event.stopPropagation();
    event.stopImmediatePropagation();
    console.log("Lock Function: ",id);
}

let defaultBtnSelector = () => {
    let defaultBtn = document.querySelectorAll('.priority-chooser-btn.blue');
    defaultBtn.forEach((btn)=>{
        btn.classList.add('border-btn');
    });
}

modal.addEventListener('keydown',(e)=>{
    if(e.key=="Shift" && bug!=""){
        let newCard = document.createElement('div');
        let id = parseInt(getId().toString());
        let color = " ";
        let priorityChooserBtn = document.querySelectorAll('.priority-chooser-btn');
        priorityChooserBtn.forEach((btn)=>{
            if(btn.classList.contains('border-btn')){
                color=btn.getAttribute("button-clr");
                btn.classList.remove("border-btn");
            }
        });
        defaultBtnSelector();
        newCard.innerHTML = cardBox(id,color,bug);
        cardContainer.appendChild(newCard);
        textarea.value = "";
        bug = "";
        setId(id+1);
        closeModal();
    }
});

updateModal.addEventListener('keydown',(e)=>{
    if(e.key=="Shift" && bugUpdate!=""){
        let newCard = document.createElement('div');
        let id = parseInt(getId().toString());
        let color = " ";
        let priorityChooserBtn = document.querySelectorAll('.priority-chooser-btn');
        priorityChooserBtn.forEach((btn)=>{
            if(btn.classList.contains('border-btn')){
                color=btn.getAttribute("button-clr");
                btn.classList.remove("border-btn");
            }
        });
        defaultBtnSelector();
        newCard.innerHTML = cardBox(id,color,bugUpdate);
        cardContainer.appendChild(newCard);
        textareaUpdate.value = "";
        bugUpdate = "";
        closeUpdateModal();
    }
});

// let cardLocks = document.querySelectorAll('.card-lock');
// let lock = document.querySelector('#lock');
// cardLocks.forEach((cardLock)=>{
//     cardLock.addEventListener('click',(e)=>{
//         if(cardLock.getAttribute("locked")=="true"){
//             cardLock.setAttribute("locked","false");
//             console.log('unlocked');
//         }else{
//             cardLock.setAttribute("locked","true");
//             console.log('locked');
//         }
//     });
// });
                    