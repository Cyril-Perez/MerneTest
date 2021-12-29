import axios from "axios";

export const GET_POST = "GET_POST"

export const getPost = ()=>{
    return (dispatch)=>{
      return axios
      .get(`${process.env.REACT_APP_API_REQUEST}api/post`)
      .then((responsePost)=>{
        if(responsePost.data.errors){
          console.log("erreur");
        } else{
            console.log(responsePost);
            
         dispatch({type : GET_POST , payload : responsePost.data})
        }
      })
      .catch((err)=>{   console.log(err) })
    }
  }