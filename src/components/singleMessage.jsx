import {decodeToken} from "react-jwt";

/**
 * Functional component with single message on chat.
 * @constructor
 * @param {String} author - author.
 * @param {String} content - message content.
 * @param {String} time - sent time.
 * @returns {JSX.Element} Stylized single message in a div
 */
function SingleMessage({author, content, time}) {

    let final;
    if ({author}.author === decodeToken(localStorage.getItem('token')).nickname) {
        final = <div className="singleMessageDivMe">
                    <div className="singleMessageHeaderMe">
                        <div className="singleMessageFullMe">
                            <div className="singleMessageAuthorMe">{author}&nbsp;</div>
                            <div className="singleMessageTimeMe">{time}&nbsp;·&nbsp;</div>
                        </div>
                        <div>
                            <div className="singleMessageAvatarMe">
                                {author !== undefined ? <div className="blog_post_avatar">{author.substr(0,1)}{author.substr(0,1)}</div>:<div className="blog_post_avatar"/>}
                            </div>
                        </div>
                    </div>
                    <div className="singleMessageContentMe">
                        <div>{content}</div>
                    </div>
                </div>
    } else {
        final = <div className="singleMessageDiv">
                    <div className="singleMessageHeader">
                        <div className="singleMessageFull">
                            <div className="singleMessageAuthor">&nbsp;{author}&nbsp;</div>
                            <div className="singleMessageTime">&nbsp;·&nbsp;{time}</div>
                        </div>
                        <div>
                            <div className="singleMessageAvatar">
                                {author !== undefined ? <div className="blog_post_avatar">{author.substr(0,1)}{author.substr(0,1)}</div>:<div className="blog_post_avatar"/>}
                            </div>
                        </div>
                    </div>
                    <div className="singleMessageContent">
                        <div>{content}</div>
                    </div>
                </div>
    }

    return (
        <div className="singleMessageDiv">
            {final}
        </div>
    )
}

export default SingleMessage;
