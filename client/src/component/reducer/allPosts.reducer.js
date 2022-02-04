import {GET_POST_PROFIL,CREATE_POST,UPDATE_POST,DELETE_POST,LIKE_POST,UNLIKE_POST,DELETE_COMMENT_POST,CREATE_COMMENT_POST} from "../action/action.post"


const initalState = [
    {
        _id : "",
        pseudo : "",
        nom : "",
    }
]

export default function allPostsReducer(state= initalState, action ) {
    switch (action.type) {
      case GET_POST_PROFIL :
          return action.payload
        
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
        
        case DELETE_COMMENT_POST :
            let indexDeleteCommentPost = state.findIndex((item)=>{ return item._id === action.payload._id})
            let newArrayDeleteCommentPost = [...state]
            newArrayDeleteCommentPost.splice(indexDeleteCommentPost,1,action.payload)
            return newArrayDeleteCommentPost

        case CREATE_COMMENT_POST:
            let indexCreateComment = state.findIndex((item)=>{ return item._id === action.payload._id})
            let newArrayCreateComment = [...state]
            newArrayCreateComment.splice(indexCreateComment,1,action.payload)
            return newArrayCreateComment

        default : return state
        }
}