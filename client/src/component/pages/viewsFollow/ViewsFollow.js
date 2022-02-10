import { Link, useParams } from "react-router-dom"
import { useSelector, useDispatch} from "react-redux"
import { funcFollow, funcUnfollow } from "../../action/action.users"
import "./viewsFollow.css"
import { useEffect, useState } from "react"

const ViewsFollow = ()=>{
    const params = useParams()
    const state = useSelector(state => state.fetchReducer)
    const allUsers = useSelector(users => users.AllUsers)
    const allPosts = useSelector(post => post.allPostsReducer)
    const [copyAllUsers, setCopyAllUsers] = useState([])

    useEffect(()=>{
        setCopyAllUsers(allUsers)
    },[allUsers])

    const dispatch = useDispatch()

     //profil follow
     const handleClickFollowViews = (id, data) => {
        dispatch(funcFollow(id, { idToFollow: data }))
    }
    //profil unFollow
    const handleClickUnFollowViews = (id, data) => {
        dispatch(funcUnfollow(id, { idToUnFollow: data }))
    }

    return (
        <section className="section-viewsFollows">
            {
               typeof(allUsers.filter((el)=>el._id === params.id)) === "object" ?
                    allUsers.map((item)=>{
                        if(item._id === params.id){
                            return (
                                <div key={item._id} className="container-viewsFollow">
                                    <h1 className="title-pseudo-views">{`Amis de : ${item.pseudo}`}</h1>
                                    <div className="content-follow-unfollow">
                                        <ul className="ul-followers">
                                            <li className="li-title">Abonnées</li>
                                            {
                                                item.followers && item.followers.length !== 0 ? allUsers.map((element) => {
                
                                                    for (let i = 0; i < item.followers.length; i++) {
                                                        if (element._id == item.followers[i]) {
                                                            return (
                                                                <li className="li-user-views" key={element._id}>
                                                                    <img className="img-follows" src={element.picture} alt="profil-pics" />
                                                                    <Link style={{textDecoration : "none"}} to={`/profil/views/profil/${element._id}`}><span>{element.pseudo}</span></Link>
                                                                    {
                                                                        state._id === element._id ? ""
                                                                        : element.followers && element.followers.includes(state._id) ? <img onClick={() => { handleClickUnFollowViews(state._id, element._id) }} src={`${process.env.PUBLIC_URL}/images/img-g/icon-follow.svg`} className="img-follow-views-profil" />
                                                                        : <img onClick={() => { handleClickFollowViews(state._id, element._id) }} src={`${process.env.PUBLIC_URL}/images/img-g/icon-unfollow.svg`} className="img-unfollow-views-profil" />
                                                                    }
                                                                </li>
                                                            )
                                                        }
                                                    }
                                                }) : <li className="is-empty-follow-unfollow">Aucun abonnés</li>
                                            }
                                        </ul>
                                        <ul className="ul-following">
                                        <li className="li-title">Abonnements</li>
                                            {
                                                item.following && item.following.length !== 0 ? allUsers.map((element) => {
                                                    for (let i = 0; i < item.following.length; i++) {
                                                        if (element._id == item.following[i]) {
                                                            return (
                                                                <li className="li-user-views" key={element._id}>
                                                                    <img className="img-follows"  src={element.picture} alt="profil-pics" />
                                                                    <Link style={{textDecoration : "none"}} to={`/profil/views/profil/${element._id}`}><span>{element.pseudo}</span></Link>
                                                                    {
                                                                        state._id === element._id ? ""
                                                                        : element.followers && element.followers.includes(state._id) ? <img onClick={() => { handleClickUnFollowViews(state._id, element._id) }} src={`${process.env.PUBLIC_URL}/images/img-g/icon-follow.svg`} className="img-follow-views-profil" />
                                                                        : <img onClick={() => { handleClickFollowViews(state._id, element._id) }} src={`${process.env.PUBLIC_URL}/images/img-g/icon-unfollow.svg`} className="img-unfollow-views-profil" />
                                                                    }
                                                                </li>
                                                            )
                                                        }
                                                    }
                                                }) : <li className="is-empty-follow-unfollow">Aucun abonnements</li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    })
                : <h1 style={{textAlign : "center"}}>NON NON NON</h1>
            }
        </section>
    )
}

export default ViewsFollow