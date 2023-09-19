import { useEffect, useState } from 'react';
import './App.css';
import Banner from './Components/Banner';
import Footer from './Components/Footer';
import Movies from './Components/Movies';
import Navbar from './Components/Navbar';
import axios from 'axios';
import Spinner from './Components/Spinner';
function App() {
  
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    dataHandle(1);
    // console.log('use effect called');
  }, [page]);

  const dataHandle = (page) => {
    const config = {
        url : `https://api.themoviedb.org/3/trending/all/week?language=en-US&page=${(page===0)?1:page}`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjY0MmYwMjRjOGNmMTM1Y2RlYjk3ZTdhMjM4MTMzYiIsInN1YiI6IjY1MDk2NzYxMzczYWMyMDExYzQwMTliYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iA-2kk8IzfIo0PW5M6QbdTqnm9jQIeqZZS2lnpDdQLk'
        }
    };
    axios(config).then((res)=>{
        let data = res.data;
        setData(data);
        // console.log("Data received successfully!");
    }).catch((err)=>{
        // console.log("Something went wrong!");
    });  
  } 
  
  const handlePagination = (page) => {
    // console.log(page);
    dataHandle(page);
  } 
  
  const handleCounter = (action) => {
    if(action==="inc" && page<Number(data.total_pages)-10){
      setPage(page+10);
    }else if(action==="dec" && page>=10){
      setPage(page-10);
    }
  }

  return (
    <div>
      <Navbar/>
      <Banner/>
      {(data.length!==0)?<Movies data={data}/>:<Spinner/>}
      <Footer currentPage={page} handleCounter={handleCounter} handlePagination={handlePagination}/>
    </div>
  );
}

export default App;
