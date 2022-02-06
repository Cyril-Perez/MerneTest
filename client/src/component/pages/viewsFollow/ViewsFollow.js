import { useParams } from "react-router-dom"
import { useSelector, useDispatch} from "react-redux"
import "./viewsFollow.css"
const ViewsFollow = ()=>{
    const params = useParams()
    const state = useSelector(state => state.fetchReducer)
    const allUsers = useSelector(users => users.AllUsers)
    const allPosts = useSelector(post => post.allPostsReducer)
    const dispatch = useDispatch()

    console.log(params);
    return (
        <section className="section-viewsFollows">
            {
               typeof(allUsers.filter((el)=>el._id === params.id)) === "object" ?
                    allUsers.map((item)=>{
                        if(item._id === params.id){
                            return (
                                <div className="container-viewsFollow">
                                    <h1 className="title-pseudo-views">{`Amis de : ${item.pseudo}`}</h1>
                                    <div className="content-follow-unfollow">
                                        <ul>
                                            <li className="li-title">Abonnées</li>
                                            {
                                                item.followers ? allUsers.map((element) => {
                                                    for (let i = 0; i < item.followers.length; i++) {
                                                        if (element._id == item.followers[i]) {
                                                            return (
                                                                <li className="li-user-views" key={element._id}>
                                                                    <img className="img-follows" src={element.picture} alt="profil-pics" />
                                                                    <span>{element.pseudo}</span>
                                                                </li>
                                                            )
                                                        }
                                                    }
                                                }) : ""
                                            }
                                        </ul>
                                        <ul>
                                        <li className="li-title">Abonnements</li>
                                            {
                                                item.following ? allUsers.map((element) => {
                                                    for (let i = 0; i < item.following.length; i++) {
                                                        if (element._id == item.following[i]) {
                                                            return (
                                                                <li className="li-user-views" key={element._id}>
                                                                    <img className="img-follows"  src={element.picture} alt="profil-pics" />
                                                                    <span>{element.pseudo}</span>
                                                                </li>
                                                            )
                                                        }
                                                    }
                                                }) : ""
                                            }
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    })
                : <div><h1>NON NON NON</h1></div>
            }
        </section>
    )
}

export default ViewsFollow