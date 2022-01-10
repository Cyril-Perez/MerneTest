import "./post.css"
import { useDispatch, useSelector } from "react-redux"

const AllPost = (props)=>{
    const user = useSelector(users => users.fetchReducer)
    const allPost = useSelector(state => state.postReducer)
    
    return (
        <div className="one-post">
            <p>{props.posterID}</p>
            <p>{props.message}</p> 
            <p>{props.date}</p>
            <p>{props.modif}</p>
            {/* {
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