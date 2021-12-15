import { GET_USER, UPLOAD_PICS, UPLOADSET_PICS , SET_BIO } from "../action/action.users";

const initalState = {
    _id : "",
    email : "",
    pseudo : ""
}

export default function fetchReducer(state= initalState, action ) {
    switch (action.type) {
      case GET_USER:
        return action.payload;
        
        case UPLOAD_PICS :
            return action.payload 
      
        case  UPLOADSET_PICS :
            return action.payload 

        case SET_BIO : 
            return {
                ...state,
                bio : action.payload
            }
        default: return state
           
    }
}