const Login = ()=>{
    return (
        <form>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="email-login"/>
            <label htmlFor="password">Mot de passe</label>
            <input type="text" name="password" className="mdp-login"/>
            <label htmlFor="pseudo">Bio</label>
            <input type="text" name="pseudo" className="bio-login"/>
            <button>Valider</button>
        </form>
    )
}

export default Login