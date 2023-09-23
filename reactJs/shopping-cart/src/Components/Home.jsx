import React from 'react';
import Product from './Product';
import { connect } from 'react-redux';

const Home = ({products}) => {
    return (
        <div className='row container p-0 mx-auto my-3'>
            {
                products.map((product,index)=>{
                    return <Product key={index} product={product}/>;  
                }) 
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        products:state.products
    }
}

export default connect(mapStateToProps)(Home);
