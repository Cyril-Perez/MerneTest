import { GET_ALLUSERS } from "../action/action.users";

const initialState = {
    _id : "",
    pseudo : "",
}

export default function AllUsersReducer (state = initialState, action){
    switch (action.type) {
        case GET_ALLUSERS :
            return action.payload
            break;
    
        default: return state
            break;
    }
}