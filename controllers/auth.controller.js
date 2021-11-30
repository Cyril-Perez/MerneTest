const UserModel = require("../models/user.models")
const jwt = require("jsonwebtoken")
const verifAuth = require("../tools/compare")
// const manageErr = require("../manageErr/errors.utils")
const { signUpErrors, signInErrors } = require("../manageErr/errors.utils");

const maxAge = 3*24*60*60*1000
const createToken = (id)=>{
        return jwt.sign({id : id}, process.env.TOKEN_SECRET, {
            expiresIn : maxAge
        })
}

module.exports = {
    signUp : async (req , res)=>{

        const {pseudo,email,password,bio} = req.body
        try{
            const user = await UserModel.create({pseudo , email , password , bio})
            //creation utlisateur renvoie de l'id
            res.status(201).json({ user : user._id})
        }catch(err){
            const errors = signUpErrors(err)
            res.status(500).send({errors})
            // res.status(500).send(err)
        }
    },

    signIn : async (req,res)=>{
        const {email , password} = req.body
        try{
            const user = await UserModel.findOne({email})
            const verif = await verifAuth.compare(password, user.password)
            if(!verif){
                return res.status(400).json({message : "authentification incorrect"})
            }           
            const token = createToken(user._id)
            res.cookie("jwt", token , {httpOnly : true ,  maxAge })
            res.status(201).json({user: user._id})
        } catch (err) {
            const errors = signInErrors(err)
            res.status(500).send(errors)
        }
    },

    logout : (req , res)=>{
         res.cookie("jwt", "" , {maxAge : 1})
         res.redirect("/")
    },

    test : (req,res)=>{
        res.cookie("jwt", "test de cookie", {httpOnly: true , maxAge} )
    }
}