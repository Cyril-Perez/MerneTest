const initialState = {
    _id : "",
    pseudo : "",
}

export default function postReducer (state = initialState, action){
    switch (action.type) {
        case "value":
            
            break;
    
        default: return state
            break;
    }
}