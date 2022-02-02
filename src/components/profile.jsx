import React from 'react';
import {connect} from "react-redux";
import axios from "axios";
import ProfilePosts from "./profilePosts";
import {decodeToken} from "react-jwt";
import {useParams, withRouter} from "react-router";
import {background} from "@chakra-ui/react";
import trashIcon from "../images/trash.png";
import editIcon from "../images/editprof.png";

/**
 * Class which includes all posts, user data and bio of specific user.
 * @returns {JSX.Element} Returns background image, profile photo, all posts, user data and bio of specific user.
 */
class Profile extends React.Component {

    state = {
        id: '',
        likes: 0,
        posts: [],
        firstName: '',
        lastName: '',
        nicknameDetails: '',
        backgroundImage: '',
        bio: '',
        showBio: false,
    };

    /**
     * function that calls functions getBlogPost, findUser and setting state of background image immediately after the component is mounted
     */
    componentDidMount = () => {
        this.getBlogPost();
        this.findUser();
        this.setState({backgroundImage: 'https://picsum.photos/800'});
    };

    /**
     * function that is fetching posts from the database using axios
     */
    getBlogPost = () => {
        axios.get('http://localhost:3001/api/feed/posts')
            .then((response) => {
                const data = response.data;
                this.setState({posts: data});
                console.log('Data has been received!');
            })
            .catch(() => {
                alert('Error retrieving data!');
            });
    }

    /**
     * function that is setting data for specific user using axios
     */
    findUser = () => {
        const payload = {
            author: this.props.match.params.nickname,
        };

        axios({
            url: 'http://localhost:3001/api/user/find',
            method: 'POST',
            data: payload
        })
            .then((response) => {
                this.setState({firstName: response.data[0].name});
                this.setState({lastName: response.data[0].surname});
                this.setState({nicknameDetails: response.data[0].nickname});
                this.setState({id: response.data[0]._id});
                this.setState({bio: response.data[0].bio});
                // setResponseLikes(response.data.likes)
                // setLikedByChanged(response.data.likedBy)
            })
            .catch((e) => {
                console.log('Internal server error' + e);
            });
    }

    /**
     * function that is displaying all posts from database
     * @param posts array of posts that are going to be displayed
     * @returns {JSX.Element} Returns all posts by creating display of every single post on the profile by passing id, author, content, likes, date, time and liked by to component called ProfilePosts
     */
    displayBlogPost = (posts) => {

        if (!posts.length) return null;

        return posts.slice(0).reverse().map((post, index) => (
            <ProfilePosts
                id={post._id}
                author={post.author}
                name={post.name}
                surname={post.surname}
                content={post.content}
                likes={post.likes}
                date={post.date}
                time={post.time}
                likedBy={post.likedBy}
            />
        ));
    };

    /**
     * function that is setting profile description for specific user using axios
     */
    editBio = () => {
        axios({
            url: 'http://localhost:3001/api/user/editbio',
            method: 'put',
            data: {
                bio: this.state.bio,
                userId: this.state.id
            }
        })
            .then((response) => {
                this.setState({showBio: !this.state.showBio})
            })
            .catch((e) => {
                console.log('Internal server error' + e);
            });
    }

    render() {
        return (
            <div id="profileDiv">
                <div id="backgroundPhotoProfile">
                    <img className="backgroundPhotoProfileImg"
                         src={this.state.backgroundImage} alt="Avatar"/>
                </div>
                <div id="photoProfile">
                    <div
                        className="photoProfileImg">{this.state.firstName.substr(0, 1)}{this.state.lastName.substr(0, 1)}</div>
                </div>
                <div id="aboutMeProfile">
                    <div
                        id="profileName">{this.state.firstName} {this.state.lastName}</div>
                    <div id="profileNickname">@{this.state.nicknameDetails}</div>
                    <div id="profileDescription">{this.state.bio}{this.state.showBio &&
                    <textarea className="showBioEdit" onChange={e => this.setState({bio: e.target.value})}>{this.state.bio}</textarea>}
                        {this.state.showBio && <div className="editBioBtn" onClick={ () => {this.editBio()}}>Zapisz</div>}
                    </div>

                    {decodeToken(localStorage.getItem('token')).nickname === this.state.nicknameDetails ?
                        <img className="bio_edit" src={editIcon} onClick={() => {
                            this.setState({showBio: !this.state.showBio});
                        }} alt="Avatar"/> : false}
                </div>
                <div id="myPostsProfile">
                    <div className="blog-">
                        {this.displayBlogPost(this.state.posts)}
                    </div>
                </div>
            </div>
        )

    }
}

const mapStateToProps = state => ({
    userNickname: state.userNickname
});

export default withRouter(connect(mapStateToProps)(Profile));
