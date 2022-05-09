import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Article from "../articles/Article"
import { configDate, dateNowConfig } from "../tips/function.utils"
import "./Pages.css"

const ArticlesPages = ()=>{
    
    const allArticles = useSelector(article => article.allArticles)
    const [categorie, setCategorie] = useState("Nouveautés")
    const [load, setLoad] = useState(false)

    const [arrayArticles, setArrayArticles] = useState([])

    const dispatch = useDispatch()

    // chargement on va récuperer les 3 dernier post
    // qui correspond a categorie === nouveautes
    // lors du click sur les button de filtrage on va séléctionner l'id en fonction du thème
    // et on va mettre a jour notre variable d'etat categorie
    // se qui va relancer mon use effect et filtrer mon tableau arrayArticles en fonction de ma categorie 
    // mon useffect sera relancer car ma dépendance a celui-ci est categorie

    //1iere tenta
    // useEffect(()=>{   
    //     if(categorie === "Nouveautés"){
    //         let newArrayNews = [allArticles[0],allArticles[1],allArticles[2]]
    //         console.log(newArrayNews)
    //         setArrayArticles(newArrayNews)     
    //     } else {
    //         let newArray = allArticles.filter((item)=>{ 
    //                    return item.categorie === categorie
    //                 })
    //         setArrayArticles(newArray)
    //     }
        
    // },[categorie,allArticles])

    //2ieme tenta
    useEffect(()=>{
        setArrayArticles(allArticles)
        setLoad(true)
        
    },[allArticles])

        return (
            <section className="Nouveautés">
                <div className="container-image-article">
                    <img className="logo-page-article" src={`${process.env.PUBLIC_URL}/images/img-g/lelephant.png`}/>
                </div>
                <div className="container-categorie">
                    <h1 className="title-categorie">{categorie}</h1>
                </div>
                <div className="separation-categorie-filter"></div>
                <div className="container-categorie-button-filtre">
                    <button>Nouveautés</button>
                    <button>Sport</button>
                    <button>Economie</button>
                    <button>Divertissement</button>
                </div>
                <div className="container-articles-post">
                    {
                      load && allArticles[1] ?  arrayArticles.map((item)=>{
                          console.log(item.createdAt)
                            return <Article
                                    key={item._id}
                                    pics={item.picture}
                                    title={item.title}
                                    message={item.message}
                                    categorie={item.categorie}
                                    date={`Crée le ${configDate(item.createdAt)}`}                                   
                            />
                      })   : "Chargement..."
                    }
                </div>

            </section>
        )
}

export default ArticlesPages