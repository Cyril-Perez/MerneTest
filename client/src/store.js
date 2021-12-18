import {createStore, combineReducers , applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension";
import fetchReducer from "./component/reducer/fetchReducer"
import AllUsers from "./component/reducer/allUsers.reducer";
const allReducers = combineReducers({
    fetchReducer,
    AllUsers,
}) 

const store = createStore(
    allReducers,
    composeWithDevTools(applyMiddleware(thunk))
    )

export default store