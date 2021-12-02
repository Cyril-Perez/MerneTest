import { useParams } from "react-router"
import {Link} from "react-router-dom"
import "./Pages.css"
const Profil = ()=>{
    const params = useParams()
    console.log(params)
    return (
        
        <div className="content-profil">
            {
                params.id === "null" ? <Link style={{textDecoration: "none" , color : "black"}} to="/"><h1>Veuillez-vous connectez</h1></Link> : "bien connecter"
            }
        </div>
    )
}

export default Profil