import React, { useEffect, useState } from 'react';
import ProductCheckout from './ProductCheckout';
import { connect } from 'react-redux';

const Checkout = ({cart}) => {
    let total = 0;

    if(cart.length!==0){
        cart.forEach((item)=>{
            total = ( total + (item.discountedPrice * item.qty));
        });
    }

    
    const [oldGt,setOldGt] = useState(total);
    const [gt,setGt] = useState(total);
    const [code,setCode] = useState('');
    const [applied,setApplied] = useState(false);
    const [valid,setValid] = useState(true);
    const [appliedText,setAppliedText] = useState('Apply Code');
   
    useEffect(()=>{
        setGt(total);
        setOldGt(total);
        setApplied(false);
        setAppliedText('Apply Code');
        setValid(true);
        setCode('');
    },[total]);

    
    const checkCode = () => {
        if(code.length>0){
            if( code==='SAVE20' || code==='SAVE30' || code==='SAVE50'){
                let discount = code.slice(4,6);
                total = total - ( ( total * discount ) / 100);
                setGt(total);
                setApplied(true);
                setAppliedText('Remove Code');
                setValid(true);
            }else{
                setApplied(false);
                setAppliedText('Not Applicable try again')
                setValid(false);
            }
        }else{
            alert('Enter Coupon code if you have..');
            setApplied(false);
            setAppliedText('Apply Code');
            setValid(true);
        }
    }

    const revertCode = () => {
        setApplied(false);
        setAppliedText('Apply Code');
        setValid(true);
        setGt(oldGt);
        setCode('');
    }
   
    const HandleCodeBtn = () => {
        if(appliedText==='Apply Code'){
            checkCode();
        }
        else if(appliedText==='Remove Code'){
            revertCode();
        }
        else{
            revertCode();
        }
    }

    return (
        <div className='container mx-auto p-0'>
            <div className='bg-danger mt-4 rounded rounded-5 p-4 row' style={{width:"100%",height:"80vh"}}>
                <div className='col-8 h-100 bg-light rounded rounded-5 p-4'>
                    <h3 className='fw-bold font-monospace'>All Items in Cart :-</h3><hr />
                    <div className='overflow-auto' style={{maxHeight:"80%"}}>
                        {
                            (cart.length===0) ? 
                            <h1>No Items in Cart</h1> : 
                            <>
                                {
                                    cart.map((item,index)=>{
                                        return <ProductCheckout key={index} product={item}/>
                                    })    
                                }
                            </>
                        }
                    </div>
                </div>
                <div className='col-1'></div>
                <div className='col-3 h-100 bg-light rounded rounded-5 p-4'>
                    <h3 className='fw-bold font-monospace'>Checkout</h3><hr />
                    <h5 className='fw-light font-monospace'>Grand Total : <span className='fw-bold'>$ {gt}</span></h5><hr />
                    <input type="text" className='form-control border-dark' placeholder='Enter Coupon Code..' value={code} onInput={(e)=>{setCode(e.target.value)}}/>
                    <small className='mt-2 d-inline-block'><i className="bi bi-info-circle me-2"></i>{(applied && valid)?"Discount applied successfully!":"Use Coupon if You have.."}</small>
                    <button className='btn btn-danger w-100 mt-2' onClick={()=>{HandleCodeBtn()}}>{appliedText}</button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        cart:state.cart
    }
}

export default connect(mapStateToProps)(Checkout);
