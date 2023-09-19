import { useState } from 'react';
import './App.css';
function App() {
  let [counter, setCounter] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [text, setText] = useState('');
  const handleDelete = (id) => {
    setTodoList(todoList.filter((item)=>{return item.id!==id}));
  };
  const handleSubmit = (e) => {
    if(e.key==="Enter" && text!==''){
      counter = counter + 1;
      setCounter(counter);
      setTodoList([...todoList,{id:counter,name:text}]);
      setText('');
    }
  };
  const handleInput = (e) => {
    setText(e.target.value);
  };
  return (
    <ul>
      <input id='submit' type="text" onInput={handleInput} onKeyDown={handleSubmit} value={text} style={{marginBottom:"15px",width:"200px",padding:"0px"}}/>
      {todoList.map((item,index)=>{
        return <li style={{width:"200px",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"15px"}} key={index} id={item.id}>{item.name} <button style={{padding:"5px"}} onClick={()=>{handleDelete(item.id)}}>Delete</button></li>;
      })}
    </ul>
  );
}

export default App;
