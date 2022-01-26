import { GET_POST , CREATE_POST, UPDATE_POST , DELETE_POST ,LIKE_POST, UNLIKE_POST } from "../action/action.post";

const initialState = []



export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POST:
            return action.payload
            break;

        case CREATE_POST :
            let newArrCreate = [...state]
            newArrCreate.unshift(action.payload)
            return newArrCreate

        case UPDATE_POST :
            let indexUpdate = state.findIndex((item)=>{ return item._id === action.payload._id})
            let newArrayUpdate = [...state]
            newArrayUpdate.splice(indexUpdate,1,action.payload)
            return newArrayUpdate
        
        case DELETE_POST :
            let newArrayDelete = state.filter((item)=>{ return item._id !== action.payload._id})
            return newArrayDelete

        case LIKE_POST : 
            let indexLikePost = state.findIndex((item)=>{ return item._id === action.payload._id})
            let newArrayLikePost = [...state]
            newArrayLikePost.splice(indexLikePost,1,action.payload)
            return newArrayLikePost

        case UNLIKE_POST : 
            let indexUnlikePost = state.findIndex((item)=>{ return item._id === action.payload._id})
            let newArrayUnlikePost = [...state]
            newArrayUnlikePost.splice(indexUnlikePost,1,action.payload)
            return newArrayUnlikePost

        default: return state
            break;
    }
}