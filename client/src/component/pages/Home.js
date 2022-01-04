import Log from "../log/log"
import { AppContext } from "../../AppContext"
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AllPost from "../post/Post"
import "./Pages.css"

import { configDate } from "../tips/function.utils"
import { getPost } from "../action/action.post"
const Home = ()=>{
    const context = useContext(AppContext)
    const allUsers = useSelector(users => users.AllUsers)
    const allPost = useSelector(state => state.postReducer)
    const [nbrPost , setNbrPost] = useState(3)
    const dispatch = useDispatch()

    const scrollPost = ()=>{
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
                if(nbrPost > allPost.length +1 ){
                    console.log(allPost);
                    let numero = allPost.length+1
                    console.log(nbrPost , allPost.length);
                }else {
                    setNbrPost(nbrPost+3)
                }
          }
    }

    useEffect(()=>{
        dispatch(getPost(nbrPost))
        console.log(allPost.length);
        window.addEventListener("scroll", scrollPost)
        return ()=> window.removeEventListener("scroll", ()=>{ })
    },[ nbrPost ])
    
    
    return ( 
        <>
        {
            <header>
                {          
                context.uId ? <div className="container-post">{
                    allPost.map((item)=>{
                        return <AllPost
                        posterID={
                            allUsers.map((element)=>{
                                    if(element._id === item.posterId){
                                    return element.pseudo
                                    } 
                            })}
                        message={item.message}
                        date={configDate(item.createdAt)}
                        key={item._id}
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