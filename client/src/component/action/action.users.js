

export const GET_USER = "GET_USER";


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