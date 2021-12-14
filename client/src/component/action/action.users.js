

export const GET_USER = "GET_USER";
export const UPLOAD_PICS = "UPLOAD_PICS"
export const UPLOADSET_PICS = "UPLOADSET_PICS"

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
  console.log(data);
  return (dispatch) => {
    return fetch(`${process.env.REACT_APP_API_REQUEST}api/user/upload/add/${id}`, {
        method: "POST",
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data) 
    }).then((res)=> {
       return res.json()
     }).then((response)=> dispatch({ type: UPLOAD_PICS, payload: response }))
      .catch((err) => console.log(err));
  };
};

export const uploadSetPics = (data, id) => {
  console.log(data);
  return (dispatch) => {
    return fetch(`${process.env.REACT_APP_API_REQUEST}api/user/upload/put/${id}`, {
        method: "PUT",
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data) 
    }).then((res)=> {
       return res.json()
     }).then((response)=> dispatch({ type: UPLOAD_PICS, payload: response }))
      .catch((err) => console.log(err));
  };
};