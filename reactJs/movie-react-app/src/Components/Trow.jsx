import React from 'react';
import Rating from './Rating';

const Trow = ({id,mName,mRating,mId,mGenres,handleFavDelete,findGenres}) => {
    let genresNames = [];
    mGenres.map((mGenId,index)=>{
        genresNames.push(<span key={index} className="badge text-bg-primary fw-bold me-1">{findGenres(mGenId)}</span>);
        return genresNames;
    });
    return (
        <>
            <tr>
                <th className='align-middle'>{id}</th>
                <td className='align-middle'>{mName}</td>
                <td className='align-middle'>{genresNames}</td>
                <td className='align-middle w-25'><Rating avgRating={mRating}/></td>
                <td className='text-center'><span className='btn btn-danger m-0' onClick={()=>{handleFavDelete(mId)}}>Delete</span></td>
            </tr>
        </>
    );
}

export default Trow;
