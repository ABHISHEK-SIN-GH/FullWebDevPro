import React from 'react';

const Spinner = () => {
    return (
        <div className="spinner-border position-absolute start-50" style={{width:"3rem",height:"3rem",zIndex:10,top:"75%"}} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}

export default Spinner;
