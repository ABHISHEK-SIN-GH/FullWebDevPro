const initialState = {
    ball:0,
    ballPrice:100
}

const BallReducer = (state=initialState,action) => {
    switch(action.type){
        case 'BUY_BALL':
            return {...state,ball:state.ball+6}
        case 'SELL_BALL':
            return {...state,ball:state.ball-6}        
        default : return state;
    }
}

export default BallReducer;