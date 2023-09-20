import React from 'react';

const Rating = ({avgRating}) => {
    const avgRate = Math.round((avgRating/2)*10)/10;
    let stars = [];
    const emptyStar = (cnt) => <i className="bi bi-star me-1 m-0 pb-1 my-auto" style={{alignSelf:'center'}} key={cnt}></i>;
    const halfStar = (cnt) => <i className="bi bi-star-half me-1 m-0 pb-1 my-auto" style={{alignSelf:'center'}} key={cnt}></i>;
    const fullStar = (cnt) => <i className="bi bi-star-fill me-1 m-0 pb-1 my-auto" style={{alignSelf:'center'}} key={cnt}></i>;
    const actualRating = avgRate.toFixed(1);
    const preciseRating = Math.floor(avgRate);
    let cnt = 0;
    for (let index = 0; index < preciseRating; index++) {
        stars.push(fullStar(cnt));
        cnt++;
    }
    if(actualRating-preciseRating>=0.5){
        stars.push(halfStar(cnt));
        cnt++;
    }
    while(stars.length!==5){
        stars.push(emptyStar(cnt));
        cnt++;
    }
    return (
        <div key={actualRating} className="btn btn-secondary w-100 d-flex align-content-center justify-content-center">
            <span className='me-2 my-auto'>Rating:</span>
            {stars}
            <span className='ms-2 rounded bg-white text-secondary my-auto px-2'>{avgRate}/5</span>
        </div>
    );
}

export default Rating;
