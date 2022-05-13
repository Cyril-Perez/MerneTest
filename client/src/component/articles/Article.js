import "./article.css"
import { useDispatch, useSelector } from "react-redux"
import { useContext, useState } from "react"
import { AppContext } from "../../AppContext"
import { likeActu, unlikeActu } from "../action/action.actu"
import { Link } from "react-router-dom"


const Article = (props)=>{

    const state = useSelector(state => state.fetchReducer)
    const context = useContext(AppContext)
    const dispatch = useDispatch()
    const allArticles = useSelector(article => article.allArticles)

    const handleClickLikeArticle = (_id, data)=>{
        if(!context.acces){
            alert("Veuillez-vous connecter")
        } else {
            dispatch(likeActu(_id,{id : data}))
        }
    }
    const handleClickUnLikeArticle = (_id, data)=>{
        if(!context.acces){
            alert("Veuillez-vous connecter")
        } else {
            dispatch(unlikeActu(_id,{id: data}))
        }
    }
    const handleClickViewsArticle = ()=>{
            alert("Veuillez-vous connecter")
        
    }

    return (
        <div className="one-article">
            <img className="img-article" src={props.pics} alt="image article"/>
            <h1 className="title-article">{props.title}</h1>
            <p className="txt-article">{props.message}</p>
            {
                context.acces ? <Link style={{textDecoration : "none"}} to={{pathname : `/actualites/views/article/${props.idArticle}` }}><button className="button-more-read">Lire la suite</button></Link>
                : <button className="button-more-read" onClick={()=>{handleClickViewsArticle(props.idArticle)}}>Lire la suite</button>
            }
            <div className="separation-date-article"></div>
            <div className="container-date-article">   
                <p className="article-categorie-name">Actualité {props.categorie}</p>
                <p className="article-date-blog">{props.date}</p>
            </div>
            {state.role ? <img className="img-edit-article" src={`${process.env.PUBLIC_URL}/images/img-g/edit-set.svg`}/> : ""}
            <div className="container-like-article">
                <p>{props.likers}</p>
                    {
                        props.articleLike.includes(state._id) ? <img onClick={()=>{handleClickUnLikeArticle(props.idArticle,state._id)}} className="img-like-unlike-article" src={`${process.env.PUBLIC_URL}/images/img-g/like.svg`} alt="image-likes" /> : 
                        <img onClick={()=>{handleClickLikeArticle(props.idArticle,state._id)}}  className="img-like-unlike-article" src={`${process.env.PUBLIC_URL}/images/img-g/unLike.svg`} alt="image-unlike"/>
                    }
            </div>
        </div>
    )
}

export default Article