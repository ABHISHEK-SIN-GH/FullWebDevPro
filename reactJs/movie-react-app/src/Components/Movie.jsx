import React from 'react';
import Rating from './Rating';

const Movie = ({details,favFn}) => {
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
                    <Rating key={details.id} id={details.id} avgRating={details.vote_average} totalRatings={details.vote_count}/>
                </div>
            <button className='position-absolute top-0 end-0 btn btn-light text-danger me-2 mt-2' onClick={()=>{favFn(details)}}><i className="bi bi-heart-fill"></i></button>
            </div>
        </div>
    );
}

export default Movie;
