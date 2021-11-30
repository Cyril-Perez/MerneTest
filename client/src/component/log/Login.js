import { useState } from "react"
import { useContext } from "react"
import { AppContext } from "../../AppContext"


const Login = ()=>{

    const context = useContext(AppContext)
    const [data , setData] = useState()
    const [dataErr , setDataErr] = useState("")

    const handleSaveData = (e)=>{
        let infos = {
            ...data,
            [e.target.name] : e.target.value
        }
        setData(infos)
        console.log(data);
    }

    const handleSubmitLogin = async (e)=>{
        e.preventDefault()
        await fetch(`${process.env.REACT_APP_API_REQUEST}api/user/login`,
        {
            method : "POST",
            credentials : "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body : JSON.stringify(data)
        })
        .then((res)=>{ 
           return res.json()
        })
        .then((response)=>{
            if(response.erreur){
               setDataErr(response.erreur) 
            } else{
                context.setuId(response.user)
                window.location = "/"
            } 
        }).catch((err)=>{
            console.log(err.message);
        })      
    }
    // useEffect(()=>{
    //     console.log(test);
    // },[test])
    return (
        <form onSubmit={handleSubmitLogin}>
            <h3>Connectez-vous en renseignant vos informations</h3>
            <label htmlFor="email">Email</label>
            <input onChange={handleSaveData} type="text" name="email" className="email-login"/>
            <label htmlFor="password">Mot de passe</label>
            <input onChange={handleSaveData} type="text" name="password" className="mdp-login"/>
            <label htmlFor="bio">Bio</label>
            <input onChange={handleSaveData} type="text" name="bio" className="bio-login"/>
            {<p>{dataErr}</p>}
            <button>Valider</button>
        </form>
    )
}

export default Login