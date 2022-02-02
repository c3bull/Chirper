import React from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import SingleMessage from "./singleMessage";
import {decodeToken} from "react-jwt";

/**
 * Class component responsible for showing chat on the website
 * @returns {JSX.Element} Returns chat messages and a text area with a button to send a new message.
 */
class Chat extends React.Component {

    state = {
        messages: []
    };

    /**
     * Calls getMessage function after the component has been mounted.
     */
    componentDidMount = () => {
        this.getMessage();
    };


    /**
     * Uses Axios' GET method to get chat messages from the database.
     * Sends the response data to correct state or alerts the user if Axios fails.
     */
    getMessage = () => {
        axios.get('http://localhost:3001/api/feed/chat')
            .then((response) => {
                const data = response.data;
                this.setState({messages: data});
            })
            .catch(() => {
                alert('Error retrieving data!');
            });
    }

    /**
     * Adds the user inserted value to a correct state.
     */
    handleChange = ({target}) => {
        const {name, value} = target;
        this.setState({[name]: value});
    };

    /**
     * Uses Axios' POST method to send a payload that contains a new message to a server.
     * Payload contains message and its author's nickname.
     * Resets states after successful Axios post and prints the message in the chat.
     * @param {Event} event - Action or occurrence that happen.
     */
    submit = (event) => {
        event.preventDefault();
        const payload = {
            author: decodeToken(localStorage.getItem('token')).nickname,
            content: this.state.content
        };

        axios({
            url: 'http://localhost:3001/api/feed/send',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('Data has been sent to the server');
                this.resetUserInputs();
                this.getMessage();
            })
            .catch(() => {
                console.log('Internal server error');
            });
    };

    /**
     * Resets states after message has been sent to a database
     */
    resetUserInputs = () => {
        this.setState({
            author: '',
            content: ''
        });
    };


    /**
     * Prints messages in the chat in the reversed order, which causes newest messages to be on the bottom.
     * @param messages array of messages that are going to be displayed
     * @returns {ReactDOM} Returns map of component SingleMessage if messages given in the parameter are not empty
     */
    displayMessages = (messages) => {

        if (!messages.length) return null;

        return messages.slice(0).reverse().map((message) => (
            <SingleMessage
                key={message._id.toString()}
                author={message.author}
                content={message.content}
                time={message.time}
            />
        ));
    };

    render() {
        return (
            <div id="ChatDiv">
                <form onSubmit={this.submit}>
                    <div className="blogMessage">
                        {this.displayMessages(this.state.messages)}
                    </div>
                    <div className="form-input">
                        <div className="sendMessage">
                            <textarea className="messageArea"
                                      placeholder="Aa"
                                      name="content"
                                      value={this.state.content}
                                      onChange={this.handleChange}
                            >
                            </textarea>
                            <button className="sendMessageButton"></button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userNickname: state.userNickname
});
export default connect(mapStateToProps)(Chat);

