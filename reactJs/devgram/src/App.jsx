import './App.css';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import app from './Firebase';
import Home from './Components/Home';
function App() {
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const [ user, setUser ] = useState('');
  const [ userData, setUserData ] = useState('');
  const handleSetUserData = async (data) => {
    await setDoc(doc(firestore,'users',data.uid),data);
    setUserData(data);
  }
  const getUserData = async (uid) => {
    const response = await getDoc(doc(firestore,'users',uid));
    return response;
  }
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
        setUser(user);
    });
  });
  useEffect(()=>{
    console.log("UserData:",userData);
  },[userData]);
  return (
    <Router>
      <Routes>
        <Route exact path='/sign-up' element={<SignUp auth={auth} user={user} handleSetUserData={handleSetUserData}/>}/>
        <Route exact path='/sign-in' element={<SignIn auth={auth} user={user} getUserData={getUserData} handleSetUserData={handleSetUserData}/>}/>
        <Route exact path='/home' element={<Home auth={auth} user={user}/>}/>
        <Route exact path='/*' element={<SignIn auth={auth} user={user} getUserData={getUserData} handleSetUserData={handleSetUserData}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
