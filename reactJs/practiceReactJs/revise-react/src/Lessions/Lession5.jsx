import React from 'react';
import { connect } from 'react-redux';

const Lession5 = ({batProp,batPriceProp,ballProp,ballPriceProp,batBuy,batSell,ballBuy,ballSell}) => {
    return (
        <div>
            <h1>Lession - 5</h1>
            <h3>Bat Left : {batProp} || Price : {batPriceProp} || Total : {batProp*batPriceProp}</h3>
            <button onClick={()=>{batBuy()}}>Buy A Bat</button>
            <button onClick={()=>{batSell()}}>Sell A Bat</button>
            <h3>Ball Left : {ballProp} || Price : {ballPriceProp} || Total : {ballProp*ballPriceProp}</h3>
            <button onClick={()=>{ballBuy()}}>Buy A Bat</button>
            <button onClick={()=>{ballSell()}}>Sell A Bat</button>
            <h3>Grand Total : {batProp*batPriceProp + ballProp*ballPriceProp}</h3>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        batProp : state.bat.bat,
        batPriceProp : state.bat.batPrice,
        ballProp : state.ball.ball,
        ballPriceProp : state.ball.ballPrice,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        batBuy : () => {dispatch({type:'BUY_BAT'})},
        batSell : () => {dispatch({type:'SELL_BAT'})},
        ballBuy : () => {dispatch({type:'BUY_BALL'})},
        ballSell : () => {dispatch({type:'SELL_BALL'})},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Lession5);
