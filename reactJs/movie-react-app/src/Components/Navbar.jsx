import React from 'react';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg text-white p-0">
                <div className="container-fluid p-3 d-flex align-items-center justify-content-center position-relative z-1 top-0 left-0 bg-white bg-opacity-75 px-5">
                    <span className="navbar-brand fw-bold fs-2 pt-0 pe-3">Movie React App</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto mt-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item fs-4 me-2">
                        <span className="nav-link active">Home</span>
                        </li>
                        <li className="nav-item fs-4 me-2">
                        <span className="nav-link">Trending</span>
                        </li>
                        <li className="nav-item fs-4">
                        <span className="nav-link">Top Rated</span>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <button className="btn btn-outline-danger" type="submit">Favorite</button>
                    </form>
                    </div>
                </div>
            </nav>
            <hr className='p-0 m-0'/>
        </div>
    );
}

export default Navbar;
