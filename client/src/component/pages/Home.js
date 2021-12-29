import Log from "../log/log"
import { AppContext } from "../../AppContext"
import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import AllPost from "../post/Post"
const Home = ()=>{
    const context = useContext(AppContext)
    const donnees = useSelector(state => state.fetchReducer)
    const allUsers = useSelector(users => users.AllUsers)
    const allPost = useSelector(state => state.postReducer)
    // console.log(donnees);
    useEffect(()=>{
        
    },[])
    return ( 
        <header>
            {          
            context.uId  ? <div className="container-post">{
                allPost.map((item)=>{
                    return <AllPost
                    posterID={allUsers.map((element)=>{
                        for(let i =0 ; i < allPost.length ; i++ ){
                            if(element._id === allPost[i].posterId){
                                return element.pseudo
                            }
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