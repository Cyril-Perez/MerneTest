import "./post.css"

const CommentPost = (props)=>{
    return (
        <div className="comment-post">
            <p>{props.posterCommentId}</p>
            <p>{props.commentMessage}</p>
            <p>{props.commentDate}</p>
        </div>
    )
}

export default CommentPost