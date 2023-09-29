import React, { useContext } from 'react';
import { Context } from './Lession4';

const Lession4a = () => {
    // let {msg,count} = useContext(Context);
    let {txt} = useContext(Context);
    console.log('child-a');
    return (
        <div>
            <h1>Lession - 4a {txt.msg} || {txt.count}</h1>
        </div>
    );
}

export default React.memo(Lession4a);
