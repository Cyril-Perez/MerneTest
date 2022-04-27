import "./navbar.css"
import { AppContext } from "../../AppContext"
import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'


const Navbar = ()=>{

    const context = useContext(AppContext)
    const [valid, setValid] = useState(false)

    //burger button responsive rendu conditionnel 
    const handleChangeValid = ()=>{
        setValid(!valid)
    }
    //function disconnect
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
        //utilisation de js cookie 
        Cookies.remove("jwt")        
        )        
        .catch((err)=>console.log(err))      
        window.location = "/"
    }
    
    return (
        <nav className={`navigation ${valid ? "active" : "no-active"}`}>         
                <Link style={{textDecoration: "none" , color : "black"}} to="/"><img src={`${process.env.PUBLIC_URL}/images/img-g/lelephant.png`} alt="logo website" className="img-logo-navbar"/> </Link>
                <Link style={{textDecoration: "none" , color : "black"}} to={{pathname : `actualités` }}><p>Ele'News</p></Link>
                <Link style={{textDecoration: "none" , color : "black"}} to="/"><p>Accueil</p></Link>
                <Link style={{textDecoration: "none" , color : "black"}} to={{pathname : `profil/${context.uId}` }}><p>Profil</p></Link>
                <Link style={{textDecoration: "none" , color : "black"}} to="/"><p>Publications</p></Link>
                <Link style={{textDecoration: "none" , color : "black"}} to={{pathname : `actualités` }}><p>Actualités</p></Link>
                { context.uId ? <img src={`${process.env.PUBLIC_URL}/images/img-g/exit.png`} alt="icon-logout" onClick={handleDisconnect} className="img-logout"/> : <Link style={{textDecoration: "none" , color : "black"}} to="/"><p>Connexion</p></Link>}
                <img onClick={handleChangeValid} src={`${process.env.PUBLIC_URL}/images/img-g/menu.png`} alt="icon-menu" className="burger-button"/>
        </nav>
    )
}

export default Navbar