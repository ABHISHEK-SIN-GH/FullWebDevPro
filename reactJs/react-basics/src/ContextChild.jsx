import React, { useContext } from 'react';
import ContextGrandChild from './ContextGrandChild';
import ContextApi from './ContextApi';

const ContextChild = () => {
    // console.log('render child');
    const {inc} = useContext(ContextApi); 
    return (
        <div>
            <h1>Child <button onClick={()=>{inc()}}>Click</button></h1>
            <ContextGrandChild/>
        </div>
    );
}

export default ContextChild;
