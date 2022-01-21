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
            <div className="container-heart">
                <p>{props.likers}</p>
                {
                    props.imgLike.includes(user._id) ? <img className="img-like-unlike" src={`${process.env.PUBLIC_URL}/images/img-g/like.svg`} alt="image-likes" /> : 
                    <img className="img-like-unlike" src={`${process.env.PUBLIC_URL}/images/img-g/unLike.svg`} alt="image-unlike"/>
                }
            </div>
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