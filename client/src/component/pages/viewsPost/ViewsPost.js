import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { configDate, dateNowConfig } from "../../tips/function.utils"
import { likePost,unLikePost, deleteCommentPost , createCommentPost , deletePost , majPost} from "../../action/action.post"
import CommentPost from "../../post/commentPost"
import "../Pages.css"

const ViewsPost = ()=>{
    const params = useParams()
    const state = useSelector(state => state.fetchReducer)
    const allUsers = useSelector(users => users.AllUsers)
    const allPosts = useSelector(post => post.allPostsReducer)
    //state views Comments
    const [activeComments, setActiveComments] = useState(false)
    //save message create comment post
    const [messageCommentViews , setmessageCommentViews] = useState()

    //maj bio post
    const [dataBio , setDataBio] = useState()
    const dispatch = useDispatch()

    //click like post img
    const handleClickLikeViews = (id, userId)=>{
        dispatch(likePost(id , {id : userId}))
    }
    //click unlike post img
    const handleClickUnlikeViews = (id, userId)=>{
        dispatch(unLikePost(id , {id : userId}))
    }

    //delete post 
    const handleDeleteCommentPostViews = (id ,data)=>{
        dispatch(deleteCommentPost(id , {commentId : data}))
    }

    // create comment 
    const handleSubmitCreateCommentViews = (e,id, data )=>{
        e.preventDefault()
        dispatch(createCommentPost(id, data))
    }

    //delete post 
    const handleDeletePostViews = (id)=>{
        dispatch(deletePost(id))
    }

    // update bio post
    const handleUpdatePostViews = (id ,e)=>{
        e.preventDefault()
       dispatch(majPost ( id, {message : dataBio }))
    }

    return (
        <>
            {
                state._id ? 
                <section>
                        <div className="container-post-id">
                            <h1 className="title-views-post">Editer votre publication</h1>
                            {
                                allPosts.map((item)=>{
                                        if(item._id === params.id) {
                                            return (
                                                <div className="one-post" key={item._id}>
                                                    <div className="container-img-profil-post">
                                                        <img src={state.picture} className="post-pics-profil" alt="images profil"/>
                                                        <p>{state.pseudo}</p>
                                                    </div>
                                                    {
                                                        item.picture ? <img className="img-post"src={item.picture}/> : ""
                                                    }
                                                    <p className="text-message-user">{item.message}</p>
                                                    
                                                    <img onClick={()=>{setActiveComments(!activeComments)}} className="icon-comment-views" src={`${process.env.PUBLIC_URL}/images/img-g/iconComments.svg`}/>
                                                    {
                                                        activeComments ? <div>{ item.comments.length !== 0 ? item.comments.map((element)=>{
                                                                        return <CommentPost
                                                                            key={element._id}
                                                                            posterPseudo={element.commenterPseudo}
                                                                            //recherche photo du posterCommentId
                                                                            posterCommentId={allUsers.map((data)=>{ 
                                                                                if(data._id === element.commenterId){
                                                                                return data.picture  
                                                                            }})}
                                                                            posterCommenter={element.commenterId}
                                                                            commentMessage={element.text}
                                                                            dateCreated={dateNowConfig(element.timestamp)}
                                                                            //si la personne connectez a cliquez sur un post ou il a lui même commenter
                                                                            deleteCommentPost={
                                                                                state._id === item.commenterId ? <img onClick={()=>{handleDeleteCommentPostViews(item._id, element._id)}} className="delete-img-comment" src={`${process.env.PUBLIC_URL}/images/img-g/dustbin.svg`} /> 
                                                                                : state._id === element.commenterId ? <img onClick={()=>{handleDeleteCommentPostViews(item._id, element._id)}} className="delete-img-comment" src={`${process.env.PUBLIC_URL}/images/img-g/dustbin.svg`}/> : "" }
                                                                        />
                                                        }) : <p>Aucun commentaire</p>}</div>: ""
                                                    }
                                                    <form onSubmit={(e)=>{handleSubmitCreateCommentViews(e,item._id,{commenterId : state._id , commenterPseudo : state.pseudo , text : messageCommentViews})}} className="form-create-comment">
                                                        <input onChange={(e)=>{setmessageCommentViews(e.target.value)}} type="text" placeholder="écrire votre commentaire" className="input-txt-comment" />
                                                        <button className="button-create-comment">envoyer</button>
                                                    </form>
                                                    <p className="date-profil">{configDate(item.createdAt)}</p>
                                                    <div className="container-heart">
                                                        <p>{item.likers.length}</p>
                                                        {
                                                            item.likers.includes(state._id) ? <img onClick={()=>{handleClickUnlikeViews(item._id, state._id)}} className="img-like-unlike" src={`${process.env.PUBLIC_URL}/images/img-g/like.svg`} alt="image-likes" /> : 
                                                            <img onClick={()=>{handleClickLikeViews(item._id, state._id)}} className="img-like-unlike" src={`${process.env.PUBLIC_URL}/images/img-g/unLike.svg`} alt="image-unlike"/>
                                                        }
                                                    </div>
                                                    <>{item.posterId === state._id ? <img onClick={()=>{handleDeletePostViews(item._id)}} className="img-delete" src={`${process.env.PUBLIC_URL}/images/img-g/dustbin.svg`} alt="icon-delete-post"/> : ""}</>
                                                    <>{
                                                        item.posterId === state._id ? 
                                                        <form onSubmit={(e)=>handleUpdatePostViews(item._id,e)} className="update-post-txt">
                                                            <label className="label-form-update-form">Changer le texte de ma publication</label>
                                                            <div>
                                                                <input className="input-form-update-post" onChange={(e)=>{ setDataBio(e.target.value)}} id={item.posterId} type="text" defaultValue={item.message}/>
                                                                <button>Valider</button>
                                                            </div>
                                                        </form>
                                                        : ""
                                                    }</>
                                                </div>
                                            )
                                        }
                                })
                            }
                        </div>
                </section>
                : ""
            }
        </>
    )
}

export default ViewsPost