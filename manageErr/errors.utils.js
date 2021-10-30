// module.exports = {
//     signUpErrors : (err)=>{
//         let erreur = {pseudo : "", email : "", password : "mauvais password"}
//         if(err.message.includes("pseudo")){
//             erreur.pseudo = "Pseudo incorrect ou déjà pris"
//         }
//         if(err.message.includes("email")){
//             erreur.email = "Email incorrect"
//         }
//         if(err.message.includes("password")){
//             erreur.password = "Le mot de passe doit faire 6 caractères minimum"
//         }

//         if(err.code === 11000 && Object.keys(err.keyValue[0]).includes("pseudo")){
//             erreur.pseudo = "Cet pseudo est déjà pris"
//         }
//         if(err.code === 11000 && Object.keys(err.keyValue[0]).includes("email")){
//             erreur.email = "Cet email est déjà enregisté"
//         }

//         return erreur
//     },

//     signInErrors : ()=>{
//         let erreur = { email : "", password : ""}
//         if(err.message.includes("email")){
//             erreur.email = "Email inconnu"
//         }
//         if(err.message.includes("password")){
//             erreur.email = "Le mot de passe ne correspond pas"
//         }
//         return erreur
//     }
// }
module.exports.signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "" };
  
    if (err.message.includes("pseudo")){
      errors.pseudo = "Pseudo incorrect ou déjà pris";
    }
    if (err.message.includes("email")) {
        errors.email = "Email incorrect";
    }
  
    if (err.message.includes("password")){
      errors.password = "Le mot de passe doit faire 6 caractères minimum";
    }
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo")){
      errors.pseudo = "Ce pseudo est déjà pris";
    }
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email")){
      errors.email = "Cet email est déjà enregistré";
    }
    return errors;
  };
  
  module.exports.signInErrors = (err) => {
    let errors = { email: '', password: ''}
  
    if (err.message.includes("email")) {
      errors.email = "Email inconnu";
    }
    if (err.message.includes('password')){
      errors.password = "Le mot de passe ne correspond pas"
    }
    return errors;
  }