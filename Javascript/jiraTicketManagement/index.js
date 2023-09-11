let priorityChooser = document.querySelectorAll('.priority-chooser-btn');
let body = document.querySelector('.body');
let modal = document.querySelector('#modal');
let updateModal = document.querySelector('#updateModal');
let addBtn = document.querySelector('#AddBtn');
let destroyBtn = document.querySelector('#DestroyBtn');
let cancelBtn = document.querySelector('#CancelBtn');
let cancelUpdateBtn = document.querySelector('#CancelUpdateBtn');
let cardContainer = document.querySelector('.card-container');
let textarea = document.querySelector('#textareaAdd');
let textareaUpdate = document.querySelector('#textareaUpdate');
let updatePriorityChooserBtn = document.querySelectorAll('#updateModal .priority-chooser-btn');
let bug = "";
let bugUpdate = "";
let adminPswd = "123456";
let cardUpdateId = 0;
let cardUpdateStatusId = 0;
let cardDeleteId = 0;
let cardLockUpdateId = 0;
let priorityBtnFilter = document.querySelectorAll('.priority-btn');
let colorOrder = ["blue","orange","green","red"];

priorityBtnFilter.forEach((btn)=>{
    let color = btn.getAttribute("data-color")
    if(color=="black"){
        btn.addEventListener('click',()=>{
            refreshPage();
        });
    }else{
        btn.addEventListener('click',()=>{
            let datas = JSON.parse(getData());
            let filteredData = datas.filter((data)=>data.color==color);
            cardContainer.innerHTML = cardsRender(filteredData);
        });
    }
});

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

destroyBtn.addEventListener('click',()=>{
    if (confirm("Are you really want to remove all the bug tickets..\nIt can't be retrieved after this operation..") == true) {
        let data = []
        setData(JSON.stringify(data));
        refreshPage(); 
        console.log('All data deleted successfully!!');
    } else {
        console.log('cancelled!!');
    }
});

const setId = (ID) =>{
    let id = localStorage.setItem("ID",ID);
    return id;
}

const getId = () => {
    return localStorage.getItem("ID");
}

const setData = (data) => {
    let Data = localStorage.setItem("Data",data);
    return Data;
}

const getData = () => {
    return localStorage.getItem("Data")
}

if(getId()==null){
    setId(1);
}

if(getData()==null){
    let data = []
    setData(JSON.stringify(data));
}

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

let cardBox = (id,statusClr,desc,locked) => {
    return `<div class="card" bug-id="${id}" onclick=(openLock(event,${id}))>
                <div class="card-status ${statusClr}" onclick=(statusChange(event,${id}))></div>
                <div class="card-details">
                    <div class="card-title">#ID : BUG@${id}</div>
                    <div class="card-desc">${desc}</div>
                    <div class="card-lock" locked="true" bug-id="${id}" onclick=(lockFn(event,${id}))>
                        ${(locked)?'<i id="lock" class="fa-2x fa-solid fa-lock text-red"></i>':'<i id="unlock" class="fa-2x fa-solid fa-unlock text-green"></i>'}
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
    cardDeleteId = id;
    parent.removeChild(child.parentNode);
    return "Deleted Successfully!";
}

let openLock = (event,id) => {
    cardUpdateId = id;
    let datas = JSON.parse(getData());
    let currentData = datas.filter((data)=>data.id==cardUpdateId)[0];
    let islocked = currentData.locked;
    if(islocked){
        let pswd = prompt("You don't have access to edit..\n Enter Admin Code to Edit Ticket");
        if(pswd==adminPswd){
            let color = currentData.color;
            let bug = currentData.bug;
            textareaUpdate.value = bug;
            bugUpdate = bug;
            updatePriorityChooserBtn.forEach((btn)=>{
                if(btn.getAttribute("button-clr")==color){
                    btn.classList.add("border-btn");
                }
            });
            openUpdateModal();
        }else{
            alert("Wrong Password Entered!!");
        }
        return;
    }else{
        let color = currentData.color;
        let bug = currentData.bug;
        textareaUpdate.value = bug;
        bugUpdate = bug;
        updatePriorityChooserBtn.forEach((btn)=>{
            if(btn.getAttribute("button-clr")==color){
                btn.classList.add("border-btn");
            }
        });
        openUpdateModal();
    }
}

let lockFn = (event,id) =>{
    event.stopPropagation();
    event.stopImmediatePropagation();
    cardLockUpdateId = id;
    let datas = JSON.parse(getData());
    let currentData = datas.filter((data)=>data.id==cardLockUpdateId)[0];
    let islocked = currentData.locked;
    if(islocked){
        let pswd = prompt("You don't have access to edit..\n Enter Admin Code to Edit Ticket");
        if(pswd==adminPswd){
            let indexOfData = datas.indexOf(currentData);
            let bug = currentData.bug;
            let color = currentData.color;
            let locked = !currentData.locked;
            let updatedData = {id,bug,color,locked};
            datas[indexOfData] = updatedData;
            setData(JSON.stringify(datas));
            refreshPage();
        }else{
            alert("Wrong Password Entered!!");
        }
    }else{
        let indexOfData = datas.indexOf(currentData);
        let bug = currentData.bug;
        let color = currentData.color;
        let locked = !currentData.locked;
        let updatedData = {id,bug,color,locked};
        datas[indexOfData] = updatedData;
        setData(JSON.stringify(datas));
        refreshPage();
    }
}

let statusChange = (event,id) => {
    event.stopPropagation();
    event.stopImmediatePropagation();
    cardUpdateStatusId = id;
    let datas = JSON.parse(getData());
    let currentData = datas.filter((data)=>data.id==cardUpdateStatusId)[0];
    let islocked = currentData.locked;
    if(islocked){
        let pswd = prompt("You don't have access to edit..\n Enter Admin Code to Edit Ticket");
        if(pswd==adminPswd){
            let indexOfData = datas.indexOf(currentData);
            let bug = currentData.bug;
            let color = colorOrder[((colorOrder.indexOf(currentData.color)+1) % 4)];
            let locked = currentData.locked;
            let updatedData = {id,bug,color,locked};
            datas[indexOfData] = updatedData;
            setData(JSON.stringify(datas));
            refreshPage();
        }else{
            alert("Wrong Password Entered!!");
        }
    }else{
        let indexOfData = datas.indexOf(currentData);
        let bug = currentData.bug;
        let color = colorOrder[((colorOrder.indexOf(currentData.color)+1) % 4)];
        let locked = currentData.locked;
        let updatedData = {id,bug,color,locked};
        datas[indexOfData] = updatedData;
        setData(JSON.stringify(datas));
        refreshPage();
    }    
}

let defaultBtnSelector = () => {
    let defaultBtn = document.querySelectorAll('.priority-chooser-btn.blue');
    defaultBtn.forEach((btn)=>{
        btn.classList.add('border-btn');
    });
}

modal.addEventListener('keydown',(e)=>{
    if(e.shiftKey && e.key=="S" && bug!=""){
        let id = parseInt(getId().toString());
        let color = " ";
        let priorityChooserBtn = document.querySelectorAll('.priority-chooser-btn');
        let locked = true
        priorityChooserBtn.forEach((btn)=>{
            if(btn.classList.contains('border-btn')){
                color=btn.getAttribute("button-clr");
                btn.classList.remove("border-btn");
            }
        });
        defaultBtnSelector();
        let data = {id,color,bug,locked};
        let previousData = JSON.parse(getData());
        let newData = [...previousData,data];
        setData(JSON.stringify(newData));
        textarea.value = "";
        bug = "";
        setId(id+1);
        closeModal();
        refreshPage();
    }
});


updateModal.addEventListener('keydown',(e)=>{
    if(e.shiftKey && e.key=="S" && bugUpdate!=""){
        let datas = JSON.parse(getData());
        let currentData = datas.filter((data)=>data.id==cardUpdateId)[0];
        let indexOfData = datas.indexOf(currentData);
        let id = currentData.id;
        let bug = textareaUpdate.value;
        let color = " ";
        let locked = currentData.locked;
        updatePriorityChooserBtn.forEach((btn)=>{
            if(btn.classList.contains('border-btn')){
                color=btn.getAttribute("button-clr");
                btn.classList.remove("border-btn");
            }
        });
        let updateData = {id,bug,color,locked};
        datas[indexOfData] = updateData;
        setData(JSON.stringify(datas));
        closeUpdateModal();
        refreshPage();
    }
});


const refreshPage = () => {
    let data = JSON.parse(getData());
    let cards = cardsRender(data);
    cardContainer.innerHTML = cards;
}

const cardsRender = (data) =>{
    let cards = "";
    data.forEach((card)=>{
        cards = cards + cardBox(card.id,card.color,card.bug,card.locked);
    });
    return cards;
}

refreshPage();

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
                    