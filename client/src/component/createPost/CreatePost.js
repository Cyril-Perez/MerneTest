import "./createPost.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../action/action.post"

const CreatePost = (props)=>{ 
        const user = useSelector(user => user.fetchReducer)
        const dispatch = useDispatch()
        //create post 
        const [filePost, setFilePost] = useState()
        const [fileErr, setFileErr] = useState("")
        //message post
        const [description , setDescription] = useState("")
       

        const handleSubmitCreatePost = (e) => {
            e.preventDefault()
            if (filePost) {
                const data = new FormData();
                // let fileField = document.querySelector("input[type='file']");
                // console.log(fileField.files[0]);
                data.append("posterId", user._id)
                data.append("message", description)
                data.append("file", filePost)
              
                for (let key of data.entries()) {
                    console.log(key[0] + ', ' + key[1])
                }
                dispatch(createPost(data))
            } else {
                // const dataNotPics = new FormData();
                // dataNotPics.append("posterId", user._id)
                // dataNotPics.append("message", description)

                dispatch(createPost({posterId : user._id, message : description}))

                setFileErr("aucun fichier")
            }
    
        }

        const handleSaveFilePost = (e) => {
            setFilePost(e.target.files[0])
        }

        return (
            <form onSubmit={handleSubmitCreatePost}> 
                <h3>Crée votre post</h3>
                <label>Message</label>
                <textarea onChange={(e)=>{setDescription(e.target.value)}} id="textarea-message-post" maxLength="400" placeholder="entrez votre message" ></textarea>
                <label htmlFor="file-post">Selectionner un fichier</label>
                <input onChange={handleSaveFilePost} type="file" id="file-post" name="file-post" accept=".jpg , .jpeg , .png" />
                <p id="err-file-post">{filePost ? filePost.name : "aucun fichier"}</p>
                <button>Valider</button>
            </form>
        )
    }

export default CreatePost