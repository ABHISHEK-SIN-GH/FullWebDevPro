import React, { useContext } from 'react';
import { Context } from './Lession4';

const Lession4b = () => {
    let {setTxt} = useContext(Context);
    const handleReset = () => {
        setTxt({msg:'',count:0,test:''});
    }
    console.log('child-b');
    return (
        <div>
            <h1>Lession - 4b</h1>
            {/* <button onClick={(e)=>{handleReset(e)}}>Reset</button> */}
        </div>
    );
}

export default React.memo(Lession4b);
