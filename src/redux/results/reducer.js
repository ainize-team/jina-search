import {SET_RESULT,RESET_RESULT} from "./types";

const initialState = {
    result : {},
}

const resultReducer = (state=initialState,action) =>{
    switch (action.type) {
        case SET_RESULT:
            return{
                ...state,
                result: action.payload
            }
        case RESET_RESULT:
            return {
                ...state,
                result: {}
            }
        default:
            return state
    }
}

export default resultReducer;
