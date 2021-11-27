import Log from "../log/log"
import { AppContext } from "../../AppContext"
import { useContext } from "react"
const Home = ()=>{
    const context = useContext(AppContext)

    return ( 
    <>
        {
           
            context.uId === null ? <Log/> : <p>Bienvenue</p>
            

        }
    </>
    )
}

export default Home