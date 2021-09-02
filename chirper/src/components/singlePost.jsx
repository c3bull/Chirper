import {useEffect, useState} from "react";
import axios from "axios";
import {decodeToken} from "react-jwt";

function SinglePost({id, author, content, likes, date, time, likedBy}) {

    const [liked, setLiked] = useState(false);
    const [responseLikes, setResponseLikes] = useState(likes);
    const [likedByChanged, setLikedByChanged] = useState(likedBy)

    const payload = {
        isLiked: liked,
        postId: id,
        nickname: decodeToken(localStorage.getItem('token')).nickname
    };

    useEffect(() => {
        setLiked(likedByChanged.includes((decodeToken(localStorage.getItem('token')).nickname)));
        console.log('likedby ' + likedByChanged.includes((decodeToken(localStorage.getItem('token')).nickname)));

        // changingHeart()
    });

    const WhenPosted = () => {
        let today = new Date();
        let post = date.substr(6, 9) + '-' + date.substr(3, 2) + '-' + date.substr(0, 2) + 'T' + time + ":00";
        //let post = "'2021/08/31 12:55'";
        let postDate = new Date(post)
        //let post = new Date);
        let diffMs = (today - postDate);
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
                setLikedByChanged(response.data.likedBy)
                // changingHeart();
            })
            .catch(() => {
                console.log('Internal server error');
            });
        // if (liked) {
        //     setLiked(false);
        // } else {
        //     setLiked(true)
        // }

    }

    // const changingHeart = () => {
    //     const image = document.getElementById("imageHeart");
    //     if (liked) {
    //         image.src = "https://icons.iconarchive.com/icons/succodesign/love-is-in-the-web/256/heart-icon.png"
    //         // image.src = "https://emojigraph.org/media/google/white-heart_1f90d.png"
    //     } else {
    //         // image.src = "https://icons.iconarchive.com/icons/succodesign/love-is-in-the-web/256/heart-icon.png"
    //         image.src = "https://emojigraph.org/media/google/white-heart_1f90d.png"
    //     }
    // }

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
                        {liked ? <img onClick={liking} className="blog_post_heart" id="imageHeart"
                                      src="https://icons.iconarchive.com/icons/succodesign/love-is-in-the-web/256/heart-icon.png" alt="Avatar"/> :
                            <img onClick={liking} className="blog_post_heart" id="imageHeart"
                            src="https://emojigraph.org/media/google/white-heart_1f90d.png" alt="Avatar"/>}
                        {/*<img onClick={liking} className="blog_post_heart" id="imageHeart"*/}
                        {/*     src="https://emojigraph.org/media/google/white-heart_1f90d.png" alt="Avatar"/>*/}
                        {responseLikes}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost;