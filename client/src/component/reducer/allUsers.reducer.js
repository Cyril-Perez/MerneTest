import { GET_ALLUSERS , FUNC_FOLLOW_IDFOLLOW} from "../action/action.users";

const initialState = [
    {
        _id: "",
        pseudo: "",
    }
]



export default function AllUsersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALLUSERS:
            return action.payload
            
        case FUNC_FOLLOW_IDFOLLOW :
            let newObject = state.filter((item)=>{ return item._id === action.payload.data.idToFollow})
            console.log(newObject);
            newObject[0].followers.push(action.payload._id)
            let indexUserFollow = state.findIndex((element)=>{ return element._id === action.payload.data.idToFollow})
            let newArrayUserFollow = [...state]
            newArrayUserFollow.splice(indexUserFollow,1,newObject[0])

        return newArrayUserFollow 
        break
        default: return state
           
    }
}