import "./post.css"
import { useSelector } from "react-redux"

const AllPost = (props)=>{
    const user = useSelector(users => users.fetchReducer)
    const allPost = useSelector(state => state.postReducer)

    return (
        <div className="one-post">
            <p>{props.posterID}</p>
            {
                props.pics ? <img className="img-post"src={props.srcPics}/> : ""
            }
            <p className={props.messageClassName}>{props.message}</p> 
            <p className={props.dateClassName}>{props.date}</p>
            {
                user._id ? <p>{props.modif}</p> : ""
            }
            
            {
                 user._id ? <p>{props.delete}</p> : ""
            
            /* {
              allPost[0] ? allPost.map((item)=>{
                  console.log(item);
                    if(item.posterId === user._id){
                        return (
                            <p>
                                {user._id}
                            </p>
                        )
                    } 
                })  : ""
            }        */}
        </div>
    )
}
export default AllPost