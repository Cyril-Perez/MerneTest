import {createStore, combineReducers} from "redux"

import fetchReducer from "./component/reducer/fetchReducer"

const allReducers = combineReducers({
    fetchReducer
}) 

const store = createStore(allReducers)