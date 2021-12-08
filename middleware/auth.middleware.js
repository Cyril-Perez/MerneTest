
const UserModel = require("../models/user.models")
const jwt = require("jsonwebtoken")


module.exports = {
    checkUser: (req, res, next) => {
        const token = req.cookies.jwt;
        // console.log("require auth log req.cookie require auth  :  ",req.cookies);
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
                
                if (err) {
                    res.locals.user = null;
                    //res.locals.user etablie une variable  local 
                    // qui sera diponible de temp de requete et de la reponse
                    res.cookie("jwt", "", { maxAge: 1 });
                    next();
                } else {
                    let user = await UserModel.findById(decodedToken.id).select("-password");
                    // console.log(user);
                    res.locals.user = user;
                    console.log(res.locals);
                    next();
                }
            });
        } else {
            res.locals.user = null;
            next();
        }
    },
    requireAuth: (req, res, next) => {
        const token = req.cookies.jwt;
        // console.log("require auth log req.cookie require auth  :  " ,req.cookie);
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
                if (err) {
                    console.log(err);
                    res.send(200).json('no token')
                } else {
                    console.log(decodedToken.id);
                    next();
                }
            });
        } else {
            console.log('No token');
        }
    }
}