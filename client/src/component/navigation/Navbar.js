import "./navbar.css"
import { AppContext } from "../../AppContext"
import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'


const Navbar = ()=>{

    const context = useContext(AppContext)

    const [valid, setValid] = useState(false)

    const handleChangeValid = ()=>{
        setValid(!valid)
    }
    const handleDisconnect =  async ()=>{
       
          await fetch(`${process.env.REACT_APP_API_REQUEST}api/user/logout`,
        {
            method : "GET",
            credentials : "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        }).then(()=>
        Cookies.remove("jwt")
        
        )
        
        .catch((err)=>console.log(err))
       
        window.location = "/"
        // console.log(doc)
        
        // Cookies.remove("jwt")
        // window.location = "/"
    }
    
    return (
        <nav className={`navigation ${valid ? "active" : "no-active"}`}>         
                <Link style={{textDecoration: "none" , color : "black"}} to="/"><p>Accueil</p></Link>
                <Link style={{textDecoration: "none" , color : "black"}} to={{pathname : `profil/${context.uId}` }}><p>Profil</p></Link>
                {/* <Link style={{textDecoration: "none" , color : "black"}} to={{pathname : `profil/messagerie/${context.uId}` }}><p>Messagerie</p></Link> */}
                { context.uId ? <img src={`${process.env.PUBLIC_URL}/images/img-g/logout.svg`} alt="icon-logout" onClick={handleDisconnect} className="img-logout"/> : <Link style={{textDecoration: "none" , color : "black"}} to="/"><p>Connexion</p></Link>}
                <img onClick={handleChangeValid} src={`${process.env.PUBLIC_URL}/images/img-g/burger-button.svg`} alt="icon-menu" className="burger-button"/>
        </nav>
    )
}

export default Navbar