import Log from "../log/log"
import { AppContext } from "../../AppContext"
import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import AllPost from "../post/Post"
const Home = ()=>{
    const context = useContext(AppContext)
    const donnees = useSelector(state => state.fetchReducer)
    const allUsers = useSelector(users => users.AllUsers)
    const allPost = useSelector(state => state.postReducer)
    
    // console.log(donnees);
    useEffect(()=>{
        console.log(allPost.posterId);
    },[])
    return ( 
        <header>
            {          
            context.uId  ? <div className="container-post">{
                allPost.map((item)=>{
                    return <AllPost
                    posterID={
                        allUsers.map((element)=>{
                                if(element._id === item.posterId){
                                   return element.pseudo
                                } 
                        })}
                    message={item.message}
                    key={item._id}
                    />
                })
            }</div> : <Log/>             
            }
        </header>
    )
}

export default Home