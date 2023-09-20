import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Banner from './Components/Banner';
import Footer from './Components/Footer';
import Movies from './Components/Movies';
import Navbar from './Components/Navbar';
import Spinner from './Components/Spinner';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FavPage from './Components/FavPage';
import NotFoundPage from './Components/NotFoundPage';

function App() {
  
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [fav, setFav] = useState((JSON.parse(localStorage.getItem("favorites")))?JSON.parse(localStorage.getItem("favorites")):[]);
  
  const dataHandle = (page) => {
    setLoader(true);
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
        setLoader(false);
    }).catch((err)=>{
      console.log("Something went wrong!");
    });  
  } 
  
  const handlePagination = (page) => {
    dataHandle(page);
  } 
  
  const handleCounter = (action) => {
    if(action==="inc" && page<Number(data.total_pages)-10){
      setPage(page+10);
    }else if(action==="dec" && page>=10){
      setPage(page-10);
    }
  }

  const handleFavPush = (data) => {
    let alreadyFav = fav.filter((f)=>{return f.id!==data.id});
    if(alreadyFav.length<fav.length){
      setFav([...alreadyFav]);
    }else{
      setFav([...fav,data]);
    }
  }
  
  const handleFavDelete = (id) => {
    console.log(id);
    let alreadyFav = fav.filter((f)=>{return f.id!==id});
    setFav([...alreadyFav]);
  }

  useEffect(() => {
    dataHandle(1);
  }, [page]);

  useEffect(() => {
    localStorage.setItem("favorites",JSON.stringify([...fav]));
  }, [fav]);

  
  return (
    <div>
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path='/favorites' element={<FavPage favList={fav} handleFavDelete={handleFavDelete}/>} />
          <Route exact path='/' element={
            <>
              <Banner/>
              {(data.length!==0 && loader===false)?<Movies data={data} favFn={handleFavPush} favList={fav}/>:<Spinner/>}
              <Footer currentPage={page} handleCounter={handleCounter} handlePagination={handlePagination}/>
            </>
          }/>
          <Route path='/*' element={<NotFoundPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
