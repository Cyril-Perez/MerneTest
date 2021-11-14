const multer= require("multer")

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

//config de multer
const storage = multer.diskStorage({
    //destination dossier
    destination : (req, file, callback)=>{
        callback(null, "images")
    },
    //nom du fichier
    filename : (req, file, callback)=>{
        //suppression des espace par defaut + jointures ajoutées
        const name = file.originalname.split(" ").join("_")
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

module.exports = multer({storage: storage}).single('image');