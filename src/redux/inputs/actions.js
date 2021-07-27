import {SET_INPUT, RESET_INPUT} from "./types";


//action

export const setInput = (input) =>{
    return {
        type: SET_INPUT,
        payload: input
    }
}

export const resetInput = () =>{
    return {
        type: RESET_INPUT
    }
}


