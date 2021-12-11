import { GET_USER } from "../action/action.users";

const initalState = {
    _id : "",
    email : "",
    pseudo : ""
}

export default function fetchReducer(state= initalState, action ) {
    switch (action.type) {
        case GET_USER:
      return action.payload;
            
            
            break;
    
        default: return state
           
    }
}