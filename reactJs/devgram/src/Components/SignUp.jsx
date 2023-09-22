import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import logo from '../assets/devLogoBG.png';
import Divider from '@mui/material/Divider';
import { Button, CardActionArea, TextField } from '@mui/material';
import { Link, Navigate} from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp({auth,user,handleSetUserData}) {
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const handleSignUp = async () => {
        const userCred = await createUserWithEmailAndPassword(auth,email,password);
        const userData = {
            uid:userCred.user.uid,
            email:email,
            name:name,
            username:username,
            password:password,
        }
        handleSetUserData(userData);
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
                            <Typography variant="subtitle1" color="text.secondary" align='center' fontWeight='bold'>
                                Sign up to see photos and videos from your friends.
                            </Typography>
                        </div>
                        <div style={{padding:"16px 16px 0px 16px"}}>
                            <TextField id="email" label="Email or Phone Number" variant="filled" fullWidth={true} value={email} onInput={(e)=>{setEmail(e.target.value)}}/>
                            <TextField id="name" label="Full Name" variant="filled" fullWidth={true} value={name} onInput={(e)=>{setName(e.target.value)}}/>
                            <TextField id="username" label="Username" variant="filled" fullWidth={true} value={username} onInput={(e)=>{setUsername(e.target.value)}}/>
                            <TextField id="password" label="Password" variant="filled" fullWidth={true} value={password} onInput={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    By signing up, you agree to our Terms , Privacy Policy and Cookies Policy.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <div style={{padding:"0px 16px 16px 16px"}}>
                            <Button size="medium" fullWidth={true} variant="contained" color="error" onClick={()=>{handleSignUp()}}>Sign-Up Now</Button>
                        </div>
                    </Card>
                    <Divider/>
                    <Card style={{maxWidth:"360px",marginBottom:"50px"}}>
                        <div style={{padding:"16px 16px 16px 16px",display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <Typography variant="subtitle1" color="text.secondary">Already have an account?</Typography>
                            <Link to='/sign-in' style={{textDecoration:"none"}}><Button size="medium" variant="text" color="error" sx={{fontWeight:'bold'}}>Sign-In</Button></Link>
                        </div>
                    </Card>
                </div>
                :
                <Navigate to="/home" replace={true}/>
            }
        </div>
    );
}