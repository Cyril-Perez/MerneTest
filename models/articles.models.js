const mongoose = require("mongoose")

const ArticleShema = new mongoose.Schema(
    {
        posterId : {
            type : String,
            required : true
        },
        title : {
            type : String,
            required : true
        },
        message : {
            type : String,
            trim : true,
            required : true
        },
        picture : {
            type : String,
        },
        categorie : {
            type : String,
            required : true
        },
        likers : {
            type : [String]
        }

    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model("article", ArticleShema)