import {createStore, combineReducers , applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension";
import fetchReducer from "./component/reducer/fetchReducer"

const allReducers = combineReducers({
    fetchReducer
}) 

const store = createStore(
    allReducers,
    composeWithDevTools(applyMiddleware(thunk))
    )

export default store