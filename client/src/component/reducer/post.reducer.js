import { GET_POST } from "../action/action.post";

const initialState = []



export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POST:
            return action.payload
            break;

        default: return state
            break;
    }
}