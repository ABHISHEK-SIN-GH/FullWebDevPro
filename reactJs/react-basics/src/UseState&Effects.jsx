import React from 'react';
import { useState , useEffect } from 'react';

const UseStateEffects = () => {
    
    const [counter, setCounter] = useState(0);
    console.log('render');
    
    // Every time called
    // useEffect(() => {
    //   console.log('useEffect Called!');
    // });
    
    // Infinite loop
    // useEffect(() => {
    //   console.log('useEffect Called!');
    //   setCounter(Math.random(0.5));
    // });
  
    // One time only
    // useEffect(() => {
    //   console.log('useEffect Called!');
    // },[]);
    
    // Call on every change on dependency var
    console.log(counter);
    useEffect(() => {
      console.log('useEffect Called!');
      console.log(counter);
    },[counter]);

    return (
        <div>
            <h1>Counter:{counter}</h1>
            <button onClick={()=>{setCounter(counter+1)}}>Click</button>
        </div>
    );
}

export default UseStateEffects;
