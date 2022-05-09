import "./article.css"

const Article = (props)=>{
    return (
        <div className="one-article">
            <img className="img-article" src={props.pics} alt="image article"/>
            <h1 className="title-article">{props.title}</h1>
            <p className="txt-article">{props.message}</p>
            <button>Lire la suite</button>
            <div className="separation-date-article"></div>
            <p>Actualité {props.categorie}</p>
            <p>{props.date}</p>
        </div>
    )
}

export default Article