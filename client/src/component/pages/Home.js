import Log from "../log/log"
import { AppContext } from "../../AppContext"
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AllPost from "../post/Post"
import "./Pages.css"

import { configDate } from "../tips/function.utils"
import { getPost , majPost , deletePost } from "../action/action.post"
import CreatePost from "../createPost/CreatePost"

const Home = ()=>{
    //data reducer 
    const context = useContext(AppContext)
    const allUsers = useSelector(users => users.AllUsers)
    const allPost = useSelector(state => state.postReducer)
    //scroll 
    const [nbrPost , setNbrPost] = useState(3)
    const [load, setLoad] = useState(true)

    //creation post button
    const [createPost, setCreatePost] = useState(true)

    //post update
    const [data, setData] = useState({})

    const dispatch = useDispatch()

    //form update message post
    const handleUpdatePost = (id ,e)=>{
        e.preventDefault()
       dispatch(majPost ( id, {message : data }))
    }

    //Scroll infinie
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
    },[ nbrPost,load ])

    //delete post
    const handleDeletePost = (id)=>{
        dispatch(deletePost(id))
    }
    
    
    return ( 
        <>
        {
            <header>
                {          
                context.uId ? <div className="container-post">
                    <div className="container-create-post">
                    <p onClick={()=>{setCreatePost(!createPost)}} className="link-create-post">{createPost ? "+" : "-"}</p>
                    {
                        createPost ? "" : <CreatePost verif={setCreatePost}/>
                    }
                    </div>
                    {
                    allPost.map((item)=>{
                        return <AllPost
                        key={item._id}
                        pics={item.picture ? true : false }
                        srcPics={item.picture}
                        posterID={
                            allUsers.map((element)=>{
                                    if(element._id === item.posterId){
                                    return element.pseudo
                                    } 
                            })}
                        messageClassName={item.posterId === context.uId ? "text-message-user" : "text-message-all"}
                        message={item.message}
                        arrayComments={item.comments}
                        dateClassName={item.posterId === context.uId ? "text-date-user" : "text-date-all"}
                        onePost={item._id}
                        likers={item.likers.length}
                        imgLike={item.likers}
                        date={`Crée le ${configDate(item.createdAt)}`}
                        modif={item.posterId === context.uId ? 
                            <form onSubmit={(e)=>handleUpdatePost(item._id,e)} className="update-post-txt">
                                <label>Changer le texte de ma publication</label>
                                <input onChange={(e)=>{ setData(e.target.value)}} id={item.posterId} type="text" defaultValue={item.message}/>
                                <button>Valider</button>
                            </form>
                            : ""}
                        delete={item.posterId === context.uId ? <img onClick={()=>{handleDeletePost(item._id)}} className="img-delete" src={`${process.env.PUBLIC_URL}/images/img-g/dustbin.svg`} alt="icon-delete-post"/> 
                        
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