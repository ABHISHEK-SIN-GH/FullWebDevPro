import React from 'react';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';

const Home = ({user,auth}) => {
    const handleLogout = async () => {
        await auth.signOut();
    }
    return (
        <div>
            {
            (user != null) ? 
                <div>
                    <h1>{user.uid}</h1>
                    <Button size="medium" fullWidth={true} variant="contained" color="error" onClick={()=>{handleLogout()}}>Logout</Button>
                </div>
                :
                <Navigate to="/sign-in" replace={true}/>
            }
        </div>
    );
}

export default Home;
