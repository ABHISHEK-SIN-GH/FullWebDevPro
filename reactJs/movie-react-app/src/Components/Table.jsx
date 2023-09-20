import React from 'react';
import Trow from './Trow';

const Table = ({favList,handleFavDelete,findGenres}) => {  
    return (
        <>
            <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Movie / Shows</th>
                            <th>Genres</th>
                            <th className="text-center"><span className='mx-auto'>Rating</span></th>
                            <th className="text-center"><span className='mx-auto'>Action</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            favList.map((fav,index)=>{
                                return (fav.original_title) 
                                ? <Trow key={index} id={index+1} mName={fav.original_title} mRating={fav.vote_average} mId={fav.id} mGenres={fav.genre_ids} handleFavDelete={handleFavDelete} findGenres={findGenres}/> 
                                : <Trow key={index} id={index+1} mName={fav.original_name} mRating={fav.vote_average} mId={fav.id} mGenres={fav.genre_ids} handleFavDelete={handleFavDelete} findGenres={findGenres}/>
                            })
                        }
                    </tbody>
            </table>
        </>
    );
}

export default Table;
