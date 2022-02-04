import "./post.css"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { createCommentPost, deleteCommentPost, likePost , unLikePost } from "../action/action.post"
import CommentPost from "./commentPost"
import { funcFollow, funcUnfollow } from "../action/action.users"
import { dateNowConfig } from "../tips/function.utils"


const AllPost = (props)=>{
    const user = useSelector(users => users.fetchReducer)
    const allUsers = useSelector(users => users.AllUsers)
    const dispatch = useDispatch()

    //button view comments
    const [commentViews, setCommentViews] = useState(false)

    const [txtComment, setTxtComment] = useState()


    const handleClickLike = (id, userId)=>{
        dispatch(likePost(id , {id : userId}))
    }
    const handleClickUnlike = (id, userId)=>{
        dispatch(unLikePost(id , {id : userId}))
    }

    const handleDeleteCommentPost = (id ,data)=>{
        dispatch(deleteCommentPost(id , {commentId : data}))
    }

    const handleSubmitCreateComment = (e,id, data )=>{
        e.preventDefault()
        dispatch(createCommentPost(id, data))
    }

    const handleClickFollow = (id , data)=>{
        dispatch(funcFollow(id, {idToFollow : data}))
    }
    const handleClickUnFollow = (id ,data)=>{
        dispatch(funcUnfollow(id, {idToUnFollow : data}))
    }
    
    return (
        <div className="one-post">
            <div className="container-img-profil-post">
                <img className="post-pics-profil" src={props.srcPicsProfil.join("")}/>
                <p>{props.posterID}</p>
                {
                    user._id === props.posterData ? "" 
                   : user.following && user.following.includes(props.posterData) ? <img onClick={()=>{handleClickUnFollow(user._id , props.posterData)}} src={`${process.env.PUBLIC_URL}/images/img-g/icon-follow.svg`} className="img-follow-unfollow"/> 
                   : <img  onClick={()=>{handleClickFollow(user._id , props.posterData)}} src={`${process.env.PUBLIC_URL}/images/img-g/icon-unfollow.svg`} className="img-follow-unfollow"/>
                }
               
            </div>        
            {
                props.pics ? <img className="img-post"src={props.srcPics}/> : ""
            }
            <p className={props.messageClassName}>{props.message}</p>
            <img onClick={()=>{setCommentViews(!commentViews)}} src={`${process.env.PUBLIC_URL}/images/img-g/iconComments.svg`} className="icon-comment-views"/>
            {
                commentViews ? <div className="container-comments-post">{ props.arrayComments.length !== 0  ? props.arrayComments.map((element)=>{
                    return <CommentPost 
                    key={element._id}
                    posterCommenter={element.commenterId}
                    posterCommentId={ allUsers.map((item)=>{ 
                        if(item._id === element.commenterId){
                        return item.picture
                    }})}
                    posterPseudo={element.commenterPseudo}
                    
                    deleteCommentPost={ user._id === props.posterData ? <img onClick={()=>{handleDeleteCommentPost(props.onePost, element._id)}} className="delete-img-comment" src={`${process.env.PUBLIC_URL}/images/img-g/dustbin.svg`} /> 
                    : user._id === element.commenterId ? <img onClick={()=>{handleDeleteCommentPost(props.onePost, element._id)}} className="delete-img-comment" src={`${process.env.PUBLIC_URL}/images/img-g/dustbin.svg`}/> : "" }
                    commentMessage={element.text}
                    dateCreated={dateNowConfig(element.timestamp)}
                    />
                }) : <p className="array-is-empty">Aucun commentaire</p> }</div> : ""      
            }
            <form onSubmit={(e)=>{handleSubmitCreateComment(e,props.onePost,{commenterId : user._id , commenterPseudo : user.pseudo , text : txtComment})}} className="form-create-comment">
                <input onChange={(e)=>{setTxtComment(e.target.value)}} type="text" placeholder="écrire votre commentaire" className="input-txt-comment" />
                <button className="button-create-comment">envoyer</button>
            </form>
            <p className={props.dateClassName}>{props.date}</p>
            <div className="container-heart">
                <p>{props.likers}</p>
                {
                    props.imgLike.includes(user._id) ? <img onClick={()=>{handleClickUnlike(props.onePost, user._id)}} className="img-like-unlike" src={`${process.env.PUBLIC_URL}/images/img-g/like.svg`} alt="image-likes" /> : 
                    <img onClick={()=>{handleClickLike(props.onePost, user._id)}} className="img-like-unlike" src={`${process.env.PUBLIC_URL}/images/img-g/unLike.svg`} alt="image-unlike"/>
                }
            </div>
            {
                user._id ? <>{props.modif}</> : ""
            }
            
            {
                 user._id ? <>{props.delete}</> : ""
            
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