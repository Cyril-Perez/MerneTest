import { useState, useEffect } from "react"
import Login from "./Login"
import Register from "./Register"
import { useContext } from "react"
import { AppContext } from "../../AppContext"
// import { loading } from "../tips/function.utils"
import "./log.css"
const Log = (props)=>{
    // const [load , setLoad] = useState(true)
    const context = useContext(AppContext)
    const [check , setCheck] = useState(false)

    // useEffect(() => {
    //         !loading(context.uId) && setLoad(false);
    // }, [context]);

    const handleClickChoice = (e)=>{
        if (e.target.id === "login-choice") {
            setCheck(true)
          } else if (e.target.id === "register-choice") {
           setCheck(false)
          }
    }


    return (
        // <>
        // {
        //     load === true ? <div class="loadingio-spinner-spinner-z9zfdqnee7r"><div class="ldio-ptavzxzpzuk">
        //     <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        //     </div></div> : 
            <div className="container-form">
                <div className="container-choice">
                    <h2 onClick={handleClickChoice} id="login-choice">Connexion</h2>
                    <h2 onClick={handleClickChoice} id="register-choice">Inscription</h2>
                </div>
                { check ? <Login/> : <Register/>}       
            </div>
        // }
            
        // </>
    )
}

export default Log