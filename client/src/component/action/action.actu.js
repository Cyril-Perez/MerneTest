import axios from "axios";


export const GET_ARTICLES = "GET_ARTICLES"
export const LIKE_ARTICLES = "LIKE_ARTICLES"
export const UNLIKE_ARTICLES = "LIKE_ARTICLES"



export const getActu = ()=>{
    return (dispatch)=>{
      return axios
      .get(`${process.env.REACT_APP_API_REQUEST}api/articles`)
      .then((res)=>{
        if(res.data.errors){
          console.log("erreur");
        } else{            
         dispatch({type : GET_ARTICLES , payload : res.data})
        }
      })
      .catch((err)=>{   console.log(err) })
    }
  }
  export const likeActu = (id, data)=>{
    return (dispatch)=>{
      return axios
      .patch(`${process.env.REACT_APP_API_REQUEST}api/articles/like/${id}`, data)
      .then((res)=>{
        if(res.data.errors){
          console.log("erreur");
        } else{            
         dispatch({type : LIKE_ARTICLES , payload : res.data})
        }
      })
      .catch((err)=>{   console.log(err) })
    }
  };

  export const unlikeActu = (id, data)=>{
    return (dispatch)=>{
      return axios
      .patch(`${process.env.REACT_APP_API_REQUEST}api/articles/unlike/${id}`, data)
      .then((res)=>{
        if(res.data.errors){
          console.log("erreur");
        } else{            
         dispatch({type : LIKE_ARTICLES , payload : res.data})
        }
      })
      .catch((err)=>{   console.log(err) })
    }
  };