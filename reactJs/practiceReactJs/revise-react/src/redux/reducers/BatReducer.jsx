const initialState = {
    bat:0,
    batPrice:200
}

const BatReducer = (state=initialState,action) => {
    switch(action.type){
        case 'BUY_BAT':
            return {...state,bat:state.bat+1}
        case 'SELL_BAT':
            return {...state,bat:state.bat-1}        
        default : return state;
    }
}

export default BatReducer;