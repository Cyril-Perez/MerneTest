const router = require("express").Router()
const multer = require("../middleware/multer-config.middleware")
const articlesController = require("../controllers/articles.controller")

router.get("/", articlesController.getArticle)
router.post("/create/:id", multer, articlesController.createArticle)
router.put("/update/:id", articlesController.updateArticle)
router.delete("/delete/:id", articlesController.updateArticle)
router.patch("/like/:id",articlesController.likeArticle)
router.patch("/unlike/:id",articlesController.unlikeArticle)




module.exports = router;