import {SET_RESULT,RESET_RESULT} from "./types";

export const setResult=(result)=> {
    return {
        type : SET_RESULT,
        payload : result
    }
}

export const ResetResult =()=> {
    return {
        type : RESET_RESULT
    }
}