import "./navbar.css"
import { AppContext } from "../../AppContext"
import { useContext } from "react"
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'


const Navbar = ()=>{

    const context = useContext(AppContext)

    const handleDisconnect =  async ()=>{
       
          await fetch(`${process.env.REACT_APP_API_REQUEST}api/user/logout`,
        {
            method : "GET",
            credentials : "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        }).then(()=>Cookies.remove("jwt")).catch((err)=>console.log(err))
       
        window.location = "/"
        // console.log(doc)
        
        // Cookies.remove("jwt")
        // window.location = "/"
    }
    
    return (
        <nav className="nav">         
                <p>Accueil</p>
                <Link style={{textDecoration: "none" , color : "black"}} to={{pathname : `profil/${context.uId}` }}><p>Profil</p></Link>
                <p onClick={handleDisconnect} style={{cursor : "pointer"}}>✖️</p>
        </nav>
    )
}

export default Navbar