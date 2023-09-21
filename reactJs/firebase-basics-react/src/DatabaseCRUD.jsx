import React, { useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, setDoc, updateDoc } from "firebase/firestore"; 
import { firebaseApp } from './firebase';
const DatabaseCRUD = () => {
    
    let db = getFirestore(firebaseApp);
    
    let data = {
        name: "Raipur",
        state: "CG",
        country: "IND"
    };

    const [fbData,setFbData] = useState('');
    
    const setData = async () => {
        let response = await setDoc(doc(db,'cites','Raipur'),data);
        console.log(response);
    }

    const addData = async () => {
        let response = await addDoc(collection(db,'cites'),data);
        console.log(response);
    }

    const updateData = async () => {
        let response = await updateDoc(doc(db,'cites','Bhilai'),{name:"Raipur"});
        console.log(response);
    }
    
    const deleteData = async () => {
        let response = await deleteDoc(doc(db,'cites','Bhilai'));
        console.log(response);
    }

    const getData = async () => {
        // let response = await getDocs(collection(db,'cites'));
        // let fData = response.docs[2].data();
        // setFbData(fData);
        // console.log(fData);
        const snapshot = onSnapshot(doc(db,'cites','Durg'),(doc)=>{
            let fData = doc.data();
            setFbData(fData);
            console.log(fData);
        });
    }

    return (
        <div>
            <h1>Data: {fbData.name} | {fbData.state} | {fbData.country}</h1>
            <button onClick={()=>{getData()}}>get Data</button>
            <button onClick={()=>{setData()}}>Set Data</button>
            <button onClick={()=>{addData()}}>Add Data</button>
            <button onClick={()=>{updateData()}}>Update Data</button>
            <button onClick={()=>{deleteData()}}>Delete Data</button>
        </div>
    );
}

export default DatabaseCRUD;
