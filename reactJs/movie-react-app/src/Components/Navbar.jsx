import React from 'react';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg text-white p-0">
                <div className="container-fluid p-3 d-flex align-items-center justify-content-between position-relative z-1 top-0 left-0 bg-white bg-opacity-75 px-5">
                    <span className="navbar-brand fw-bold fs-2 pt-0 pe-3">M-Rating App</span>
                    <button className="btn btn-outline-danger" type="submit">Favorite</button>
                </div>
            </nav>
            <hr className='p-0 m-0'/>
        </div>
    );
}

export default Navbar;
