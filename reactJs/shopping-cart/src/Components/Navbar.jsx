import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = ({cartLen}) => {
    return (
        <nav className="navbar navbar-expand-lg bg-danger">
            <div className="container py-2">
                <Link to='/' className='text-decoration-none'><span className="navbar-brand text-light fw-bold font-monospace">ShopCart</span></Link>
                <Link to="/checkout">
                    <button className="btn btn-outline-light position-relative">Cart
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">{cartLen}</span>
                    </button>
                </Link>
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        cartLen : state.cart.length
    }
}

export default connect(mapStateToProps)(Navbar);
