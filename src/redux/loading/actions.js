import {SET_LOADING} from "./types";


//action

export const setLoading = (input) =>{
    return {
        type: SET_LOADING,
        payload: input
    }
}



