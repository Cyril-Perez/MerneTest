const UserModel = require("../models/user.models");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports = {

  //UTILISATEUR 

  getAllUsers: async (req, res) => {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users)
  },

  userInfo: async (req, res) => {
    try {
      const data = await UserModel.findOne({ _id: req.params.id }).select("-password")
      return res.status(200).send(data)
    } catch {
      return res.status(400).send("ID inconnu : " + req.params.id)
    }
  },

  updateUser: async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
    console.log(req.body);
    try {
      const update = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            bio: req.body.bio,
          }
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      ).select("-password")
      return res.status(200).send(update)

    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },

  follow: async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
      return res.status(400).send("ID unknown : " + req.params.id);

    try {
      //action utlisateur follow un autre
      const doc = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $addToSet: { following: req.body.idToFollow }
        },
        { new: true, upsert: true }
      ).select("-password")
      // action sur l'utilisateur qui a été follow
      await UserModel.findOneAndUpdate(
        { _id: req.body.idToFollow },
        {
          $addToSet: { followers: req.params.id }
        },
        { new: true, upsert: true }
      )

      return res.status(201).json(doc)

    } catch (err) {
      return res.status(500).json({ message: err })
    }
  },

  unfollow: async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow))
      return res.status(400).send("ID unknown : " + req.params.id);

    try {
      //action utlisateur follow un autre
      const doc = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { following: req.body.idToUnFollow }
        },
        { new: true, upsert: true }
      )
      // action sur l'utilisateur qui a été Unfollow
      await UserModel.findOneAndUpdate(
        { _id: req.body.idToUnFollow },
        {
          $pull: { followers : req.params.id }
        },
        { new: true, upsert: true }
      )

      return res.status(200).json(doc)

    } catch (err) {
      return res.status(500).json({ message: err })
    }
  },

  //ADMINISTRATEUR ET SOUS ADMIN

  //admin et sous admin
  deleteUser: async (req, res) => {
    const admin = await UserModel.findOne({ _id: req.params.id })
    if (!admin && !admin.role)
      return res.status(400).send("Non autorisé");
    try {
      await UserModel.deleteOne({ _id: req.params.id })
      return res.status(200).json({ message: "utlisateur bien supprimer" })
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  },

  //admin seulement
  createUserAdmin : async (req, res)=>{
    const {pseudo,email,password,role} = req.body
    const admin = await UserModel.findOne({ _id: req.params.id })
    if (!admin && admin.role === "admin")
      return res.status(400).send("Non autorisé");
    try{
        const user = await UserModel.create({pseudo , email , password , role})
        //creation utlisateur renvoie de l'id
        res.status(201).json({ user : user._id})
    }catch(err){
        const errors = signUpErrors(err)
        res.status(500).send({errors})
        // res.status(500).send(err)
    }
  },

  //admin seulement
  deleteUserAdmin: async (req, res) => {
    const admin = await UserModel.findOne({ _id: req.params.id })
    if (!admin && admin.role === "admin")
      return res.status(400).send("Non autorisé");
    try {
      await UserModel.deleteOne({ _id: req.params.id })
      return res.status(200).json({ message: "utlisateur bien supprimer" })
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  },

}