const multer= require("multer")

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

//config de multer (diskStorage enregistrement sur le disk)
const storage = multer.diskStorage({
    //destination dossier
    destination : (req, file, callback)=>{
        console.log(file);
        if (
            file.mimetype != "image/jpg" &&
            file.mimetype != "image/png" &&
            file.mimetype != "image/jpeg"
            ){
                throw Error("invalid file");
            }else if (file.size > 5){
                throw Error("max size");
            }
        callback(null, "images")
    },
    //nom du fichier
    filename : (req, file, callback)=>{
        //suppression des espace par defaut + jointures ajoutées
        const name = file.originalname.split(" ").join("_")
        //extension que l'on souhaite obtenir
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

module.exports = multer({storage: storage}).single('file');