const ArticleModels = require("../models/articles.models")
const UserModel = require("../models/user.models")
const ObjectID = require("mongoose").Types.ObjectId
const multer = require("multer")


module.exports = {

  getArticle: (req, res) => {
    ArticleModels.find((err, docs) => {
      if (!err) {
        return res.send(docs.reverse())
      }
      else console.log("Récuperation des données échouées " + err);
    }).sort({ createdAte: -1 })
  },

  createArticle: async (req, res) => {
    const admin = await UserModel.findOne({ _id: req.params.id })
    if (!admin && !admin.role)
      return res.status(400).send("ID unknown : " + req.params.id);
    let newPost;
    console.log(req.file);
    if (req.file === undefined) {
      newPost = new ArticleModels({
        posterId: req.body.posterId,
        title: req.body.title,
        message: req.body.message,
        categorie: req.body.categorie,
        likers: []
      })
    } else {
      newPost = new ArticleModels({
        posterId: req.body.posterId,
        title: req.body.title,
        message: req.body.message,
        picture: `${process.env.URL_WEB}/images/${req.file.filename}`,
        categorie: req.body.categorie,
        likers: []
      })
    }


    try {
      const post = await newPost.save()
      return res.status(201).json(post)
    } catch (err) {
      return res.status(500).send(err)
    }
  },

  updateArticle: async (req, res) => {
    const admin = await UserModel.findOne({ _id: req.params.id })
    if (!admin && !admin.role)
      return res.status(400).send("ID unknown : " + req.params.id);
    try {
      const doc = await ArticleModels.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            message: req.body.message,
            title: req.body.title
          }
        },
        { new: true, upsert: true }
      )
      return res.status(201).json(doc)

    } catch (err) {
      return res.status(500).json({ message: err })
    }
  },

  deleteArticle: async (req, res) => {
    const admin = await UserModel.findOne({ _id: req.params.id })
    if (!admin && !admin.role)
      return res.status(400).send("ID unknown : " + req.params.id);

    try {
      const pictureUrl = await ArticleModels.findOne({ _id: req.params.id })
      if (pictureUrl.picture) {
        const nameUrl = pictureUrl.picture.split('/images/')[1]
        fs.unlink(`client/public/images/${nameUrl}`, async () => {
          try {
            await ArticleModels.deleteOne({ _id: req.params.id })
            return res.status(200).json({ message: "poste bien supprimer", _id: req.params.id })
          } catch (err) {
            return res.status(400).json({ message: "error delete pictures" })
          }
        })
      } else {
        await ArticleModels.deleteOne({ _id: req.params.id })
        return res.status(200).json({ message: "poste bien supprimer", _id: req.params.id })
      }

    } catch (err) {
      return res.status(500).json({ message: err })
    }
  },

  likeArticle: async () => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    try {
      //action  like sur l'article en question 
      const doc = await ArticleModels.findOneAndUpdate(
        { _id: req.params.id },
        {
          $addToSet: { likers: req.body.id }
        },
        { new: true, }
      )
      return res.status(201).json(doc)

    } catch (err) {
      return res.status(400).send(err)
    }
  },

  unlikeArticle: async () => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    try {
      //action  like sur l'article en question 
      const doc = await ArticleModels.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likers: req.body.id }
        },
        { new: true, }
      )
      return res.status(201).json(doc)

    } catch (err) {
      return res.status(400).send(err)
    }
  },

}