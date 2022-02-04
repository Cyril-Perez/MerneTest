import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { uploadPics, uploadSetPics, majBio } from "../action/action.users"
import CommentPost from "../post/commentPost"
import { configDate, dateNowConfig } from "../tips/function.utils"
import { likePost, unLikePost , createCommentPost } from "../action/action.post"
import "./Pages.css"


const Profil = () => {

    const state = useSelector(state => state.fetchReducer)
    const allUsers = useSelector(users => users.AllUsers)
    const allPosts = useSelector(post => post.allPostsReducer)

    const [verifFollow, setVerifFollow] = useState(null)
    const [viewsComments , setViewsComments] = useState(false)
    // const [filterState, setFilterState] = useState([{_id : "test", picture : "./test" , pseudo : "idee"}])
    // const [validFilter , setValidFilter] = useState(false)
    // if(filterState){
    //     setValidFilter(true)
    // }

    // texte message comment 
    const [messageCommentProfil, setmessageCommentProfil] = useState()
    

    const dispatch = useDispatch()

    //upload Image
    const [file, setFile] = useState()
    const [sendfile, setSendFile] = useState("")


    //set Bio
    const [bio, setBio] = useState()
    const [sendBio, setSendBio] = useState()
    const [verifiyBio, setVerifyBio] = useState(false)


    //function submit Upload Image
    const handleChangePics = (e) => {
        e.preventDefault()
        if (file) {
            const data = new FormData();
            // let fileField = document.querySelector("input[type='file']");
            // console.log(fileField.files[0]);
            data.append("name", state.pseudo)
            data.append("userId", state._id)
            data.append("file", file)
            console.log(file.name);
            for (let key of data.entries()) {
                console.log(key[0] + ', ' + key[1])
            }
            if (state.picture === "http://localhost:3000/images/randomUser.png") {
                dispatch(uploadPics(data, state._id))
            } else {
                dispatch(uploadSetPics(data, state._id))
            }
        } else {
            setSendFile(" : aucun fichier")
        }

    }
    //function save input Upload File
    const handleSaveFile = (e) => {
        setFile(e.target.files[0])
    }

    //function save textearea Data
    const handleSaveDataBio = (e) => {
        setSendBio("")
        setVerifyBio(true)
        setBio(e.target.value)
    }
    //function onChange textarea bio
    const handleClickSetBio = () => {
        setSendBio("Bio modifiée")
        dispatch(majBio(bio, state._id))
        setVerifyBio(false)

    }

    //click views followers following
    const handleClickFollow = (e)=>{
        if(e.target.id === "followers-views"){
            setVerifFollow(false)
        }else if (e.target.id === "followings-views"){
            setVerifFollow(true)
        }
        console.log(verifFollow)
    }

    //click like post img
    const handleClickLikeProfil = (id, userId)=>{
        dispatch(likePost(id , {id : userId}))
    }
    //click unlike post img
    const handleClickUnlikeProfil = (id, userId)=>{
        dispatch(unLikePost(id , {id : userId}))
    }

    // create comment 
    const handleSubmitCreateCommentProfil = (e,id, data )=>{
        e.preventDefault()
        dispatch(createCommentPost(id, data))
    }

    return (
        <>
            <header className="profil-header">
                {
                    state._id ? 
                        
                        <>
                            <div className="content-profil">
                                <h1>Votre Profil : {state.pseudo}</h1>
                                <p className="date-config">{`Crée le : ${configDate(state.createdAt)}`}</p>
                                <div className="content-abonnement">
                                    <div>
                                        <p className="followers-views">Abonnés : {state.followers ? state.followers.length : ""}</p>
                                    </div>
                                    <div>
                                        <p>Abonnement : {state.following ? state.following.length : ""}</p>
                                    </div>

                                </div>
                                <img className="picture-profil-edit" src={state.picture} alt="picture-profil" />
                                <form className="form-change-pics" onSubmit={handleChangePics}>
                                    <label htmlFor="file" className="change-pics">Changer l'image</label>
                                    <input onChange={handleSaveFile} type="file" id="file" name="file" accept=".jpg , .jpeg , .png" />
                                    <p id="error-file">{file ? file.name : "Selectionner un fichier" + sendfile}</p>
                                    <button>Valider</button>
                                </form>
                            </div>
                       
               
                <div className="content-views-followers">
                    <p id="followers-views" onClick={handleClickFollow}>Mes abonnés{ verifFollow === null || verifFollow === true ? <span  onClick={()=>{setVerifFollow(false)}}>&#11015;</span> : <span onClick={()=>{setVerifFollow(null)}}>&#11014;</span>}</p>
                    {
                        verifFollow === null || verifFollow === true ? "" : <ul id="followers-views-list">
                        {allUsers && state.followers ? allUsers.map((item) => {
                            for (let i = 0; i < state.followers.length; i++) {
                                if (item._id == state.followers[i]) {
                                    return (
                                        <li key={item._id}>
                                            <img className="img-follows"  src={item.picture} alt="profil-pics" />
                                            <span>{item.pseudo}</span>
                                        </li>
                                    )
                                }
                            }
                        })
                            : ""
                        }
                    </ul> 
                    }
                </div>
                <div className="content-views-followings">
                    <p id="followings-views" onClick={handleClickFollow}>Mes abonnements{ verifFollow === null || verifFollow === false ? <span  onClick={()=>{setVerifFollow(true)}}>&#11015;</span> : <span onClick={()=>{setVerifFollow(null)}}>&#11014;</span>}</p>
                    {
                        verifFollow === null || verifFollow === false ? "" : <ul>
                        {allUsers && state.following ? allUsers.map((item) => {
                            for (let i = 0; i < state.following.length; i++) {
                                if (item._id == state.following[i]) {
                                    return (
                                        <li key={item._id}>
                                            <img className="img-follows" style={{ height: "30px", width: "30px" }} src={item.picture} alt="profil-pics" />
                                            <span>{item.pseudo}</span>
                                        </li>
                                    )
                                }
                            }
                        })
                            : ""
                        }
                    </ul>
                    }
                </div>
                </>
                : <div></div>}
            </header>
            <>
            {
                state._id ?  
                <section>
                    <div className="content-bio">
                        <h2>Bio</h2>
                        <textarea id={verifiyBio ? "textarea-bio" : ""} onChange={handleSaveDataBio} spellCheck="false" type="text" maxLength="400" defaultValue={state.bio}></textarea>
                        <p className="valid-bio">{sendBio}</p>
                        {verifiyBio ? <button onClick={handleClickSetBio} className="send-button-bio">Valider les changements</button>
                            : <button onClick={() => { setVerifyBio(true) }} className="send-button-bio">Modifier la bio</button>}
                    </div>
                </section>
            : ""

            }
            {
                state._id ? 
                <section>
                        <div className="container-post-id">
                            {
                                allPosts.map((item)=>{
                                        if(item.posterId === state._id) {
                                            return (
                                                <div className="one-post" key={item._id}>
                                                    <div className="container-img-profil-post">
                                                        <img src={state.picture} className="post-pics-profil" alt="images profil"/>
                                                        <p>{state.pseudo}</p>
                                                    </div>
                                                    <Link to={`/profil/views/post/${item._id}`}><img className="icon-edit-post-user" src={`${process.env.PUBLIC_URL}/images/img-g/edit-set.svg`} alt="icon-edit-post" /></Link>
                                                    {
                                                        item.picture ? <img className="img-post"src={item.picture}/> : ""
                                                    }
                                                    <p className="text-message-user">{item.message}</p>
                                                    
                                                    <img onClick={()=>{setViewsComments(!viewsComments)}} className="icon-comment-views" src={`${process.env.PUBLIC_URL}/images/img-g/iconComments.svg`}/>
                                                    {
                                                        viewsComments ? <div>{ item.comments.length !== 0 ? item.comments.map((element)=>{
                                                                        return <CommentPost
                                                                            key={element._id}
                                                                            posterPseudo={element.commenterPseudo}
                                                                            posterCommentId={allUsers.map((data)=>{ 
                                                                                if(data._id === element.commenterId){
                                                                                return data.picture  
                                                                            }})}
                                                                            posterCommenter={element.commenterId}
                                                                            commentMessage={element.text}
                                                                            dateCreated={dateNowConfig(element.timestamp)}
                                                                            
                                                                        />
                                                        }) : <p>Aucun commentaire</p>}</div>: ""
                                                    }
                                                    <form onSubmit={(e)=>{handleSubmitCreateCommentProfil(e,item._id,{commenterId : state._id , commenterPseudo : state.pseudo , text : messageCommentProfil})}} className="form-create-comment">
                                                        <input onChange={(e)=>{setmessageCommentProfil(e.target.value)}} type="text" placeholder="écrire votre commentaire" className="input-txt-comment" />
                                                        <button className="button-create-comment">envoyer</button>
                                                    </form>
                                                    <p className="date-profil">{configDate(item.createdAt)}</p>
                                                    <div className="container-heart">
                                                        <p>{item.likers.length}</p>
                                                        {
                                                            item.likers.includes(state._id) ? <img onClick={()=>{handleClickUnlikeProfil(item._id, state._id)}} className="img-like-unlike" src={`${process.env.PUBLIC_URL}/images/img-g/like.svg`} alt="image-likes" /> : 
                                                            <img onClick={()=>{handleClickLikeProfil(item._id, state._id)}} className="img-like-unlike" src={`${process.env.PUBLIC_URL}/images/img-g/unLike.svg`} alt="image-unlike"/>
                                                        }
                                                    </div>
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
        </>
    )
}

export default Profil