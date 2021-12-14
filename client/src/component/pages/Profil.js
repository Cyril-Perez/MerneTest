import { useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import {Link} from "react-router-dom"
import { AppContext } from "../../AppContext"
import { uploadPics, uploadSetPics } from "../action/action.users"
import "./Pages.css"
const Profil = ()=>{
    const params = useParams()
    const state = useSelector(state => state.fetchReducer)
    const [file , setFile] = useState()
    const dispatch = useDispatch()
    const context = useContext(AppContext)

    

    const handleChangePics = (e)=>{
        e.preventDefault()
        const data = new FormData();
        let fileField = document.querySelector("input[type='file']");
        console.log(fileField.files[0]);
        data.append("name", state.pseudo)
        data.append("userId", state._id)
        data.append("file", fileField)
        // console.log(file);
        console.log(data);
        if(state._id === "http://localhost:3000/images/randomUser.png"){
            dispatch(uploadPics(data, state._id))
        } else {
            dispatch(uploadSetPics(data, state._id))
        }    
    }

    const handleSaveFile = (e)=>{
        setFile(e.target.files[0])
    }

    return (
        
        <>
            {
                params.id ? 
                <div className="content-profil"> 
                    <h1>Bien connecter {state.pseudo}</h1>
                    <img src={state.picture}/>
                    <form onSubmit={handleChangePics}>
                        <label htmlFor="file" className="change-pics">Changer l'image</label>
                        <input onChange={handleSaveFile} type="file" id="file" name="file" accept=".jpg , .jpeg , .png"/>
                        <button>Valider</button>
                    </form>
                </div> : <Link style={{textDecoration: "none" , color : "black"}} to="/"><h1>Veuillez-vous connectez</h1></Link>
                
                
            }
        </>
    )
}

export default Profil