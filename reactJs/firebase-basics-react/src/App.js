import React, {useState,useEffect} from 'react';
import './App.css';
import { firebaseApp } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import DatabaseCRUD from './DatabaseCRUD';
import StorageFB from './StorageFB';

// firebase-react-app // captcha

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const auth = getAuth(firebaseApp);
  const createUser = async () => {
    await createUserWithEmailAndPassword(auth,email,password);
  }
  const signOutUser = async () => {
    await auth.signOut();
  }
  const signInUser = async () => {
    await signInWithEmailAndPassword(auth,email,password);
  }
  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      setUser(user);
    });
    console.log(user);
  });
  return (
    <div className="App">
      {
      user===null?
        <>
          <h1>Firebase React App</h1>
          <input type="email" id='email' placeholder='email' onInput={(e)=>{setEmail(e.target.value)}}/>
          <input type="password" id='pswd' placeholder='password' onInput={(e)=>{setPassword(e.target.value)}}/>
          <button onClick={()=>{createUser()}}>Create</button>  
          <button onClick={()=>{signInUser()}}>SignIn</button>  
        </>
      :
        <>
          <h1>Signed In Successfully {user.uid}</h1>
          <DatabaseCRUD/>
          <StorageFB/>
          <button style={{marginTop:"40px"}} onClick={()=>{signOutUser()}}>Logout</button> 
        </>
      }
    </div>
  );
}

export default App;
