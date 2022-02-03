import { GET_ALLUSERS , FUNC_FOLLOW_IDFOLLOW, FUNC_UNFOLLOW_IDFOLLOW} from "../action/action.users";

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

        case FUNC_UNFOLLOW_IDFOLLOW :
            let newObjectU = state.filter((item)=>{ return item._id === action.payload.data.idToUnFollow})
            let indexUnFollow = newObjectU[0].followers.findIndex((item)=>{return item === action.payload._id})
            newObjectU[0].followers.splice(indexUnFollow,1)
            let indexUserUnfollow = state.findIndex((item)=>{ return item._id === action.payload.data.idToUnFollow})
            let newArrayUserUnfollow = [...state]
            newArrayUserUnfollow.splice(indexUserUnfollow,1,newObjectU[0])
            return newArrayUserUnfollow

        break
        default: return state
           
    }
}