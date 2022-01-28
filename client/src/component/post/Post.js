import "./post.css"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { createCommentPost, deleteCommentPost, likePost , unLikePost } from "../action/action.post"
import CommentPost from "./commentPost"


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

    const handleSubmitCreatePost = (e,id, data )=>{
        e.preventDefault()
        dispatch(createCommentPost(id, data))
    }
    
    return (
        <div className="one-post">
            <div className="container-img-profil-post">
                <img className="post-pics-profil" src={props.srcPicsProfil.join("")}/>
                <p>{props.posterID}</p>
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
                    posterCommentId={ allUsers.map((item)=>{ 
                        if(item._id === element.commenterId){
                        return item.picture
                        
                    }})}
                    posterPseudo={element.commenterPseudo}
                    deleteCommentPost={ user._id === props.posterData ? <img onClick={()=>{handleDeleteCommentPost(props.onePost, element._id)}} className="delete-img-comment" src={`${process.env.PUBLIC_URL}/images/img-g/dustbin.svg`} /> 
                    : user._id === element.commenterId ? <img onClick={()=>{handleDeleteCommentPost(props.onePost, element._id)}} className="delete-img-comment" src={`${process.env.PUBLIC_URL}/images/img-g/dustbin.svg`}/> : "" }
                    commentMessage={element.text}
                    />
                }) : <p className="array-is-empty">Aucun commentaire</p> }</div> : ""
            }
            <form onSubmit={(e)=>{handleSubmitCreatePost(e,props.onePost,{commenterId : user._id , commenterPseudo : user.pseudo , text : txtComment})}} className="form-create-comment">
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
                user._id ? <p>{props.modif}</p> : ""
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