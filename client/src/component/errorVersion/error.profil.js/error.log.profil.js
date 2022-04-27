import {Link} from "react-router-dom"
import "./error.css"

const ErrorLogProfil = ()=>{

    return (
        <header className="header-error-log">
            <p className="txt-error-log">Pour accéder à votre profil </p>
            <Link to="/" style={{textDecoration : "none" , color : "whitesmoke"}}><h2 className="redirection-error-log">Veuillez-vous connecter</h2></Link>
        </header>
    ) 
}
export default ErrorLogProfil