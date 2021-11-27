const mongoose =  require("mongoose");

let uri = `mongodb+srv://${process.env.USER_BDD}:${process.env.DB_MDP_BDD}${process.env.DB_SERVER}/${process.env.DB_NAME}`
mongoose.connect(uri
    ,
   {
    useNewUrlParser: true,
   }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

