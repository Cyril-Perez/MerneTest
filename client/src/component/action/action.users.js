import axios from "axios";

export const GET_USER = "GET_USER";
export const GET_ALLUSERS = "GET_ALLUSERS";
export const UPLOAD_PICS = "UPLOAD_PICS"
export const UPLOADSET_PICS = "UPLOADSET_PICS"
export const SET_BIO = "SET_BIO"
export const FUNC_FOLLOW = "FUNC_FOLLOW"
export const FUNC_FOLLOW_IDFOLLOW = "FUNC_FOLLOW_IDFOLLOW"


export const getUser = (uid) => {
  return (dispatch) => {
    return fetch(`${process.env.REACT_APP_API_REQUEST}api/user/${uid}`, {
        method: "GET",
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((res)=> {
       return res.json()
     }).then((response)=> dispatch({ type: GET_USER, payload: response }))
      .catch((err) => console.log(err));
  };
};

export const uploadPics = (data, id) => {
  return (dispatch)=>{
    // console.log(data);
    // return (dispatch) => {
    //   return fetch(`${process.env.REACT_APP_API_REQUEST}api/user/upload/put/${id}`, {
    //       method: "PUT",
    //       headers : {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json'
    //       },
    //       body : data 
    //   }).then((res)=> {
    //      return res.json()
    //    }).then((response)=> dispatch({ type: UPLOAD_PICS, payload: response }))
    //     .catch((err) => console.log(err));
    // };
    return axios
    .post(`${process.env.REACT_APP_API_REQUEST}api/user/upload/add/${id}`, data)
    .then((res) => {
      if(res.data.errors){
        console.log("erreur");
      }else {
        dispatch({ type: UPLOADSET_PICS, payload: res.data });
      }   
    }).catch((err)=>{console.log(err);})
  }
};

export const uploadSetPics = (data, id) => {
  return (dispatch)=>{
  // console.log(data);
  // return (dispatch) => {
  //   return fetch(`${process.env.REACT_APP_API_REQUEST}api/user/upload/put/${id}`, {
  //       method: "PUT",
  //       headers : {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //       },
  //       body : data 
  //   }).then((res)=> {
  //      return res.json()
  //    }).then((response)=> dispatch({ type: UPLOAD_PICS, payload: response }))
  //     .catch((err) => console.log(err));
  // };
  return axios
  .put(`${process.env.REACT_APP_API_REQUEST}api/user/upload/put/${id}`, data)
  .then((res) => {
    if(res.data.errors){
      console.log("erreur");
    }else {
      dispatch({ type: UPLOADSET_PICS, payload: res.data });
    }   
  }).catch((err)=>{console.log(err);})
}
};

export const majBio = (data , id)=>{
  return (dispatch)=>{
    return axios
    .put(`${process.env.REACT_APP_API_REQUEST}api/user/${id}`, { bio : data} )
    .then((res)=>{
      if(res.data.errors){
        console.log("erreur");
      } else{
        dispatch({type : SET_BIO , payload : res.data.bio})
      }
    })
    .catch((err)=>{   console.log(err) })
  }
}

export const getAllUsers = ()=>{
  return (dispatch)=>{
      return axios
      .get(`${process.env.REACT_APP_API_REQUEST}api/user`)
      .then((res)=>{
        dispatch({ type : GET_ALLUSERS , payload : res.data})
      })
      .catch((err)=> console.log(err))
  }
}

export const funcFollow = (id,data)=>{
  return (dispatch)=>{
    return axios
    .patch(`${process.env.REACT_APP_API_REQUEST}api/user/follow/${id}`, data)
    .then((res)=>{
      dispatch({type : FUNC_FOLLOW, payload : res.data})
      dispatch({type : FUNC_FOLLOW_IDFOLLOW , payload : {_id : id , data}})

    })
    .catch((err)=>{console.log(err)})
  }
}