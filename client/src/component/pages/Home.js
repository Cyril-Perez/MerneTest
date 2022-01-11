import Log from "../log/log"
import { AppContext } from "../../AppContext"
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AllPost from "../post/Post"
import "./Pages.css"

import { configDate } from "../tips/function.utils"
import { getPost , majPost } from "../action/action.post"

const Home = ()=>{
    //data reducer 
    const context = useContext(AppContext)
    const allUsers = useSelector(users => users.AllUsers)
    const allPost = useSelector(state => state.postReducer)
    //scroll 
    const [nbrPost , setNbrPost] = useState(3)
    const [load, setLoad] = useState(true)
    //post update
    const [data, setData] = useState()

    const dispatch = useDispatch()

    const handleUpdatePost = (id, e)=>{
        e.preventDefault()
        console.log(id);
        majPost( id, {message : data })
    }

    useEffect(()=>{  
        if(load){
            dispatch(getPost(nbrPost))
            setLoad(false)
            setNbrPost(nbrPost + 3)
        }
        window.addEventListener("scroll", ()=>{
            if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {                                  
                setLoad(true)                                                                      
        }
        })     
        return ()=> window.removeEventListener("scroll", ()=>{
            if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {                                  
                                        setLoad(true)                                                                      
                            }})
    },[ nbrPost , load ])
    
    
    return ( 
        <>
        {
            <header>
                {          
                context.uId ? <div className="container-post">{
                    allPost.map((item)=>{
                        return <AllPost
                        key={item._id}
                        posterID={
                            allUsers.map((element)=>{
                                    if(element._id === item.posterId){
                                    return element.pseudo
                                    } 
                            })}
                        message={item.message}
                        date={`Crée le ${configDate(item.createdAt)}`}
                        modif={item.posterId === context.uId ? 
                            <form onSubmit={handleUpdatePost(item.posterId)} className="update-post-txt">
                                <label>Changer le texte de ma publication</label>
                                <input onChange={(e)=>{ setData(e.target.value)}} type="text" defaultValue={item.message}/>
                                <button>Valider</button>
                            </form>
                            : ""}                       
                        />
                    })
                }</div> : <Log/>             
                }
            </header>
        }
        </>
    )
}

export default Home