import "./post.css"

const AllPost = (props)=>{
    return (
        <div className="one-post">
            <p>{props.posterID}</p>
            <p>{props.message}</p> 
            <p>{props.date}</p>       
        </div>
    )
}
export default AllPost