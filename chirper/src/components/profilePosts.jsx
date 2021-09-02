import {useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {decodeToken} from "react-jwt";

function ProfilePosts({id, author, content, likes}) {

    const [liked, setLiked] = useState(false);
    const [responseLikes, setResponseLikes] = useState(likes);

    const payload = {
        isLiked: liked,
        postId: id
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



    let final;

    if ({author}.author === decodeToken(localStorage.getItem('token')).nickname){
        final = <div className="blog-post__display_new">

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
                        <img onClick={liking} className="blog_post_heart"
                             src="https://emojigraph.org/media/google/white-heart_1f90d.png" alt="Avatar"/>
                        {responseLikes}
                    </div>
                </div>
            </div>
        </div>
    }
    return (
        // <div className="blog-post__display_new">
        //
        //     <div className="blog_post_avatar_div">
        //         <img className="blog_post_avatar"
        //              src="https://pbs.twimg.com/profile_images/502894072508325889/Rs02QhND.jpeg" alt="Avatar"/>
        //     </div>
        //
        //     <div className="blog_post_full">
        //
        //         <div className="blog_post_header">
        //             <div className="blog_post_author">{author}&nbsp;</div>
        //             <div className="blog_post_nickname">@{author}</div>
        //             <div className="blog_post_postTime">&nbsp;·&nbsp;5 min</div>
        //         </div>
        //
        //         <div className="blog_post_content">
        //             <div>{content}</div>
        //         </div>
        //         <div className="blog_post_engagement">
        //             <div>
        //                 <img onClick={liking} className="blog_post_heart"
        //                      src="https://emojigraph.org/media/google/white-heart_1f90d.png" alt="Avatar"/>
        //                 {responseLikes}
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div>
            {final}
        </div>
    )
}

const mapStateToProps = state => ({
    userNickname: state.userNickname
});

export default connect(mapStateToProps)(ProfilePosts);