import { GET_POST , UPDATE_POST } from "../action/action.post";

const initialState = []



export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POST:
            return action.payload
            break;
        case UPDATE_POST :
            let newArray = state.filter((item)=>{ return item._id !== action.payload._id})
            return [...newArray, action.payload]
        default: return state
            break;
    }
}