import {background} from "@chakra-ui/react";

function SinglePost({author, content, likes}) {
    return (
        <div className="blog-post__display_new">

            <div className="blog_post_avatar_div">
                <img className="blog_post_avatar"
                     src="https://pbs.twimg.com/profile_images/502894072508325889/Rs02QhND.jpeg" alt="Avatar"/>
            </div>

            <div className="blog_post_full">

                <div className="blog_post_header">
                    <div className="blog_post_author">{author}&nbsp;</div>
                    <div className="blog_post_nickname">@{author}</div>
                    <div className="blog_post_postTime">&nbsp;·&nbsp;5 min</div>
                </div>

                <div className="blog_post_content">
                    <div>{content}</div>
                </div>
                <div className="blog_post_engagement">
                    <div>
                        <img className="blog_post_heart" src="https://emojigraph.org/media/google/white-heart_1f90d.png"/>
                        {likes}
                    </div>


                </div>

            </div>
            {/*<strong>{author}</strong>
            <p>{content}</p>
            <small>{likes} Lajkuff</small>
            <br/>*/}

        </div>
    )
}

export default SinglePost;