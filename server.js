const express = require("express")
require("dotenv").config({ path: "./config/.env" })
require("./config/db.js")
const app = express();
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const userRoutes = require("./routes/user.routes")
const postRoutes = require("./routes/post.routes")
const authMidlewares = require("./middleware/auth.middleware")


//middlewares
app.use(helmet());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        optionSuccessStatus: 204,
    })
)
// const corsOptions = {
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//     'allowedHeaders': ['sessionId', 'Content-Type'],
//     'exposedHeaders': ['sessionId'],
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'preflightContinue': false
//   }
//   app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //analyse de corp (rempalcement body-parser)
app.use(express.json()); //analyse de corp (rempalcement body-parser)


//check jwt connexion
app.get("*", authMidlewares.checkUser)

app.get("/jwtid", authMidlewares.requireAuth , (req,res)=>{
        res.status(200).send(res.locals.user._id)
})





app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//rendu de dossier static , dirname chemin actuel + dossier image
app.use("/images" ,express.static(path.join(__dirname, "images")));




//routes
app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)



app.listen(process.env.PORT, () => {
    console.log(`Port ${process.env.PORT} connecté`);
})


module.exports = app