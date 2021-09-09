import React from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import SingleMessage from "./singleMessage";
import {decodeToken} from "react-jwt";

class Chat extends React.Component {

    state = {
        messages: []
    };

    componentDidMount = () => {
        this.getMessage();
    };

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

    handleChange = ({target}) => {
        const {name, value} = target;
        this.setState({[name]: value});
    };

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
        ;
    };

    resetUserInputs = () => {
        this.setState({
            author: '',
            content: ''
        });
    };

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

