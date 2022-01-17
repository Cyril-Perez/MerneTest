import { GET_POST , UPDATE_POST , DELETE_POST } from "../action/action.post";

const initialState = []



export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POST:
            return action.payload
            break;

        case UPDATE_POST :
            let indexUpdate = state.findIndex((item)=>{ return item._id === action.payload._id})
            let newArrayUpdate = [...state]
            newArrayUpdate.splice(indexUpdate,1,action.payload)
            return newArrayUpdate
        
        case DELETE_POST :
            let newArrayDelete = state.filter((item)=>{ return item._id !== action.payload._id})
            return newArrayDelete
        default: return state
            break;
    }
}