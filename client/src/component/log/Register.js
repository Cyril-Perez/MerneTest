const Register = ()=>{
    return (
        <form>
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