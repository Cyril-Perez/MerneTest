import "./viewsProfil.css"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { funcFollow, funcUnfollow } from "../../action/action.users"
import { deleteCommentPost, createCommentPost, deletePost, majPost, likePost, unLikePost } from "../../action/action.post"
import { configDate, dateNowConfig } from "../../tips/function.utils"
import { Link } from "react-router-dom"
import "../Pages.css"
import "./viewsProfil.css"
import { useEffect, useState } from "react"
import CommentPost from "../../post/commentPost"

const ViewsProfil = () => {
    const params = useParams()

    const state = useSelector(state => state.fetchReducer)
    const allUsers = useSelector(users => users.AllUsers)
    const allPosts = useSelector(post => post.allPostsReducer)
    const dispatch = useDispatch()

    const [activeCommsViews, setActiveCommsViews] = useState(false)
    const [viewsBio, setViewsBio] = useState()
    

    useEffect(()=>{
        document.getElementById("content-views-profil").scrollIntoView()
       
    },[])

    //profil follow
    const handleClickFollowViewsProfil = (id, data) => {
        dispatch(funcFollow(id, { idToFollow: data }))
    }
    //profil unFollow
    const handleClickUnFollowViewsProfil = (id, data) => {
        dispatch(funcUnfollow(id, { idToUnFollow: data }))
    }

    //delete post 
    const handleDeleteCommentPostViews = (id, data) => {
        dispatch(deleteCommentPost(id, { commentId: data }))
    }

    // create comment 
    const handleSubmitCreateCommentViews = (e, id, data) => {
        e.preventDefault()
        dispatch(createCommentPost(id, data))
    }

    //delete post 
    const handleDeletePostViews = (id) => {
        dispatch(deletePost(id))
    }

    // update bio post
    const handleUpdatePostViews = (id, e) => {
        e.preventDefault()
        dispatch(majPost(id, { message: viewsBio }))
    }

    //click Like post img
    const handleClickLikeViews = (id, userId) => {
        dispatch(likePost(id, { id: userId }))
    }

    //click unlike post img
    const handleClickUnlikeViews = (id, userId) => {
        dispatch(unLikePost(id, { id: userId }))
    }

    return (
        <section id="content-views-profil">
            {
                params.id ?
                    allUsers.map((item) => {
                        if (item._id === params.id) {
                            return (
                                <div key={item._id} className="content-profil">
                                    <div className="content-profil-like-unlike">
                                        <h1>{item.pseudo}</h1>
                                        {
                                            state._id === item._id ? ""
                                                : item.followers && item.followers.includes(state._id) ? <img onClick={() => { handleClickUnFollowViewsProfil(state._id, item._id) }} src={`${process.env.PUBLIC_URL}/images/img-g/icon-follow.svg`} className="img-follow-views-profil" />
                                                    : <img onClick={() => { handleClickFollowViewsProfil(state._id, item._id) }} src={`${process.env.PUBLIC_URL}/images/img-g/icon-unfollow.svg`} className="img-unfollow-views-profil" />
                                        }
                                    </div>

                                    <p className="date-config">{`Crée le : ${configDate(item.createdAt)}`}</p>
                                    <div className="content-abonnement">
                                        <div>
                                            <Link style={{textDecoration : "none"}} to={`/profil/views/follow/${item._id}`}><p className="followers-views">Abonnés : {item.followers ? item.followers.length : ""}</p></Link>
                                        </div>
                                        <div>
                                            <Link style={{textDecoration : "none"}} to={`/profil/views/follow/${item._id}`}><p className="followers-views">Abonnements : {item.followers ? item.following.length : ""}</p></Link>
                                        </div>

                                    </div>
                                    <div className="container-pics-profil">
                                        <img className="picture-profil-edit" src={item.picture} alt="picture-profil" />
                                    </div>
                                    <div className="content-bio-views">
                                        <p>{item.bio}</p>
                                    </div>
                                </div>

                            )
                        }
                    })
                    : ""
            }
            {
                params.id ?
                    <div className="container-post-views">
                        {
                            allPosts.map((post) => {
                                if (post.posterId === params.id)
                                    return (
                                        <div className="one-post-views" key={post._id}>
                                            <div className="container-img-profil-post">
                                                <img src={allUsers.map((data)=>{
                                                    if(data._id === post.posterId){
                                                        return data.picture
                                                    }
                                                }).join("")} className="post-pics-profil" alt="images profil" />
                                                <p>{allUsers.map((profil)=>{
                                                    if(profil._id === post.posterId){
                                                        return profil.pseudo
                                                    }
                                                })}</p>
                                            </div>
                                            {
                                                post.picture ? <img className="img-post" src={post.picture} /> : ""
                                            }
                                            <p className="text-message-user">{post.message}</p>

                                            <img onClick={() => { setActiveCommsViews(!activeCommsViews) }} className="icon-comment-views" src={`${process.env.PUBLIC_URL}/images/img-g/iconComments.svg`} />
                                            {
                                                activeCommsViews ? <div>{post.comments.length !== 0 ? post.comments.map((element) => {
                                                    return <CommentPost
                                                        key={element._id}
                                                        posterPseudo={element.commenterPseudo}
                                                        posterCommentId={allUsers.map((data) => {
                                                            if (data._id === element.commenterId) {
                                                                return data.picture
                                                            }
                                                        })}
                                                        posterCommenter={element.commenterId}
                                                        commentMessage={element.text}
                                                        dateCreated={dateNowConfig(element.timestamp)}
                                                        deleteCommentPost={
                                                            state._id === post.commenterId ? <img onClick={() => { handleDeleteCommentPostViews(post._id, element._id) }} className="delete-img-comment" src={`${process.env.PUBLIC_URL}/images/img-g/dustbin.svg`} />
                                                                : state._id === element.commenterId ? <img onClick={() => { handleDeleteCommentPostViews(post._id, element._id) }} className="delete-img-comment" src={`${process.env.PUBLIC_URL}/images/img-g/dustbin.svg`} /> : ""}
                                                    />
                                                }) : <p>Aucun commentaire</p>}</div> : ""
                                            }
                                            <form onSubmit={(e) => { handleSubmitCreateCommentViews(e, post._id, { commenterId: state._id, commenterPseudo: state.pseudo, text: viewsBio }) }} className="form-create-comment">
                                                <input onChange={(e) => { setViewsBio(e.target.value) }} type="text" placeholder="écrire votre commentaire" className="input-txt-comment" />
                                                <button className="button-create-comment">envoyer</button>
                                            </form>
                                            <p className="date-profil">{configDate(post.createdAt)}</p>
                                            <div className="container-heart">
                                                <p>{post.likers.length}</p>
                                                {
                                                    post.likers.includes(state._id) ? <img onClick={() => { handleClickUnlikeViews(post._id, state._id) }} className="img-like-unlike" src={`${process.env.PUBLIC_URL}/images/img-g/like.svg`} alt="image-likes" /> :
                                                        <img onClick={() => { handleClickLikeViews(post._id, state._id) }} className="img-like-unlike" src={`${process.env.PUBLIC_URL}/images/img-g/unLike.svg`} alt="image-unlike" />
                                                }
                                            </div>
                                            <>{post.posterId === state._id ? <img onClick={() => { handleDeletePostViews(post._id) }} className="img-delete" src={`${process.env.PUBLIC_URL}/images/img-g/dustbin.svg`} alt="icon-delete-post" /> : ""}</>
                                            <>{
                                                post.posterId === state._id ?
                                                    <form onSubmit={(e) => handleUpdatePostViews(post._id, e)} className="update-post-txt">
                                                        <label className="label-form-update-form">Changer le texte de ma publication</label>
                                                        <div>
                                                            <input className="input-form-update-post" onChange={(e) => { setViewsBio(e.target.value) }} id={post.posterId} type="text" defaultValue={post.message} />
                                                            <button>Valider</button>
                                                        </div>
                                                    </form>
                                                    : ""
                                            }</>
                                        </div>
                                    )

                            })
                        }
                    </div> : ""
            }
        </section>
    )
}

export default ViewsProfil