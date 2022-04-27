import "./article.css"

const Article = (props)=>{
    return (
        <div>
            <img src={props.pics}/>
            <h1>{props.title}</h1>
            <p>{props.message}</p>
            <button>Lire la suite</button>
            <div></div>
            <p>Actualité {props.categorie}</p>
            <p>{props.date}</p>
        </div>
    )
}

export default Article