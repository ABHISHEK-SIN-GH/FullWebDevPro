import React, { useState, useEffect, createContext } from 'react';
import Lession4a from './Lession4a';
import Lession4b from './Lession4b';

export const Context = createContext('store');

const Lession4 = () => {
    // const [cnt, setCnt] = useState(0);
    const [txt, setTxt] = useState({msg:'',count:0,test:''});
    
    const handleEvent = (e) => {
        let text = e.target.value;
        let count = text.length;
        setTxt({...txt,msg:text,count:count});
    }
    
    // useEffect(() => {
    //     setCnt(txt.count);
    // }); // didMount and didUpdate

    // useEffect(() => {
    //     setCnt(txt.count);
    // },[]); // didMount

    // useEffect(() => {
    //     setCnt(txt.count);
    // },[cnt]); // didUpdate

    // useEffect(() => {
    //     setCnt(txt.count);
    // },[txt.count]); // didUpdate with Parameter

    console.log('parent');
    return (
        <Context.Provider value={{txt,setTxt}}>
            <div>
                <h1>Lession - 4 </h1>
                <input type="text" onChange={(e)=>{handleEvent(e)}}/>
                <h1>Text: {txt.msg}</h1>
                <h3>Length: {txt.count}</h3>
                {/* <h3>Length: {cnt}</h3> */}
                <Lession4a/>
                <Lession4b/>
            </div>
        </Context.Provider>
    );
}

export default Lession4;
