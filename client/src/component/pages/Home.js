import Log from "../log/log"
import { AppContext } from "../../AppContext"
import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
const Home = ()=>{
    const context = useContext(AppContext)
    const donnees = useSelector(state => state.fetchReducer)
    const post = useSelector(state => state.postReducer)
    // console.log(donnees);
    useEffect(()=>{
        
    },[])
    return ( 
        <header>
            {
           
            context.uId  ? <h1 style={{textAlign : "center"}}>Bienvenue</h1> : <Log/>             

            }
        </header>
    )
}

export default Home