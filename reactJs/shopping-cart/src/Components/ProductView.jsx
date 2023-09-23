import React from 'react';
import imgSrc1 from '../Assets/productImg1.png';
import { connect } from 'react-redux';
import { ADD_TO_CART } from '../Actions';
import { Navigate } from 'react-router-dom';

const ProductView = ({product,addToCart}) => {
    return (
        (product==null) ? <Navigate to='/'/> :
        <div className='position-absolute top-0 start-0 pt-5' style={{height:"100vh",width:"100vw",zIndex:-1}}>
           <div className='container p-0 mx-auto mt-5 row'>
                <div className='col-4'>
                    <img src={imgSrc1} width="100%" height="auto" alt='product view'/>
                </div>
                <div className='col-8'>
                    <h1 className='fw-bold font-monospace mb-2'>{product.proTitle}</h1>
                    <h4 className='fw-bold font-monospace mb-3'>{product.proDetails}</h4>
                    <h3 className='fw-bold font-monospace mb-3 text-danger'>Price:<span className='text-decoration-line-through mx-1 text-secondary'>${product.price}</span>{product.discountedPrice}</h3>
                    <button className="btn btn-danger fw-bold" onClick={()=>{addToCart(product.proId)}}>Add To Cart</button>
                </div>
           </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        product : state.currentItem
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (proId) => {
            dispatch({type:ADD_TO_CART,payload:{proId:proId}});
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductView);
