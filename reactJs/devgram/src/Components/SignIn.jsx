import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import logo from '../assets/devLogoBG.png';
import Divider from '@mui/material/Divider';
import { Button, TextField } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn({auth,user,getUserData,handleSetUserData}) {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const handleSignIn = async () => {
        try {
            const userCred = await signInWithEmailAndPassword(auth,username,password);
            const response = await getUserData(userCred.user.uid);
            handleSetUserData(response.data());
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className='center-align'>
            {
                (user == null) ?
                    <div>
                        <Card style={{maxWidth:"360px",marginTop:"5vh"}}>
                            <div>
                                <img src={logo} alt="" srcSet="" style={{width:"100%"}}/>
                            </div>
                            <div style={{padding:"16px 16px 0px 16px"}}>
                                <TextField id="email" label="Email or Username" variant="filled" fullWidth={true} value={username} onInput={(e)=>{setUsername(e.target.value)}}/>
                                <TextField id="password" label="Password" variant="filled" fullWidth={true} value={password} onInput={(e)=>{setPassword(e.target.value)}}/>
                            </div>
                            <div style={{padding:"16px 16px 16px 16px"}}>
                                <Typography variant="subtitle1" color="text.secondary" align='center' fontWeight='bold'>
                                    Forget Password?
                                </Typography>
                            </div>
                            <div style={{padding:"0px 16px 16px 16px"}}>
                                <Button size="medium" fullWidth={true} variant="contained" color="error" onClick={()=>{handleSignIn()}}>Sign-In Now</Button>
                            </div>
                        </Card>
                        <Divider/>
                        <Card style={{maxWidth:"360px"}}>
                            <div style={{padding:"16px 16px 16px 16px",display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <Typography variant="subtitle1" color="text.secondary">Don't have an account?</Typography>
                                <Link to='/sign-up' style={{textDecoration:"none"}}><Button size="medium" variant="text" color="error" sx={{fontWeight:'bold'}}>Sign-Up</Button></Link>
                            </div>
                        </Card>
                    </div>
                :
                <Navigate to="/home" replace={true}/>
            }        
        </div>
    );
}