const PostModel = require("../models/post.model")
const UserModel = require("../models/user.models")
//objectId verifie si notre id dans la requete parmas est bien dans notre base de données
const ObjectID = require("mongoose").Types.ObjectId

module.exports.readPost = (req, res) => { 
  PostModel.find((err, docs) => {
    if (!err){
       return res.send(docs.reverse())
    }     
    else console.log("Récuperation des données échouées " + err);
  }).sort({ createdAte: -1 })
}

module.exports.createPost = async (req, res) => {
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture : req.body.picture,
    video: req.body.video,
    likers: [],
    comments: [],
  })

  try {
    const post = await newPost.save()
    return res.status(201).json(post)
  } catch (err) {
    return res.status(500).send(err)
  }
}

module.exports.updatePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    const doc = await PostModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { message: req.body.message }
      },
      { new: true, upsert: true }
    )
    return res.status(201).json(doc)

  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

module.exports.deletePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.deleteOne({ _id: req.params.id })
    return res.status(200).json({ message: "utlisateur bien supprimer" })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    //action modification like sur le post en question 
    const doc = await PostModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: { likers: req.body.id }
      },
      { new: true, }
    )
    // action sur l'utilisateur qui like un post
    await UserModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        $addToSet: { likes: req.params.id }
      },
      { new: true, }
    )

    return res.status(201).json(doc)

  } catch (err) {
    return res.status(400).send(err)
  }
}

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    //action modification like sur le post en question 
    const doc = await PostModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { likers: req.body.id }
      },
      { new: true, }
    )
    // action sur l'utilisateur qui like un post
    await UserModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        $pull: { likes: req.params.id }
      },
      { new: true, }
    )

    return res.status(201).json(doc)

  } catch (err) {
    return res.status(400).send(err)
  }
}
//commentaire post
module.exports.commentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const doc = await PostModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
    );

    return res.status(200).send(doc)

  } catch (err) {
    return res.status(400).send(err);
  }
}

module.exports.editCommentPost =  (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
       PostModel.findOne({_id : req.params.id}, function(err , docs){
      const document = docs.comments.filter((item)=> item.commenterId === req.body.commentId )    
      if(!document){
        return res.status(404).send("Comment not found");
      }else {
        document[0].text = req.body.text
       
         docs.save().then((data)=>{
          return res.status(200).send(data)
         }).catch((err)=>{return res.status(500).send(err)})

        //  (err)=> {
        //   if (!err) return res.status(200).send(docs);
        //   return res.status(500).send(err);
        // }
      }
    }) 
   
    
    // let index = await allPost.comments.find((item)=>item._id === req.body.commentId )
    // console.log(index);
    // let commentMaj = await PostModel.findOneAndUpdate(
    //   { _id: index._id },
    //   {
    //     $set: { text: req.body.text }
    //   },
    //   { new: true , upsert: true }
    // )


    // return res.status(200).send(commentMaj)
    // return PostModel.findOne({ _id : req.params.id}, function (err, docs){
      
    //   let theComment = docs.comments.filter((comment) =>
    //    comment._id === req.body.commentId
    //   );
    //   console.log(theComment.comments);
    //   if (!theComment) {
    //     return res.status(404).send("Comment not found");
    //   }
    //   theComment.text = req.body.text;

    //   return docs.save((err) => {
    //     if (!err) return res.status(200).send(docs);
    //     return res.status(500).send(err);
    //   });
    // });
  } catch (err) {
    return res.status(400).send({err});
  }
}

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
     PostModel.findOneAndUpdate(
      {_id : req.params.id},
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
}