import "./navbar.css"
import { AppContext } from "../../AppContext"
import { useContext } from "react"
import { Link } from "react-router-dom";
const Navbar = ()=>{

    const context = useContext(AppContext)
    return (
        <nav className="nav">         
                <p>Accueil</p>
                <Link style={{textDecoration: "none" , color : "black"}} to={{pathname : `profil/${context.uId}` }}><p>Profil</p></Link>
                <p>✖️</p>
        </nav>
    )
}

export default Navbar