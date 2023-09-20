import React, { useContext } from 'react';
import ContextApi from './ContextApi';
const ContextGrandChild = () => {
    // const theme = useContext(ContextApi);
    // console.log('render grandchild');
    const {theme,cnt} = useContext(ContextApi);
    return (
        <div>
            <h1>Grand Children: {theme?"Dark":"Light"} : {cnt}</h1>
        </div>
    );
}

export default ContextGrandChild;
