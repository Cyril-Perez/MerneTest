//declaration de mon router methode express
const router = require("express").Router()
const authControllers = require("../controllers/auth.controller")
const userControllers = require("../controllers/user.controller")
const uploadController = require("../controllers/upload.controller")
const multer = require("../middleware/multer-config.middleware")
//authentification
router.post("/register", authControllers.signUp )
router.post("/login" , authControllers.signIn)
router.get("/logout" , authControllers.logout)

//user
router.get("/", userControllers.getAllUsers)
router.get("/:id", userControllers.userInfo)
router.put("/:id", userControllers.updateUser)
router.delete("/:id", userControllers.deleteUser)
router.patch("/follow/:id", userControllers.follow)
router.patch("/unfollow/:id", userControllers.unfollow)

//upload 
router.put("/upload/add/:id",multer,uploadController.uploadProfilAdd)
router.put("/upload/put/:id",multer,uploadController.uploadProfilPut)
router.put("/upload/delete/:id",multer,uploadController.uploadProfilDelete)






module.exports = router