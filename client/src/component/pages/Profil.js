import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { uploadPics, uploadSetPics, majBio } from "../action/action.users"
import { configDate } from "../tips/function.utils"
import "./Pages.css"
const Profil = () => {
    const params = useParams()
    const state = useSelector(state => state.fetchReducer)
    const allUsers = useSelector(users => users.AllUsers)
    const [verifFollow, setVerifFollow] = useState(null)
    // const [filterState, setFilterState] = useState([{_id : "test", picture : "./test" , pseudo : "idee"}])
    // const [validFilter , setValidFilter] = useState(false)
    // if(filterState){
    //     setValidFilter(true)
    // }
    

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
            if (state._id === "http://localhost:3000/images/randomUser.png") {
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

    const handleClickFollow = (e)=>{
        if(e.target.id === "followers-views"){
            setVerifFollow(false)
        }else if (e.target.id === "followings-views"){
            setVerifFollow(true)
        }
        console.log(verifFollow)
    }

    return (
        <>
            <header className="profil-header">
                {
                    params.id === "null" ? <Link style={{ textDecoration: "none", color: "black" }} to="/"><h1>Veuillez-vous connectez</h1></Link>
                        :
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
                                <form action="" onSubmit={handleChangePics}>
                                    <label htmlFor="file" className="change-pics">Changer l'image</label>
                                    <input onChange={handleSaveFile} type="file" id="file" name="file" accept=".jpg , .jpeg , .png" />
                                    <p id="error-file">{file ? file.name : "Selectionner un fichier" + sendfile}</p>
                                    <button>Valider</button>
                                </form>
                            </div>
                        </>
                }
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

            </header>
            <section>
                <div className="content-bio">
                    <h2>Bio</h2>
                    <textarea id={verifiyBio ? "textarea-bio" : ""} onChange={handleSaveDataBio} spellcheck="false" type="text" maxLength="400" defaultValue={state.bio}></textarea>
                    <p className="valid-bio">{sendBio}</p>
                    {verifiyBio ? <button onClick={handleClickSetBio} className="send-button-bio">Valider les changements</button>
                        : <button onClick={() => { setVerifyBio(true) }} className="send-button-bio">Modifier la bio</button>}
                </div>
            </section>
        </>
    )
}

export default Profil