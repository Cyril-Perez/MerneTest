import {createStore, combineReducers , applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension";
import fetchReducer from "./component/reducer/fetchReducer"
import AllUsers from "./component/reducer/allUsers.reducer";
import postReducer from "./component/reducer/post.reducer";
import allPostsReducer from "./component/reducer/allPosts.reducer";
const allReducers = combineReducers({
    fetchReducer,
    AllUsers,
    postReducer,
    allPostsReducer,
}) 

const store = createStore(
    allReducers,
    composeWithDevTools(applyMiddleware(thunk))
    )

export default store