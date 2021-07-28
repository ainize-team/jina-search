import {combineReducers, createStore} from 'redux';
import inputReducer from "./inputs/reducer";
import resultReducer from "./results/reducer";
import loadingReducer from "./loading/reducer";
//store
const rootReducer = combineReducers({
    inputs : inputReducer,
    results : resultReducer,
    loading : loadingReducer
})

const store = createStore(rootReducer)
export default store;