import React, { useContext } from 'react';
import ContextApi from './ContextApi';
import ContextChild from './ContextChild';
const ContextParent = () => {
    // const theme = useContext(ContextApi);
    // console.log('render parent');
    const {theme,cnt} = useContext(ContextApi);
    return (
        <div>
            <h1>Parent : {theme?"Dark":"Light"} : {cnt}</h1>
            <ContextChild/>
        </div>
    );
}

export default ContextParent;
