import "./article.css"
import { useSelector } from "react-redux"


const Article = (props)=>{

    const state = useSelector(state => state.fetchReducer)

    return (
        <div className="one-article">
            <img className="img-article" src={props.pics} alt="image article"/>
            <h1 className="title-article">{props.title}</h1>
            <p className="txt-article">{props.message}</p>
            <button className="button-more-read">Lire la suite</button>
            <div className="separation-date-article"></div>
            <div className="container-date-article">   
                <p className="article-categorie-name">Actualité {props.categorie}</p>
                <p className="article-date-blog">{props.date}</p>
            </div>
            {state.role ? <img className="img-edit-article" src={`${process.env.PUBLIC_URL}/images/img-g/edit-set.svg`}/> : ""}
        </div>
    )
}

export default Article