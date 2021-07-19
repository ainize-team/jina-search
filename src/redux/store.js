import {combineReducers, createStore} from 'redux';
import inputReducer from "./inputs/reducer";
import resultReducer from "./results/reducer";

//store
const rootReducer = combineReducers({
    inputs : inputReducer,
    results : resultReducer
})

const store = createStore(rootReducer)
export default store;