import React from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import SinglePost from "./singlePost";
import {decodeToken} from "react-jwt";

class App extends React.Component {

    state = {
        likes: 0,
        posts: []
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

    submit = () => {
        const payload = {
            author: decodeToken(localStorage.getItem('token')).nickname,
            content: this.state.content,
            likes: this.state.likes
        };

        axios({
            url: 'http://localhost:3001/api/feed/save',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('Data has been sent to the server');
                this.resetUserInputs();
                this.getBlogPost();
            })
            .catch(() => {
                console.log('Internal server error');
            });
    };

    resetUserInputs = () => {
        this.setState({
            likes: 0,
        });
    };

    displayBlogPost = (posts) => {
        if (!posts.length) return null;

        return posts.slice(0).reverse().map((post, index) => (
            <SinglePost key={post._id.toString()}
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
            <div id="mainPageDiv">
                <form>
                    <div className="form-input">
                        <textarea className="chirpBody"
                                  placeholder="Say something"
                                  name="content"
                                  value={this.state.content}
                                  onChange={this.handleChange}
                        >

                        </textarea>
                    </div>

                    <div className="wrapper">
                        <button className="addChirp" onClick={this.submit}>Add chirp!</button>
                    </div>

                    <svg style={{visibility: "hidden", position: "absolute", width: "0", height: "0"}}
                         xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <defs>
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                                <feColorMatrix in="blur" mode="matrix"
                                               values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"/>
                                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                            </filter>
                        </defs>
                    </svg>
                </form>

                <div className="blog-">
                    {this.displayBlogPost(this.state.posts)}
                </div>
            </div>
        )
            ;
    }
}

const mapStateToProps = state => ({
    userNickname: state.userNickname
});

export default connect(mapStateToProps)(App);
