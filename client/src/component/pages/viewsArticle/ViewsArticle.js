import "./viewsArticle.css"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { configDate } from "../../tips/function.utils"
import { likeActu, unlikeActu } from "../../action/action.actu"
import { useDispatch } from "react-redux"




const ViewsArticle = ()=>{

    const params = useParams()
    const dispatch = useDispatch()
    const allArticles = useSelector(article => article.allArticles)
    const state = useSelector(state => state.fetchReducer)
    const [arrayArticles, setArrayArticles] = useState([{title : ""}])
    const [load, setLoad] = useState(false)
    const [index, setIndex] = useState()

    const [chargement, setChargement] = useState("chargement...")

    const handleClickLikeArticle = (_id, data)=>{
            dispatch(likeActu(_id,{id : data}))
    }
    const handleClickUnLikeArticle = (_id, data)=>{
            dispatch(unlikeActu(_id,{id: data}))

    }


    useEffect(()=>{
        if(allArticles.findIndex((item)=> item._id === params.id) !== -1 || undefined){
            setIndex(allArticles.findIndex((item)=> item._id === params.id))
            setArrayArticles(allArticles)      
        } else {           
            setChargement("Mauvaise requete")
        }
    },[allArticles])

    return (
        <section>
                {
                    allArticles[1] && load !== -1 && arrayArticles[1] ? 
                    <div className="container-views-article">
                        <div className="container-views-article-title">
                                <div className="left-title-article"></div>
                                <div className="container-views-article-date-title">
                                    <h1 className="title-views-article">{arrayArticles[index].title}</h1>
                                    <p className="fast-read-txt">2 minutes de lecture </p>
                                    <p className="views-article-txt-date">Posté par <span>ELE'News</span> le {configDate(arrayArticles[index].createdAt)}</p>
                                </div>
                        </div>
                           
                        
                        <img className="img-views-article" src={arrayArticles[index].picture} alt="image d'article"/>
                        <p className="views-article-message">{arrayArticles[index].message}</p>
                        <p className="views-txt-thanks">Merci pour votre lecture pensez à <span>liker</span>, à bientôt !</p>
                        <div className="container-views-article-likers">
                            <p className="views-count-likers">{arrayArticles[index].likers.length}</p>
                            {
                                arrayArticles[index].likers.includes(state._id) ? <img onClick={()=>{handleClickUnLikeArticle(arrayArticles[index]._id, state._id)}} className="img-views-like-unlike-article" src={`${process.env.PUBLIC_URL}/images/img-g/like.svg`} alt="image-likes" /> : 
                                <img onClick={()=>{handleClickLikeArticle(arrayArticles[index]._id, state._id)}}  className="img-views-like-unlike-article" src={`${process.env.PUBLIC_URL}/images/img-g/unLike.svg`} alt="image-unlike"/>
                            }
                        </div>

                        {/* {
                            // allArticles.includes(params.id) ?
                            // arrayArticles.map((item)=>{
                            //     if(item._id === params.id){
                            //         return  <p>{item.title}</p>
                            //     }
                            // }) 
                            // :<p>nooooooooo</p>                          
                        } */}
                    </div>
                    : <h1>{chargement}</h1>
                }
        </section>
    )
}

export default ViewsArticle