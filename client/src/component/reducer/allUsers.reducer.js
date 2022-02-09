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

            let newArrayUserFollow = [...state]
            
            //personne recevant le follow +1 abonné
            let newObject = state.filter((item)=>{ return item._id === action.payload.data.idToFollow})
            console.log(newObject);
            newObject[0].followers.push(action.payload._id)
            let indexUserFollow = state.findIndex((element)=>{ return element._id === action.payload.data.idToFollow})
            newArrayUserFollow.splice(indexUserFollow,1,newObject[0])

            //personne donnant un abonnement +1 abonnement
            let indexUserUnFollow = state.findIndex((element)=>{ return element._id === action.payload._id})
            let objectFilter = state.filter((item)=>{ return item._id === action.payload._id})
            objectFilter[0].following.unshift(action.payload.data.idToFollow)
            newArrayUserFollow.splice(indexUserUnFollow,1,objectFilter[0])

            return newArrayUserFollow 

        case FUNC_UNFOLLOW_IDFOLLOW :
            
            let newArrayUserUnfollow = [...state]

            //personne recevant le unFollow -1 abonné
            let newObjectU = state.filter((item)=>{ return item._id === action.payload.data.idToUnFollow})
            let indexUnFollow = newObjectU[0].followers.findIndex((item)=>{return item === action.payload._id})
            newObjectU[0].followers.splice(indexUnFollow,1)
            let indexUserUnfollow = state.findIndex((item)=>{ return item._id === action.payload.data.idToUnFollow})
            newArrayUserUnfollow.splice(indexUserUnfollow,1,newObjectU[0])
            
            //personne donnant le unFollow -1 abonnement
            let newObjectUnFollow = state.filter((item)=>{ return item._id === action.payload._id})
            let indexUnFollowGiving = newObjectUnFollow[0].following.findIndex((item)=>{return item === action.payload.data.idToUnFollow})
            newObjectUnFollow[0].following.splice(indexUnFollowGiving,1)
            let indexUserUnfollowGiving = state.findIndex((item)=>{ return item._id === action.payload._id})
            newArrayUserUnfollow.splice(indexUserUnfollowGiving,1,newObjectUnFollow[0])

            return newArrayUserUnfollow

        break
        default: return state
           
    }
}