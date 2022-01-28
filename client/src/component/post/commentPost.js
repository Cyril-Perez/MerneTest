import "./post.css"

const CommentPost = (props)=>{
    return (
        <div className="comment-post">
            {/* <p>{props.posterCommentId}</p> */}
            <div className="container-img-comment-post">
                <img className="img-profil-comment" src={props.posterCommentId.join("")} alt="photo de profil commentaire"/>
                <p>{props.posterPseudo}</p>
            </div>
            
            <p className="txt-comment-post">{props.commentMessage}</p>
            <p>{props.commentDate}</p>
            <>{props.deleteCommentPost}</>
            
        </div>
    )
}

export default CommentPost