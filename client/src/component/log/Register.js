import { useState } from "react"
import "./log.css"

const Register = ()=>{

    const [dataRegister, setDataRegister] = useState()
    const [afterSubmit, setAfterSubmit] = useState("Remplissez les champs obligatoires")

    let errorPseudo = document.querySelector(".error-pseudo")
    let errorEmail = document.querySelector(".error-email")
    let errorPassword = document.querySelector(".error-password")
    
    const handleSaveDataRegister = (e)=>{
        setAfterSubmit("Remplissez les champs obligatoires")
        let infos = {
            ...dataRegister,
            [e.target.name] : e.target.value
        }
        setDataRegister(infos)
        console.log(dataRegister);
    }

    const handlePostDataSubmit = async (e)=>{
        e.preventDefault()
        console.log(dataRegister);
        await fetch(`${process.env.REACT_APP_API_REQUEST}api/user/register`,{
            method: "POST",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(dataRegister) 
    })
    .then((res)=>{
        return res.json()
    }).then((response)=>{ 
        if(response.errors){
            console.log(response.errors);
            errorPseudo.innerHTML = response.errors.pseudo
            errorEmail.innerHTML = response.errors.email
            errorPassword.innerHTML = response.errors.password
        } else {     
            errorPseudo.innerHTML = ""
            errorEmail.innerHTML = ""
            errorPassword.innerHTML = ""
            setAfterSubmit("Profil bien enregister, veuillez-vous connectez")
        }
    }).catch(()=>{})
    }
    return (
        <form onSubmit={handlePostDataSubmit}>
            <h3>Inscrivez-vous en renseignant vos informations</h3>
            <label  htmlFor="pseudo">Pseudo</label>
            <input onChange={handleSaveDataRegister} type="text" name="pseudo" className="pseudo"/>
            <p className="error-pseudo"></p>
            <label htmlFor="email">Email</label>
            <input onChange={handleSaveDataRegister} type="text" name="email" className="email"/>
            <p className="error-email"></p>
            <label htmlFor="password" className="mdp">Mot de passe</label>
            <input onChange={handleSaveDataRegister} type="text" name="password" className="mdp"/>
            <p className="error-password"></p>
            <label htmlFor="bio">Bio</label>
            <input onChange={handleSaveDataRegister} type="text" name="bio" className="bio"/>
            <p id={afterSubmit === "Profil bien enregister, veuillez-vous connectez" ? "after-submit" : "before-submit"}>{afterSubmit}</p>
            <button>Valider</button>
        </form>
    )
}

export default Register