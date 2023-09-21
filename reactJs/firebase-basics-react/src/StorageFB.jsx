import React from 'react';
import {getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject} from 'firebase/storage';
import { firebaseApp } from './firebase';
import { useState } from 'react';

const StorageFB = () => {
    let storage = getStorage(firebaseApp);
    let [imgUrl,setImgUrl] = useState('');
    const imagesRef = ref(storage, 'images');
    const spaceRef = ref(storage, 'images/space1.pdf');
    const parentRef = spaceRef.parent;
    const rootRef = spaceRef.root;
    const fullPath = spaceRef.fullPath;
    const bucket = spaceRef.bucket;
    const uploadFile = async (e) => {
        let file = e.target.files[0];
        let response = await uploadBytes(spaceRef,file);
        let url = await getDownloadURL(response.ref);
        // setImgUrl(url);
        console.log(url);
    }
    const allFiles = async (e) => {
        const listRef = ref(storage, 'images');
        const allFileRefs = await listAll(listRef);
        // console.log(allFileRefs.items);
        allFileRefs.items.forEach( async (ref)=>{
            let url = await getDownloadURL(ref);
            console.log(url);
        });
    }
    const deleteFile = async () => {
        const objRef = ref(storage, 'images/space1.pdf');
        const deletedObject = await deleteObject(objRef);
        console.log(deletedObject);
    }
    return (
        <div style={{marginTop:"40px"}}>
            {/* <img src={(imgUrl)?imgUrl:""} height={"400px"} width={"400px"} alt="" srcset="" /> */}
            <button onClick={()=>{allFiles()}}>Fetch All Files</button>
            <button onClick={()=>{deleteFile()}}>Delete File</button>
            <input type="file" onChange={(e)=>{uploadFile(e)}}/>
        </div>
    );
}

export default StorageFB;
