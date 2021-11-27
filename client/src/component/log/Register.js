import "./log.css"

const Register = ()=>{
    const handlePostData = async (e)=>{
        e.preventDefault()
        await fetch(`${process.env.REACT_APP_API_REQUEST}api/user/test`,{method: "POST"}).then((res)=>{console.log(res);}).catch(()=>{console.log("echouer");})
    }
    return (
        <form onSubmit={handlePostData}>
            <h3>Inscrivez-vous en renseignant vos informations</h3>
            <label htmlFor="pseudo">Pseudo</label>
            <input type="text" name="pseudo" className="pseudo"/>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="email"/>
            <label htmlFor="password" className="mdp">Mot de passe</label>
            <input type="text" name="password" className="mdp"/>
            <label htmlFor="pseudo">Bio</label>
            <input type="text" name="pseudo" className="bio"/>
            <button>Valider</button>
        </form>
    )
}

export default Register