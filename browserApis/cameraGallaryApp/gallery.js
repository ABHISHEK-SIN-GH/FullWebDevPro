window.addEventListener('load',()=>{
    if(db){
        console.log('db loaded');
        let vidDbTransaction = db.transaction("video","readonly");
        let videoStore = vidDbTransaction.objectStore("video");
        let videoReq = videoStore.getAll();
        videoReq.addEventListener('success',()=>{
            let videos = videoReq.result;
            videos.forEach((video)=>{
                createMedia(video);
            });
        });
        let imgDbTransaction = db.transaction("image","readonly");
        let imgStore = imgDbTransaction.objectStore("image");
        let imgReq = imgStore.getAll();
        imgReq.addEventListener('success',()=>{
            let images = imgReq.result;
            images.forEach((image)=>{
                createMedia(image);
            });
        });
    }
});

let mediaDownloadClick = (mediaID,mediaUrl,mediaType) => {
    let urlLink = mediaUrl;
    let downloadName = (mediaType=="img")?(mediaID+".jpg"):(mediaID+".mp4");
    downloadMedia(urlLink,downloadName);
}

function createMedia(mediaData){
    let mediaCont = document.querySelector('.media-cont');
    let mediaID = mediaData.id;
    let type = mediaID.slice(0,3);
    let videoUrl = '';
    let imageUrl = '';
    let mediaUrl = '';
    let mediaType = '';
    if(type=="img"){
        imageUrl = mediaData.url;
        mediaUrl = imageUrl;
        mediaType = type;
    }else if(type=="vid"){
        videoUrl = URL.createObjectURL(mediaData.blobData);
        mediaUrl = videoUrl;
        mediaType = type;
    }
    let videoEle = `<video src="${videoUrl}" autoplay loop></video>`;
    let imageEle = `<img src="${imageUrl}"/>`;
    let mediaEle = (type=="vid") ? videoEle : imageEle;
    let media = document.createElement('div');
    media.setAttribute("class","media");
    media.setAttribute("id",`${mediaID}`);
    media.innerHTML =  `<div class="media-content">
                            ${mediaEle}
                        </div>
                        <div class="media-action">
                            <span class="media-delete" >Delete</span>
                            <span class="media-download">Download</span>
                        </div>`;
    let deleteNode = media.childNodes[2].childNodes[1];
    let downloadNode = media.childNodes[2].childNodes[3];
    deleteNode.addEventListener('click',()=>{
        console.log("Deleted Id:",mediaID);
    });
    downloadNode.addEventListener('click',()=>{
        mediaDownloadClick(mediaID,mediaUrl,mediaType);
    });
    mediaCont.appendChild(media);                    
}

let backBtn = document.querySelector('.back-icon');
backBtn.addEventListener('click',()=>{
    console.log("back Clicked");
    history.back();
});