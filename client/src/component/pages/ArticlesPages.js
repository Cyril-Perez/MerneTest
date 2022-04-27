import { useState } from "react"
import "./Pages.css"

const ArticlesPages = ()=>{

    const [categorie, setCategorie] = useState("Nouveautés")


        return (
            <section>
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

            </section>
        )
}

export default ArticlesPages