import { GET_USER, UPLOAD_PICS, UPLOADSET_PICS } from "../action/action.users";

const initalState = {
    _id : "",
    email : "",
    pseudo : ""
}

export default function fetchReducer(state= initalState, action ) {
    switch (action.type) {
      case GET_USER:
        return action.payload;
        break
        case UPLOAD_PICS :
            return action.payload 
        break     
        case  UPLOADSET_PICS :
            return action.payload 
    
        default: return state
           
    }
}