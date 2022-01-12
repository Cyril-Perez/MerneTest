import { GET_POST , UPDATE_POST } from "../action/action.post";

const initialState = []



export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POST:
            return action.payload
            break;
        case UPDATE_POST :
            let index = state.findIndex((item)=>{ return item._id === action.payload._id})

            let newArray = [...state]
            newArray.splice(index,1,action.payload)
            
        
            
            return newArray
        default: return state
            break;
    }
}