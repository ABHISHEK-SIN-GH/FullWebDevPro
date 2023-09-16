let db;
let nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");
let openReq = indexedDB.open("myGallery");
openReq.addEventListener("success",()=>{
    db = openReq.result;
    console.log('db success');
});
openReq.addEventListener("error",()=>{
    console.log("Error Occurred!!");
});
openReq.addEventListener("upgradeneeded",()=>{
    db = openReq.result;
    db.createObjectStore("video",{keyPath:"id"});
    db.createObjectStore("image",{keyPath:"id"});
});
function downloadMedia(URL,Name){
    let a = document.createElement("a");
    a.href = URL;
    a.download = Name;
    a.click();
}