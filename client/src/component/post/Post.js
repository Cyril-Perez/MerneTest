import "./post.css"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { likePost , unLikePost } from "../action/action.post"
import CommentPost from "./commentPost"


const AllPost = (props)=>{
    const user = useSelector(users => users.fetchReducer)
    const allPost = useSelector(state => state.postReducer)
    const dispatch = useDispatch()

    //button view comments
    const [commentViews, setCommentViews] = useState(false)

    const handleClickLike = (id, userId)=>{
        dispatch(likePost(id , {id : userId}))
    }
    const handleClickUnlike = (id, userId)=>{
        dispatch(unLikePost(id , {id : userId}))
    }
    
    return (
        <div className="one-post">
            <p>{props.posterID}</p>
            {
                props.pics ? <img className="img-post"src={props.srcPics}/> : ""
            }
            <p className={props.messageClassName}>{props.message}</p>
            <img onClick={()=>{setCommentViews(!commentViews)}} src={`${process.env.PUBLIC_URL}/images/img-g/iconComments.svg`} className="icon-comment-views"/>
            {
                commentViews ? <div className="container-comments-post">{ props.arrayComments.length >= 0 ? props.arrayComments.map((element)=>{
                    return <CommentPost 
                    key={element._id}
                    posterCommentId={element.commenterId}
                    posterPseudo={element.commenterPseudo}
                    commentMessage={element.text}
                    />
                }) : <p>Aucun commentaire</p> }</div> : ""
            }
            <p className={props.dateClassName}>{props.date}</p>
            <div className="container-heart">
                <p>{props.likers}</p>
                {
                    props.imgLike.includes(user._id) ? <img onClick={()=>{handleClickUnlike(props.onePost, user._id)}} className="img-like-unlike" src={`${process.env.PUBLIC_URL}/images/img-g/like.svg`} alt="image-likes" /> : 
                    <img onClick={()=>{handleClickLike(props.onePost, user._id)}} className="img-like-unlike" src={`${process.env.PUBLIC_URL}/images/img-g/unLike.svg`} alt="image-unlike"/>
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