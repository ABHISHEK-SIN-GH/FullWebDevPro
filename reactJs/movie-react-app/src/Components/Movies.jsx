import React from 'react';
import Movie from './Movie';
const Movies = ({data}) => {
    return (
        <div className='position-relative mx-5' style={{top:"75%"}}>
            <h4 className='mt-5 bg-secondary p-3 m-2 text-light fw-light rounded rounded-3'>This WebApp helps you select the perfect next show or movie to watch.</h4>
            {/* <h4 className='mt-5 bg-secondary p-3 text-light fw-light rounded rounded-3'>Page : {data.page} | Movies : {data.results.length} | {data.total_pages} Pages | {data.total_results} Movies</h4> */}
            <div className='d-flex flex-wrap p-0 m-0 mt-5 justify-content-between'>
                {
                    data.results.map((movie,index)=>{
                        return <Movie key={index} details={movie}/>
                    }) 
                }
            </div>
        </div>
    );
}

export default Movies;
