import axios from "axios";

export const GET_POST = "GET_POST"

export const getPost = (nbr)=>{
    return (dispatch)=>{
      return axios
      .get(`${process.env.REACT_APP_API_REQUEST}api/post`)
      .then((responsePost)=>{
        if(responsePost.data.errors){
          console.log("erreur");
        } else{
            console.log(responsePost);
            if(responsePost.data.length > nbr){
            }
            let newArray = responsePost.data.slice(0, nbr)
         dispatch({type : GET_POST , payload : newArray})
        }
      })
      .catch((err)=>{   console.log(err) })
    }
  }