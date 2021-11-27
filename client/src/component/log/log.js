import { useState } from "react"
import Login from "./Login"
import Register from "./Register"
import { useContext } from "react"
import { AppContext } from "../../AppContext"
import "./log.css"
const Log = ()=>{

    const context = useContext(AppContext)
    const [check , setCheck] = useState(false)

    
    const handleClickChoice = (e)=>{
        if (e.target.id === "register-choice") {
            setCheck(true)
          } else if (e.target.id === "login-choice") {
           setCheck(false)
          }
    }


    return (
        <div className="container-form">
            <div className="container-choice">
                <h2 onClick={handleClickChoice} id="login-choice">Connexion</h2>
                <h2 onClick={handleClickChoice} id="register-choice">Inscription</h2>
            </div>
            { check ? <Login/> : <Register/>}
            
        </div>
    )
}

export default Log