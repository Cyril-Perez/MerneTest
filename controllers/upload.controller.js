const UserModel = require("../models/user.models")
const ObjectID = require("mongoose").Types.ObjectId
const fs = require("fs")
// const { uploadErrors } = require("../manageErr/errors.utils")
const multer = require("multer")
const config = require("../middleware/multer-config.middleware")
// const upload = multer().single("avatar")

module.exports.uploadProfilAdd = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        if(req.file === undefined){
            throw Error("invalid file")
        }
        const doc = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                //pour avoir une url pour mon front (src)
                $set: { picture: `${process.env.URL_WEB}/images/${req.file.filename}` }
            },
            { new: true }
        )
        return res.status(201).json(doc)

    } catch (err) {
        return res.status(500).json({message : err.message})
    }
}

module.exports.uploadProfilPut = async (req, res) => {
    console.log(req.file);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {  
        if(req.file === undefined){
                    throw Error("invalid file")
                }     
        //extraction du nom de mon fichier pour une suppression
        const pictureUrl = await UserModel.findOne({ _id: req.params.id })
        const nameUrl = pictureUrl.picture.split('/images/')[1]
        fs.unlink(`client/public/images/${nameUrl}`, async () => {
            try {
                
                const doc = await UserModel.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        //pour avoir une url pour mon front (src)
                        $set: { picture: `${process.env.URL_WEB}/images/${req.file.filename}` }
                    },
                    { new: true }
                )
                return res.status(200).json(doc)
            } catch (err) {
                return res.status(400).json({message : "error save pictures"})
            }
        })

    } catch (err) {
        return res.status(500).json({message : err.message})
    }
}
module.exports.uploadProfilDelete = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        //extraction du nom de mon fichier pour une suppression
        const pictureUrl = await UserModel.findOne({ _id: req.params.id })
        const nameUrl = pictureUrl.picture.split('/images/')[1]
        fs.unlink(`images/${nameUrl}`, async () => {
            try {
                const doc = await UserModel.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        //pour avoir une url pour mon front (src)
                        $set: { picture: `${process.env.URL_WEB}/images/randomUser.png` }
                    },
                    { new: true }
                )
                return res.status(200).send(doc)
            } catch (err) {
                return res.status(400).json({ message: err })
            }
        })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}