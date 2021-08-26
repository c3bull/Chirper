
function SingleMessage({author, content, time}) {

    let final;
    if ({author}.author === "piec") {

        final = <div className="singleMessageDivMe">
            <div className="singleMessageHeaderMe">
                <div className="singleMessageFullMe">
                    <div className="singleMessageAuthorMe">{author}&nbsp;</div>
                    <div className="singleMessageTimeMe">{time}&nbsp;·&nbsp;</div>
                </div>
                <div>
                    <div className="singleMessageAvatarMe">
                        <img className="singleMessageAvatarImgMe"
                             src="https://pbs.twimg.com/profile_images/502894072508325889/Rs02QhND.jpeg" alt="Avatar"/>
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
                    <div className="singleMessageAuthor">{author}&nbsp;</div>
                    <div className="singleMessageTime">&nbsp;·&nbsp;{time}</div>
                </div>
                <div>
                    <div className="singleMessageAvatar">
                        <img className="singleMessageAvatarImg"
                             src="https://pbs.twimg.com/profile_images/502894072508325889/Rs02QhND.jpeg" alt="Avatar"/>
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

            {/*<div className="singleMessageHeader">*/}
            {/*    <div className="singleMessageFull">*/}
            {/*        <div className="singleMessageAuthor">{author}&nbsp;</div>*/}
            {/*        <div className="singleMessageTime">&nbsp;·&nbsp;{time}</div>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <div className="singleMessageAvatar">*/}
            {/*            <img className="singleMessageAvatarImg"*/}
            {/*                 src="https://pbs.twimg.com/profile_images/502894072508325889/Rs02QhND.jpeg" alt="Avatar"/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="singleMessageContent">*/}
            {/*    <div>{content}</div>*/}
            {/*</div>*/}

        </div>
    )
}

export default SingleMessage;