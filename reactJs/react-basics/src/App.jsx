import './App.css';
// import UseStateEffects from './UseState&Effects';
import ContextApi from './ContextApi';
import { useState } from 'react';
import ContextParent from './ContextParent';
import ContextNeighbor from './ContextNeighbor';
function App() {
  const [theme, setTheme] = useState(false);
  const [cnt, setCnt] = useState(0);
  const inc = () => {
    setCnt(cnt+1);
  }
  return (
    <div>
        {/* // single var */}
        {/* <ContextApi.Provider value={theme}>*/}
        <ContextApi.Provider value={{theme,cnt,inc}}>
          <button onClick={()=>{setTheme(!theme)}}>Change Theme</button>
          <ContextParent/>
          {/* <UseStateEffects/> */}
        </ContextApi.Provider>
        <ContextNeighbor/>
    </div>
  );
}

export default App;
