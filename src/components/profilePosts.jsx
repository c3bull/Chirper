import {useEffect, useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {decodeToken} from "react-jwt";
import {useParams} from "react-router";

/**
 * Component which is creating display of the posts on the user profile.
 * @constructor
 * @param {String} id - user's id.
 * @param {String} author - author.
 * @param {String} content - message content.
 * @param {String} name - user's name.
 * @param {String} surname - user's surname.
 * @param {String} likes - number of likes.
 * @param {String} data - sent date.
 * @param {String} time - sent time.
 * @param {Array} likedBy - array with users who liked the post.
 * @returns {JSX.Element} Returns all posts that were published by specific user.
 */
function ProfilePosts({id, author, content, name, surname, likes, date, time, likedBy}) {

    const [liked, setLiked] = useState(false);
    const [responseLikes, setResponseLikes] = useState(likes);
    const [likedByChanged, setLikedByChanged] = useState(likedBy)
    const nickname = useParams().nickname;

    /**
     * an object that includes information about post, like if the post is liked, id of the post, and nickname of the logged user
     */
    const payload = {
        isLiked: liked,
        postId: id,
        nickname: decodeToken(localStorage.getItem('token')).nickname
    };

    /**
     * function that is setting value of likes on every click
     */
    useEffect(() => {
        setLiked(likedByChanged.includes((decodeToken(localStorage.getItem('token')).nickname)));
    }, [likedByChanged]);

    /**
     * function that is showing a date of post creation
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
     * function that is updating number of likes of the post
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

    let final
    if ({author}.author === nickname) {
        final = <div className="blog-post__display_new">
            <div className="blog_post_avatar_div">
                <div className="blog_post_avatar">
                    {author !== undefined ?
                        <div className="blog_post_avatar">{name.substr(0, 1)}{surname.substr(0, 1)}</div> :
                        <div className="blog_post_avatar"/>}
                </div>

            </div>
            <div className="blog_post_full">
                <div className="blog_post_header">
                    <div className="blog_post_author">{author}&nbsp;</div>
                    <div className="blog_post_nickname">@{author}</div>
                    <div className="blog_post_postTime">&nbsp;·&nbsp;{WhenPosted()}</div>
                </div>
                <div className="blog_post_content">
                    <div>{content}</div>
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
    }

    return (
        <div>
            {final}
        </div>
    )
}

const mapStateToProps = state => ({
    userNickname: state.userNickname
});

export default connect(mapStateToProps)(ProfilePosts);
