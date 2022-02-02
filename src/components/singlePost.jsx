import {useEffect, useState} from "react";
import axios from "axios";
import {decodeToken} from "react-jwt";
import {Link} from "react-router-dom";
import trashIcon from "../images/trash.png"

/**
 * Functional component with single post on homepage.
 * @constructor
 * @param {String} id - user's id.
 * @param {String} author - author.
 * @param {String} name - user's name.
 * @param {String} surname - user's surname.
 * @param {String} content - message content.
 * @param {String} likes - number of likes.
 * @param {String} data - sent date.
 * @param {String} time - sent time.
 * @param {Array} likedBy - array with users who liked the post.
 * @returns {JSX.Element} Stylized single post in a div
 */
function SinglePost({id, author, name, surname, content, likes, date, time, likedBy}) {

    const [liked, setLiked] = useState(false);
    const [responseLikes, setResponseLikes] = useState(likes);
    const [likedByChanged, setLikedByChanged] = useState(likedBy)

    const payload = {
        isLiked: liked,
        postId: id,
        nickname: decodeToken(localStorage.getItem('token')).nickname
    };

    /**
     * Allows you to perform side effects in your components.
     */
    useEffect(() => {
        setLiked(likedByChanged.includes((decodeToken(localStorage.getItem('token')).nickname)));
    }, [likedByChanged]);

    /**
     * Calculates how much time has passed since sending the post.
     * @returns {String} time in minutes, hours, days or weeks
     */
    const WhenPosted = () => {
        let today = new Date();
        let post = date.substr(6, 9) + '-' + date.substr(3, 2) + '-' + date.substr(0, 2) + 'T' + time + ":00";
        let postDate = new Date(post)
        let diff = Math.abs(today - postDate);
        let minutes = Math.floor(diff / 60000);
        let hours = minutes / 60;
        let days = hours / 24;
        let weeks = days / 7;

        if (minutes < 60) {
            return Math.round(minutes) + "min";
        } else if ((hours) < 24) {
            return Math.round(hours) + "h"
        } else if (days < 7) {
            return Math.round(days) + " day(s)"
        } else {
            return Math.round(weeks) + " week(s)"
        }
    };

    /**
     * Uses Axios' DELETE method to Delete the specific post
     * If response successful, reload page
     */
    const deletePost = () => {
        axios({
            url: `http://localhost:3001/api/feed/deletepost/${id}`,
            method: 'DELETE',
            data: {
                id: id,
            }
        })
            .then((response) => {
                window.location.reload(false);
            })
            .catch((e) => {
                console.log('Internal server error');
            });
    }
    /**
     * Uses Axios' POST method to like a post
     * If response successful, set response data
     */
    const liking = () => {
        axios({
            url: 'http://localhost:3001/api/feed/update',
            method: 'POST',
            data: payload
        })
            .then((response) => {
                setResponseLikes(response.data.likes)
                setLikedByChanged(response.data.likedBy)
            })
            .catch(() => {
                console.log('Internal server error');
            });
    }

    return (
        <div className="blog-post__display_new">

            <div className="blog_post_avatar_div">
                {name !== undefined ?
                    <div className="blog_post_avatar">{name.substr(0, 1)}{surname.substr(0, 1)}</div> :
                    <div className="blog_post_avatar"/>}
            </div>

            <div className="blog_post_full">

                <div className="blog_post_header">
                    <Link to={`/profile/${author}`}>
                        <div className="blog_post_author">{name}&nbsp;{surname}&nbsp;</div>
                    </Link>
                    <div className="blog_post_nickname">@{author}</div>
                    <div className="blog_post_postTime">&nbsp;·&nbsp;{WhenPosted()}</div>
                    {decodeToken(localStorage.getItem('token')).nickname === author ?
                        <img className="blog_post_delete" src={trashIcon} onClick={() => {
                            deletePost()
                        }} alt="Avatar"/> : false}
                </div>

                <div className="blog_post_content">
                    {content}
                </div>
                <div className="blog_post_engagement">
                    <div>
                        {liked ? <img onClick={liking} className="blog_post_heart" id="imageHeart"
                                      src="https://icons.iconarchive.com/icons/succodesign/love-is-in-the-web/256/heart-icon.png"
                                      alt="Avatar"/> :
                            <img onClick={liking} className="blog_post_heart" id="imageHeart"
                                 src="https://emojigraph.org/media/google/white-heart_1f90d.png" alt="Avatar"/>}
                        {responseLikes}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost;
