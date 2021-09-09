import React from 'react';
import {connect} from "react-redux";
import igor from '../images/igor.jpg';
import igor2 from '../images/igor2.jpg';
import axios from "axios";
import ProfilePosts from "./profilePosts";
import {decodeToken} from "react-jwt";

class Profile extends React.Component {

    state = {
        likes: 0,
        posts: [],
    };

    componentDidMount = () => {
        this.getBlogPost();
    };

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

    handleChange = ({target}) => {
        const {name, value} = target;
        this.setState({[name]: value});
    };

    displayBlogPost = (posts) => {

        if (!posts.length) return null;

        return posts.slice(0).reverse().map((post, index) => (
            <ProfilePosts
                id={post._id}
                author={post.author}
                content={post.content}
                likes={post.likes}
                date={post.date}
                time={post.time}
                likedBy={post.likedBy}
            />
        ));
    };

    render() {

        return (
            <div id="profileDiv">
                <div id="backgroundPhotoProfile">
                    <img className="backgroundPhotoProfileImg"
                         src={igor2} alt="Avatar"/>
                </div>
                <div id="photoProfile">
                    <img className="photoProfileImg"
                         src={igor} alt="Avatar"/>
                </div>
                <div id="aboutMeProfile">
                    <div id="profileName">{decodeToken(localStorage.getItem('token')).name} {decodeToken(localStorage.getItem('token')).surname}</div>
                    <div id="profileNickname">@{decodeToken(localStorage.getItem('token')).nickname}</div>
                    <div id="profileDescription">To jest opis profilu.</div>
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

export default connect(mapStateToProps)(Profile);