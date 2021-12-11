import { useSelector } from "react-redux"
import { useParams } from "react-router"
import {Link} from "react-router-dom"
import "./Pages.css"
const Profil = ()=>{
    const params = useParams()
    const state = useSelector(state => state.fetchReducer)
    return (
        
        <div className="content-profil">
            {
                params.id ? <h1>Bien connecter {state.pseudo}</h1> : <Link style={{textDecoration: "none" , color : "black"}} to="/"><h1>Veuillez-vous connectez</h1></Link>
            }
        </div>
    )
}

export default Profil