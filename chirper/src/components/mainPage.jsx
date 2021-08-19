import React from 'react';
import axios from 'axios';
import Login from "./login";
import nicknameCheck from "./login"
import {connect} from "react-redux";
class App extends React.Component {

    state = {
        author: '',
        content: '',
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


    submit = (event) => {
        this.props.dispatch({type:"GET_USER_NICKNAME"})
        event.preventDefault();
        console.log('login nickname ' + this.props.userNickname)
        const payload = {
            // author: this.state.author,
            //author: nicknameCheck,
            author: this.props.userNickname,
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
        ;
    };

    resetUserInputs = () => {
        this.setState({
            author: '',
            content: '',
            likes: 0,
        });
    };

    displayBlogPost = (posts) => {

        if (!posts.length) return null;


        return posts.slice(0).reverse().map((post, index) => (
            <div key={index} className="blog-post__display">
                <h3>{post.author}</h3>
                <p>{post.content}</p>
                <p>{post.date}</p>
                <p>{post.time}</p>
                <p>{post.likes}</p>
            </div>
        ));
    };

    render() {

        return (

            <div id="mainPageDiv">
                <form onSubmit={this.submit}>

                    {/*<div className="form-input">*/}
                    {/*    <input className="chirpAuthor"*/}
                    {/*           type="text"*/}
                    {/*           name="author"*/}
                    {/*           placeholder="Author"*/}
                    {/*           value={this.state.author}*/}
                    {/*           onChange={this.handleChange}*/}
                    {/*    />*/}
                    {/*</div>*/}

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
                        <button className="addChirp">Add chirp!</button>
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
        );
    }
}

const mapStateToProps = state =>({
    userNickname: state.userNickname
});
export default connect(mapStateToProps)(App);



// import React, {Component, useEffect, useState} from "react";
// import chirper12 from '../images/chirper12.png';
// import {Redirect} from "react-router-dom";
// import axios from "axios";
// import {Badge, Box, ChakraProvider, Image} from "@chakra-ui/react";
// import SinglePost from "./singlePost"
//
// const MainPage = (props) => {
//
//     const {items} = props;
//     const [count, setCount] = useState(0);
//     const [posts, setPosts] = useState([]);
//
//     const addPost = (data) => {
//         setPosts([...posts, {
//             author: data.author,
//             content: data.content,
//             likes: data.likes,
//         }])
//         console.log("---addPost-- data.author " + data.likes)
//     }
//
//
//     useEffect(() => {
//         // event.preventDefault();
//         setCount(0);
//         axios({
//             method: 'post',
//             url: 'http://localhost:3001/api/feed/posts',
//             data: {
//                 author: '1234@test.pl'
//             }
//         }).then((response) => {
//             {
//                 response.data.map((item) =>
//                     (
//
//                         console.log('item' + JSON.stringify(item)),
//                             addPost(item)
//                     ))
//             }
//             console.log("posts: " + JSON.stringify(posts))
//             console.log('response. data ' + JSON.stringify(response.data))
//             //setPosts(response.data);
//             //console.log('posts2  ' + JSON.stringify(posts))
//         }).catch((error) => {
//             console.log(error);
//         });
//     }, [count]);
//
//
//     return (
//         <div id="mainPageDiv">
//
//             {/*{posts.map((item) =>*/}
//             {/*    (*/}
//             {/*        <SinglePost*/}
//             {/*            author = {item.author}*/}
//             {/*            content = {item.content}*/}
//             {/*            likes = {item.likes}*/}
//             {/*        />*/}
//             {/*    ))}*/}
//
//
//             {/*<div><p>{posts === null ? 'loading' : posts}</p></div>*/}
//             {/*<div>*/}
//             {/*    {posts.map(posts => <div>{posts}</div>)}*/}
//             {/*</div>*/}
//             {/*<div>*/}
//             {/*    <p>Hello</p>*/}
//             {/*    <p>{posts2}</p>*/}
//             {/*    /!*{posts2.map((item, key) =>*!/*/}
//             {/*    /!*    (*!/*/}
//             {/*    /!*        <tr>*!/*/}
//             {/*    /!*            <td>{item.author}</td>*!/*/}
//             {/*    /!*            <td>{item.content}</td>*!/*/}
//             {/*    /!*        </tr>*!/*/}
//             {/*    /!*    ))}*!/*/}
//             {/*</div>*/}
//
//             <ChakraProvider>
//                 {/*{response.data.map((item, key) =>*/}
//                 {/*console.log('mapowanie ' + item.likes))}*/}
//
//                 {/*<Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">*/}
//                 {/*    <Image src={chirper12} alt={chirper12}/>*/}
//                 {/*    <Box p="6">*/}
//                 {/*        <Box d="flex" alignItems="baseline">*/}
//                 {/*            <Badge borderRadius="full" px="2" colorScheme="teal">*/}
//                 {/*                New*/}
//                 {/*            </Badge>*/}
//                 {/*            <Box*/}
//                 {/*                color="gray.500"*/}
//                 {/*                fontWeight="semibold"*/}
//                 {/*                letterSpacing="wide"*/}
//                 {/*                fontSize="xs"*/}
//                 {/*                textTransform="uppercase"*/}
//                 {/*                ml="2"*/}
//                 {/*            >*/}
//                 {/*                {posts.author} beds &bull; {posts.content} baths*/}
//                 {/*            </Box>*/}
//                 {/*        </Box>*/}
//
//                 {/*        <Box*/}
//                 {/*            mt="1"*/}
//                 {/*            fontWeight="semibold"*/}
//                 {/*            as="h4"*/}
//                 {/*            lineHeight="tight"*/}
//                 {/*            isTruncated*/}
//                 {/*        >*/}
//                 {/*            {posts.content}*/}
//                 {/*        </Box>*/}
//
//                 {/*        <Box>*/}
//                 {/*            {posts.content}*/}
//                 {/*            <Box as="span" color="gray.600" fontSize="sm">*/}
//                 {/*                / wk*/}
//                 {/*            </Box>*/}
//                 {/*        </Box>*/}
//
//                 {/*        <Box d="flex" mt="2" alignItems="center">*/}
//                 {/*            <Box as="span" ml="2" color="gray.600" fontSize="sm">*/}
//                 {/*                {posts.likes} reviews*/}
//                 {/*            </Box>*/}
//                 {/*        </Box>*/}
//                 {/*    </Box>*/}
//                 {/*</Box>*/}
//             </ChakraProvider>
//         </div>
//     )
// };
//
// export default MainPage;
