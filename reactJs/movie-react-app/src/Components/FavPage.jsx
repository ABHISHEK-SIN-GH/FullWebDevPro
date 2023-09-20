import React , {useState,useEffect} from 'react';
import Table from './Table';

const FavPage = ({favList,handleFavDelete}) => {
    const genres =[{"id":28,"name":"Action"},
                    {"id":12,"name":"Adventure"},
                    {"id":16,"name":"Animation"},
                    {"id":35,"name":"Comedy"},
                    {"id":80,"name":"Crime"},
                    {"id":99,"name":"Documentary"},
                    {"id":18,"name":"Drama"},
                    {"id":10751,"name":"Family"},
                    {"id":14,"name":"Fantasy"},
                    {"id":36,"name":"History"},
                    {"id":27,"name":"Horror"},
                    {"id":9648,"name":"Mystery"},
                    {"id":10749,"name":"Romance"},
                    {"id":878,"name":"Science Fiction"},
                    {"id":53,"name":"Thriller"},
                    {"id":10752,"name":"War"}];
    const findGenres = (gid) => {
        let genre = genres.filter((ge)=>{return ge.id===gid});
        if(genre.length>0){
            return genre[0].name;
        }else{
            return 'Others';
        }
    }
    const [filterList, setFilterList] = useState([]);
    useEffect(() => {
        setFilterList(favList);
    }, [favList]);
    const handleFilterList = (e) => {
        let text = e.target.value;
        let filteredList = favList.filter((favItem)=>{
            let title = (favItem.original_name) ? favItem.original_name : favItem.original_title;
            let titleVal = title.toLowerCase().search(text);
            return (titleVal>=0)?true:false;
        });
        setFilterList(filteredList);
    }
    const handleFilterListGenres = (gid) => {
        if(gid === -10){
            setFilterList(favList);
            return;
        }
        let filteredList = favList.filter((favItem)=>{
            let genres = favItem.genre_ids;
            if(genres.indexOf(gid)>=0){
                return true;
            }else{
                return false;
            }
        });
        setFilterList(filteredList);
    }
    return (
        <div className='mx-5 row m-0 p-0 mt-4'>
            <div className='col-2 m-0 p-0'>
                <div className="card w-75 mb-3">
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text"><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control" placeholder="Enter keywords.." onInput={(e)=>{handleFilterList(e)}}/>
                    </div>
                </div>    
                <div className="card w-75 mb-5">
                    <div className="card-header bg-secondary text-light" onClick={()=>{handleFilterListGenres(-10)}}>
                        All Genres
                    </div>
                    <ul className="list-group list-group-flush">
                        {
                            genres.map((gen,index)=>{
                                return <li className="list-group-item sideNavGen" key={index} onClick={()=>{handleFilterListGenres(gen.id)}}>{gen.name}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className='col-10 m-0 p-0'>
                <Table favList={filterList} handleFavDelete={handleFavDelete} findGenres={findGenres}/>
            </div>
        </div>
    );
}

export default FavPage;
