let priorityChooser = document.querySelectorAll('.priority-chooser-btn');
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

let body = document.querySelector('.body');
let modal = document.querySelector('#modal');
let addBtn = document.querySelector('#AddBtn');
let cancelBtn = document.querySelector('#CancelBtn');
let cardContainer = document.querySelector('.card-container');
addBtn.addEventListener('click',()=>{
    modal.style.display = "flex"; 
    body.style.opacity = 0.3;
});
cancelBtn.addEventListener('click',()=>{
    modal.style.display = "none";
    body.style.opacity = 1;
    let newCard = document.createElement('div');
    newCard.innerHTML = `<div class="card">
                        <div class="card-status"></div>
                        <div class="card-details">
                            <div class="card-title">#ID : 1234</div>
                            <div class="card-desc">This is description of the card..This is description of the card..</div>
                            <div class="card-lock" locked="true">
                                <i id="lock" class="fa-2x fa-solid fa-lock"></i>
                            </div>
                        </div>
                    </div>`;
    cardContainer.appendChild(newCard);
    let cardLocks = document.querySelectorAll('.card-lock');
    let lock = document.querySelector('#lock');
    cardLocks.forEach((cardLock)=>{
        cardLock.addEventListener('click',(e)=>{
            if(cardLock.getAttribute("locked")=="true"){
                cardLock.setAttribute("locked","false");
                console.log('unlocked');
            }else{
                cardLock.setAttribute("locked","true");
                console.log('locked');
            }
        });
    });
});



                    