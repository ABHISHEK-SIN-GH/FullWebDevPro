let video = document.querySelector('video');
let filterColor = "transparent";

let constraints = {
    audio:true,
    video:true
}

let recorder;
let chunks = [];
let recordFlag = false;

navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
    video.srcObject = stream;
    recorder = new MediaRecorder(stream);
    recorder.addEventListener('start',()=>{
        chunks = [];
    });
    recorder.addEventListener('dataavailable',(e)=>{
        chunks.push(e.data);
    });
    recorder.addEventListener('stop',(e)=>{
        let blob = new Blob(chunks,{type:'video/mp4'});
        if(db){
            let dbTransaction = db.transaction("video","readwrite");
            let videoStore = dbTransaction.objectStore("video");
            let videoEntry = {
                id: `vid-${nanoid()}`,
                blobData: blob,
            }
            videoStore.add(videoEntry);
            // let videoReq = videoStore.get(id); // return one object Event Driven
            // let videoReq = videoStore.getAll(); // return array of objects Event Driven
            // videoStore.delete(id); // id of video

        }
        // let videoUrl = URL.createObjectURL(blob);
        // downloadMedia(videoUrl,"stream.mp4");
    });
}).catch((e)=>{
    alert(e);
}); 

let recordActionBtn = document.querySelector(".record-btn");
let captureActionBtn = document.querySelector(".capture-btn");

recordActionBtn.addEventListener('click',(e)=>{
    (recordActionBtn.classList.contains('record-btn-animation')) ? recordActionBtn.classList.remove('record-btn-animation') : recordActionBtn.classList.add('record-btn-animation');
    if(!recorder) return;
    recordFlag = !recordFlag;
    if(recordFlag){
        recorder.start();
        startTimer();
    }else{
        recorder.stop();
        stopTimer();
    }
});

captureActionBtn.addEventListener('click',(e)=>{
    captureActionBtn.classList.add('capture-btn-animation');
    setTimeout(()=>{
        captureActionBtn.classList.remove('capture-btn-animation');
    },300);
    captureImage();
});

function captureImage(){
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let tool = canvas.getContext("2d");
    tool.drawImage(video,0,0,canvas.width,canvas.height);
    tool.fillStyle = filterColor;
    tool.fillRect(0,0,canvas.width,canvas.height);
    let imageUrl = canvas.toDataURL();
    if(db){
        let dbTransaction = db.transaction("image","readwrite");
        let imgStore = dbTransaction.objectStore("image");
        let imgEntry = {
            id: `img-${nanoid()}`,
            url: imageUrl,
        }
        imgStore.add(imgEntry);
    }
    // downloadMedia(imageUrl,"image.jpg");
}

let hour = 0;
let minute = 0;
let second = 0;
let time = "";
let timerID = "";    
let timerCont = document.querySelector('.timer-cont');
let timerSpan = document.querySelector('.timer');

function startTimer(){
    timerCont.style.display = "flex";
    timerID = setInterval(()=>{
        second = second + 1;
        if(second>59){
            second = 0;
            minute = minute + 1;
        }
        if(minute>59){
            minute = 0;
            hour = hour + 1;
        }
        if(second<10){
            second = '0'+second;
        }
        if(minute<10){
            minute = '0'+minute;
        }
        if(hour<10){
            hour = '0'+hour;
        }
        time = hour+":"+minute+":"+second ;
        second = Number(second);
        minute = Number(minute);
        hour = Number(hour);
        timerSpan.innerHTML = time;
    },1000);
}

function stopTimer(){
    timerCont.style.display = "none";
    second = 0;
    minute = 0;
    hour = 0;
    time = "00:00:00";
    timerSpan.innerHTML = time;
    clearInterval(timerID);
}

let filters = document.querySelectorAll('.filter');
let filterLayer = document.querySelector('.filter-layer');

filters.forEach((filterEle)=>{
    filterEle.addEventListener('click',()=>{
        filterColor = getComputedStyle(filterEle).getPropertyValue('background-color');
        filterLayer.style.backgroundColor = filterColor;
        activeFilter(filterEle);
    }); 
});

function activeFilter(filterEle){
    filters.forEach((filter)=>{
        if(filter.classList.contains('active')){
            filter.classList.remove('active');
        }
    });
    filterEle.classList.add('active');
}

let galleryBtn = document.querySelector('.gallery-icon');
galleryBtn.addEventListener('click',()=>{
    location.assign('./gallery.html');
});