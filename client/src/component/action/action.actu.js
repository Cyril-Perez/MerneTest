import axios from "axios";


export const GET_ARTICLES = "GET_ARTICLES"

export const getActu = ()=>{
    return (dispatch)=>{
      return axios
      .get(`${process.env.REACT_APP_API_REQUEST}api/articles`)
      .then((res)=>{
        if(res.data.errors){
          console.log("erreur");
        } else{
            
         dispatch({type : GET_ARTICLES , payload : res})
        }
      })
      .catch((err)=>{   console.log(err) })
    }
  };