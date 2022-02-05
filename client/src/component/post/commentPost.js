import "./post.css"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { funcFollow, funcUnfollow } from "../action/action.users"


const CommentPost = (props)=>{
    const user = useSelector(state => state.fetchReducer)
    const dispatch = useDispatch()

    const handleClickFollowComment = (id , data)=>{
        dispatch(funcFollow(id, {idToFollow : data}))
    }
    const handleClickUnFollowComment = (id ,data)=>{
        dispatch(funcUnfollow(id, {idToUnFollow : data}))
    }

    return (
        <div className="comment-post">
            {/* <p>{props.posterCommentId}</p> */}
            <div className="container-img-comment-post">
                <img className="img-profil-comment" src={props.posterCommentId.join("")} alt="photo de profil commentaire"/>
                <Link style={{textDecoration : "none"}} to={`/profil/views/profil/${props.posterCommenter}`}><p className="posterId-link-commentPost">{props.posterPseudo}</p></Link>
                {
                    user._id === props.posterCommenter ? "" : 
                    user.following && user.following.includes(props.posterCommenter) ? <img onClick={()=>{handleClickUnFollowComment(user._id , props.posterCommenter)}} src={`${process.env.PUBLIC_URL}/images/img-g/icon-follow.svg`} className="img-follow-unfollow"/> 
                : <img  onClick={()=>{handleClickFollowComment(user._id , props.posterCommenter)}} src={`${process.env.PUBLIC_URL}/images/img-g/icon-unfollow.svg`} className="img-follow-unfollow"/>  
                }
                
            </div>
            
            <p className="txt-comment-post">{props.commentMessage}</p>
            <p>{props.commentDate}</p>
            <>{props.deleteCommentPost}</>
            <p className="date-comment-created">{props.dateCreated}</p>
            
        </div>
    )
}

export default CommentPost