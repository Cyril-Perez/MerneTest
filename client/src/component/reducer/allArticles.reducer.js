import { GET_ARTICLES } from "../action/action.actu";

const initialState = [
    {
        _id : "",
        title : "",
        message : "",
        createdAt : ""
    }
]

export default function allArticles (state = initialState, action) {
    switch (action.type) {
        case GET_ARTICLES :
            return action.payload
            break;

        default: return state
            break;
    }
}