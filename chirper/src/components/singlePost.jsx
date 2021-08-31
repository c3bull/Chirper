import {useState} from "react";
import axios from "axios";

function SinglePost({id, author, content, likes,date,time}) {

    const [liked, setLiked] = useState(false);
    const [responseLikes, setResponseLikes] = useState(likes);

    const payload = {
        isLiked: liked,
        postId: id
    };

    const WhenPosted = () => {
        let today = new Date();
        let post = date.substr(6,9)+'-'+date.substr(3,2)+'-'+date.substr(0,2) +'T'+time+":00";
        //let post = "'2021/08/31 12:55'";
        let postDate = new Date(post)
        //console.log(content + ' today ' + today)
       //console.log(content + ' post ' + post)
        //console.log(content + ' postDate ' + postDate)
        //let post = new Date);
        let diffMs = (today-postDate);
        //console.log(content + " diffMs " + diffMs)
        //console.log(content + 'liczba minut ' + Math.round(((diffMs % 86400000) % 3600000) / 60000))
        let result = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        return result;
    };

    const liking = () => {
        axios({
            url: 'http://localhost:3001/api/feed/update',
            method: 'POST',
            data: payload
        })
            .then((response) => {
                setResponseLikes(response.data.likes)
                console.log('res likes ' + response.data.likes)
            })
            .catch(() => {
                console.log('Internal server error');
            });
        if (liked) {
            setLiked(false);
        } else {
            setLiked(true)
        }

    }

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
                    {/*<div className="blog_post_postTime">&nbsp;·&nbsp;5 min</div>*/}
                    <div className="blog_post_postTime">&nbsp;·&nbsp;{WhenPosted()} min</div>
                </div>

                <div className="blog_post_content">
                    <div>{content}</div>
                </div>
                <div className="blog_post_engagement">
                    <div>
                        <img onClick={liking} className="blog_post_heart"
                             src="https://emojigraph.org/media/google/white-heart_1f90d.png" alt="Avatar"/>
                        {responseLikes}
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