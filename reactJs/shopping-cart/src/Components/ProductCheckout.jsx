import React, { useEffect, useState } from 'react';
import imgSrc1 from '../Assets/productImg1.png';
import { DELETE_ITEM_FROM_CART, UPDATE_ITEM_QTY_IN_CART } from '../Actions';
import { connect } from 'react-redux';

const ProductCheckout = ({product,updateQtyItem,deleteItem}) => {
    const [qty,setQty] = useState(product.qty);
    useEffect(()=>{
        if(qty>0){
            if(qty<=9){
                updateQtyItem(product.proId,Number(qty)); 
            }else{
                alert('You can purchase only 9items per product at a time..');
            }
        }else{
            if(window.confirm('Are you really want to remove this product from cart..')){
                deleteItem(product.proId);
            }else{
                setQty(1);
                return;
            }
        }
    },[qty,deleteItem,updateQtyItem]);
    return (
        <div>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={imgSrc1} className="img-fluid rounded-start" alt="product view"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{product.proTitle}</h5>
                            <p className="card-text m-0 mb-1">{product.proDetails}</p>
                            <p className='fw-bold mb-3'>Price:<span className='text-decoration-line-through mx-1 text-secondary'>${product.price}</span>${product.discountedPrice}</p>
                            <div className='d-flex justify-content-between'>
                                <span className='d-flex align-items-center fw-bold'>Quantity:</span>
                                <div className="btn-group w-25 mx-0 px-0">
                                    <button type="button" className="btn btn-primary" onClick={()=>{setQty(qty-1)}}>-</button>
                                    <input type="number" className="d-inline border-dark text-center " min={1} max={9} value={qty} disabled/>
                                    <button type="button" className="btn btn-primary" onClick={()=>{(qty===9)?alert('Reached max limit..'):setQty(qty+1)}}>+</button>
                                </div>
                                <button className='btn btn-danger d-inline w-25' onClick={()=>{deleteItem(product.proId)}}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateQtyItem : (proId,qty) => {
            dispatch({type:UPDATE_ITEM_QTY_IN_CART,payload:{proId,qty}})
        },
        deleteItem : (proId) => {
            dispatch({type:DELETE_ITEM_FROM_CART,payload:{proId:proId}})
        }
    }
}

export default connect(null,mapDispatchToProps)(ProductCheckout);
