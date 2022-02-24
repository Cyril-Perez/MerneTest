import {LIKE_POST_USER, UNLIKE_POST_USER } from "../action/action.post";
import { GET_USER, UPLOAD_PICS, UPLOADSET_PICS , SET_BIO, FUNC_FOLLOW, FUNC_UNFOLLOW } from "../action/action.users";

const initalState = {
    _id : "",
    email : "",
    pseudo : {}
}

export default function fetchReducer(state= initalState, action ) {
    switch (action.type) {
      case GET_USER:
        return action.payload;
        
        case UPLOAD_PICS :
            return action.payload 
      
        case  UPLOADSET_PICS :
            return action.payload 

        case SET_BIO : 
            return {
                ...state,
                bio : action.payload
            }
        case LIKE_POST_USER :
            let newArrayLikePost = [...state.likes]
            newArrayLikePost.unshift(action.payload)
            return {
                ...state,
                likes : [...newArrayLikePost]
            }
        case UNLIKE_POST_USER :
            let newArrayUnlikePost = state.likes.filter((item)=>{ return item !== action.payload})
            return {
                ...state,
                likes : [...newArrayUnlikePost]
            }
        case FUNC_FOLLOW :
            return {
                ...state,
                following : [...action.payload.following]
            }
        case FUNC_UNFOLLOW :
            return {
                ...state,
                following : [...action.payload.following]
            }
        default: return state
           
    }
}