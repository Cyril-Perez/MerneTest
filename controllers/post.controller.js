const PostModel = require("../models/post.model")
const UserModel = require("../models/user.models")
//objectId verifie si notre id dans la requete parmas est bien dans notre base de données
const ObjectID = require("mongoose").Types.ObjectId

module.exports.readPost = (req, res)=>{
    PostModel.find((err,docs)=>{
        if(!err) 
        res.send(docs)
        else console.log("Récuperation des données échouées " + err);
    })
}

module.exports.createPost = async (req, res)=>{
    const newPost = new PostModel({
        posterId : req.body.posterId,
        message : req.body.message,
        video : req.body.video,
        likers : [],
        comments : [],
    })

    try{
        const post = await newPost.save()
        return res.status(201).json(post)
    }catch (err) {
        return res.status(500).send(err)
    }
}

module.exports.updatePost = (req, res)=>{

}

module.exports.deletePost = (req, res)=>{

}