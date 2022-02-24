import { useState , useEffect } from "react"
import Login from "./Login"
import Register from "./Register"
import { useContext } from "react"
import { AppContext } from "../../AppContext"
import {  useSelector } from "react-redux"

// import { loading } from "../tips/function.utils"
import "./log.css"
const Log = ()=>{
    const [load , setLoad] = useState(false)
    const [check , setCheck] = useState(false)
    const allPost = useSelector(state => state.postReducer)
    const user = useSelector(id => id.fetchReducer)
    const context = useContext(AppContext)

    useEffect(() => {
            if(context.uId === null){
                setLoad(true)
            } else {
                setLoad(false)
            }
    }, [context.uId]);

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
        <>
        { load && allPost[0]  ? 
            <div className="container-form">               
                    <div className="container-choice">
                        <h2 onClick={handleClickChoice} id={check ? "login-choice-active-login" : "login-choice" }>Connexion</h2>
                        <h2 onClick={handleClickChoice} id={check ? "register-choice" : "register-choice-active-register"}>Inscription</h2>
                    </div>
                     {check ? <Login/> : <Register putVerif={setCheck}/>}    
            </div>
            : <div className="loading">Loading&#8230;</div> 
        } 
         </>
    )
}

export default Log