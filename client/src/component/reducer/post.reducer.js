import { GET_POST } from "../action/action.post";

const initialState = [
    {
        _id: "",
        pseudo: "",
    }
]



export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POST:
            return action.payload
            break;

        default: return state
            break;
    }
}