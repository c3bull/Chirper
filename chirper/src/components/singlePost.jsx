
function SinglePost({author,content,likes}){
    return(
        <div>
            <strong>{author}</strong>
            <p>{content}</p>
            <small>{likes} Lajkuff</small>
            <br/>
        </div>
    )
}
export default SinglePost;