import {GET_POST_PROFIL} from "../action/action.post"

const initalState = [
    {
        _id : "",
        pseudo : "",
        nom : "",
    }
]

export default function allPostsReducer(state= initalState, action ) {
    switch (action.type) {
      case GET_POST_PROFIL :
          return action.payload
           break

        default : return state
        }
}