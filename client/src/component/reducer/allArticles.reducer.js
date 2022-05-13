import { GET_ARTICLES, LIKE_ARTICLES, UNLIKE_ARTICLES } from "../action/action.actu";

const initialState = [
    {
        _id : "",
        title : "",
        message : "",
        createdAt : "",
        likers : []
    }
]

export default function allArticles (state = initialState, action) {
    switch (action.type) {
        case GET_ARTICLES :
            return action.payload
        break;
        case LIKE_ARTICLES:
            let indexLike = [...state].findIndex((item)=>{ return item._id === action.payload._id})
            let newArrayLike = [...state]
            newArrayLike.splice(indexLike,1,action.payload)
            return newArrayLike
        break
        case UNLIKE_ARTICLES:
            let indexUnike = [...state].findIndex((item)=>{ return item._id === action.payload._id})
            let newArrayUnlike = [...state]
            newArrayUnlike.splice(indexUnike,1,action.payload)
            return newArrayUnlike
        break
        default: return state
            break;
    }
}