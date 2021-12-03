import Log from "../log/log"
import { AppContext } from "../../AppContext"
import { useContext } from "react"
import { useSelector } from "react-redux"
const Home = ()=>{
    const context = useContext(AppContext)
    const donnees = useSelector(state => state.fetchReducer)
    console.log(donnees);
    return ( 
    <>
        {
           
            context.uId === null ? <Log/> : <h1 style={{textAlign : "center"}}>Bienvenue</h1>
            

        }
    </>
    )
}

export default Home