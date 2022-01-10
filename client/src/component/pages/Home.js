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
    const [load, setLoad] = useState(true)
    const dispatch = useDispatch()

    // const scrollPost = ()=>{
    //     let num = [...allPost]
    //     if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
    //             if(nbrPost > num.length  ){
    //                 console.log(allPost);
    //                 let numero = allPost.length+1
    //                 console.log(nbrPost , allPost.length);
    //             }else {
    //                 setNbrPost(nbrPost+3)
    //             }
    //       }
    // }

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
            // if(context.uId || context.uId === null ){
            //     console.log(allPost.length);
            //     if(nbrPost > allPost.length){
            //        setLoad("Maximum de publications chargé")
            //     }else{
            //         console.log(nbrPost , allPost.length );
            //          dispatch(getPost(nbrPost))
            //     }          
            //     window.addEventListener("scroll", ()=>{
            //         if(nbrPost > allPost.length) {
            //             return ()=> window.removeEventListener("scroll", ()=>{ })
            //         }else{
            //             if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {                                  
            //                             setNbrPost(nbrPost+3)                                                                      
            //                 }
            //         }                       
            //                 })
            // }
               
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
                        modif={item._id === context.uId ? "c'est bien moi" : ""}                       
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