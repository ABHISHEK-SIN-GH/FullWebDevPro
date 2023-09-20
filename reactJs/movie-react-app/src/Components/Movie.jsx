import React from 'react';
import Rating from './Rating';

const Movie = ({details,favFn,favList}) => {
    let fav = false;
    let data = favList.filter((fm)=>{return fm.id===details.id});
    if(data.length>0){
        fav = true;
    }else{
        fav = false;
    }
    return (
        <div className="col-md-3 col-12 p-2" id={details.id}>
            <div className='card mb-4 position-relative'>
                <img src={`https://image.tmdb.org/t/p/w500/${details.backdrop_path}`} className="card-img-top" alt=""/>
                <div className="card-body">
                    {
                        (details.original_title) ?
                            <h5 className="card-title">{(details.original_title.length>=20)?details.original_title.substring(0,18)+"..":details.original_title}</h5>
                        :
                            <h5 className="card-title">{(details.original_name.length>=20)?details.original_name.substring(0,18)+"..":details.original_name}</h5>
                    }
                    <p className="card-text">{(details.overview.length>=85)?details.overview.substring(0,85)+"..":details.overview}</p>
                    {
                        (details.release_date) ?
                            <span>Release Date: <span className='badge rounded-pill text-bg-secondary'>{details.release_date}</span></span>
                        :
                            <span>Release Date: <span className='badge rounded-pill text-bg-secondary'>{details.first_air_date}</span></span>
                    }
                    <span className='m-3 d-block'></span>
                    <Rating key={details.id} avgRating={details.vote_average}/>
                </div>
            <button className={`position-absolute top-0 end-0 btn ${(!fav)?'btn-light text-danger':'btn-danger text-light'} me-2 mt-2`} onClick={()=>{favFn(details)}}><i className="bi bi-heart-fill"></i></button>
            </div>
        </div>
    );
}

export default Movie;
