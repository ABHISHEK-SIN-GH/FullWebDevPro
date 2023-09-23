import React from 'react';
import imgSrc1 from '../Assets/productImg1.png';
import { Link } from 'react-router-dom';
import { ADD_TO_CART, SET_CURRENT_PRODUCT } from '../Actions';
import { connect } from 'react-redux';

const Product = ({product,addToCart,setItem}) => {
    return (
        <div className='col-4'>
            <div className="card m-3">
                <img src={imgSrc1} className="card-img-top" alt="product details" height="100%" width="100%"/>
                <div className="card-body">
                    <h5 className="card-title">{product.proTitle}</h5>
                    <p className="card-text m-0">{product.proDetails}</p>
                    <p className='fw-bold mt-3'>Price: <span className='text-decoration-line-through mx-1'>${product.price}</span>{product.discountedPrice}</p>
                    <div className='text-start'>
                        <Link to={`/productId/${product.proId}`}><button className="btn btn-primary me-2" onClick={()=>{setItem(product.proId)}}>View Product</button></Link>
                        <button className="btn btn-danger" onClick={()=>{addToCart(product.proId)}}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (proId) => {
            dispatch({type:ADD_TO_CART,payload:{proId:proId}});
        },
        setItem: (proId) => {
            dispatch({type:SET_CURRENT_PRODUCT,payload:{proId:proId}});
        }
    }
}

export default connect(null,mapDispatchToProps)(Product);
