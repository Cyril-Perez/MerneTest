const initalState = {
    _id : "",
    email : "",
    pseudo : ""
}

export default function fetchReducer(state= initalState, action ) {
    switch (action.type) {
        case "findUser" :
            const id = toString(action.payload)
            let tampon;
            fetch(`${process.env.REACT_APP_API_REQUEST}/api/user/${id}`, {
                                    method: "GET"
                                }).then((res)=>{
                                   tampon = res
                                }).catch((err)=>{
                                    tampon = err
                                })
            return {
                ...tampon
            }
            
            
            break;
    
        default: return state
           
    }
}