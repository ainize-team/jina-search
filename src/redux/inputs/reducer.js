import {SET_INPUT, RESET_INPUT} from "./types";

const initialState={
    input : ""
}


const inputReducer = (state=initialState,action) => {
    switch (action.type){
        case SET_INPUT:
            return {
                ...state,
                input: action.payload
            }
        case RESET_INPUT:
            return {
                ...state,
                input: ""
            }
        default:
            return state;
    }

}

export default inputReducer