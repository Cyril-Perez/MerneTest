import axios from "axios";


export const GET_POST = "GET_POST"
export const CREATE_POST = "CREATE_POST"
export const UPDATE_POST = "UPDATE_POST"
export const DELETE_POST = "DELETE_POST"
export const LIKE_POST = "LIKE_POST"
export const LIKE_POST_USER = "LIKE_POST_USER"
export const UNLIKE_POST = "UNLIKE_POST"
export const UNLIKE_POST_USER = "UNLIKE_POST_USER"
export const DELETE_COMMENT_POST = "DELETE_COMMENT_POST"
export const CREATE_COMMENT_POST = "CREATE_COMMENT_POST"
export const GET_POST_PROFIL = "GET_POST_PROFIL"

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
  };

  export const createPost = (data)=>{
    return (dispatch)=>{
      console.log(data);
      return axios
      .post(`${process.env.REACT_APP_API_REQUEST}api/post` , data)
      .then((res)=>{
         dispatch({type : CREATE_POST , payload : res.data})
      })
      .catch((err)=>{   console.log(err) })
    }
  };

  export const majPost = (id , data)=>{
    return (dispatch)=>{
      console.log(id , data);
      return axios
      .put(`${process.env.REACT_APP_API_REQUEST}api/post/${id}` , data)
      .then((res)=>{
         dispatch({type : UPDATE_POST , payload : res.data})
      })
      .catch((err)=>{   console.log(err) })
    }
  };

  
  export const deletePost = (id)=>{
    return (dispatch)=>{     
      return axios
      .delete(`${process.env.REACT_APP_API_REQUEST}api/post/${id}`)
      .then((res)=>{
         dispatch({type : DELETE_POST , payload : res.data})
      })
      .catch((err)=>{   console.log(err) })
    }
  };

  export const likePost = (id , data)=>{
    console.log(id);
    console.log(data);
    return (dispatch)=>{     
      return axios
      .patch(`${process.env.REACT_APP_API_REQUEST}api/post/like-post/${id}`, data)
      .then((res)=>{
         dispatch({type : LIKE_POST_USER , payload : id})
         dispatch({type : LIKE_POST , payload : res.data})
      })
      .catch((err)=>{   console.log(err) })
    }
  };

  export const unLikePost = (id , data)=>{
    console.log(id);
    console.log(data);
    return (dispatch)=>{     
      return axios
      .patch(`${process.env.REACT_APP_API_REQUEST}api/post/unlike-post/${id}`, data)
      .then((res)=>{
         dispatch({type : UNLIKE_POST_USER , payload : id})
         dispatch({type : UNLIKE_POST , payload : res.data})
      })
      .catch((err)=>{   console.log(err) })
    }
  };

  export const createCommentPost = (id , data)=>{
    console.log(id);
    console.log(data);
    return (dispatch)=>{     
      return axios
      .patch(`${process.env.REACT_APP_API_REQUEST}api/post/comment-post/${id}`, data)
      .then((res)=>{
         dispatch({type : CREATE_COMMENT_POST , payload : res.data})
      })
      .catch((err)=>{   console.log(err) })
    }
  };

  export const deleteCommentPost = (id , data)=>{
    console.log(id);
    console.log(data);
    return (dispatch)=>{     
      return axios
      .patch(`${process.env.REACT_APP_API_REQUEST}api/post/delete-comment-post/${id}`, data)
      .then((res)=>{
         dispatch({type : DELETE_COMMENT_POST , payload : res.data})
      })
      .catch((err)=>{   console.log(err) })
    }
  };

  export const getPostProfil = ()=>{
    return (dispatch)=>{
      return axios
      .get(`${process.env.REACT_APP_API_REQUEST}api/post`)
      .then((responsePost)=>{
        if(responsePost.data.errors){
          console.log("erreur");
        } else{
         dispatch({type : GET_POST_PROFIL , payload : responsePost.data})
        }
      })
      .catch((err)=>{   console.log(err) })
    }
  };
