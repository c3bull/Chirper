import {Button, ChakraProvider, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import React, {useState} from 'react';
import "../App.css"
import chirper8 from '../images/chirper8.png';
import {useHistory} from "react-router-dom";

const axios = require('axios');


const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)

    const [nickname, setNickname] = useState('')

    const handleClick = () => setShow(!show)
    const history = useHistory();
    let nicknameCheck = '';

    const HandleChangeRoute = () => {
        history.push('/');
    };

    const SignInButton = () => {
        history.push('/signIn');
    };

    const GetNickname = () => {
        return nicknameCheck;
    };

    const Validate = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/user/auth',
            data: {
                email: email,
                password: password
            }
        }).then((response) => {
            nicknameCheck = response.data.user.nickname;
            setNickname(response.data.user.nickname);
            console.log('nickname ' + nicknameCheck)
            console.log('nickname  data ' + response.data.user.nickname)
            console.log('token user ' + JSON.stringify(response.data.user));
            console.log('tokeny ' + JSON.stringify(response.data.token));
            // tokenCheck = response.data.token;
            localStorage.setItem('token', response.data.token.token);
            HandleChangeRoute();


        }).catch((error) => {
            document.getElementById('loginBackground').style.backgroundColor = '#A51010';
            setTimeout(function () {
                document.getElementById('loginBackground').style.backgroundColor = '#255471';
            }, 400);
            console.log(error);
        });

        if (email.trim() === '') {
            setEmail('Email is required!');
        }
        if (password.trim() === '') {
            setPassword('Password is required!');
        }

    };


    const HandleChangeEmail = (event) => {
        setEmail(event.currentTarget.value);
    };

    const HandleChangePass = (event) => {
        setPassword(event.currentTarget.value);
    };

    return (
        <div id="loginBackground">
            <img className="chirperLogo" src={chirper8} alt="chirperLogo"/>
            <form onSubmit={Validate}>
                <ChakraProvider>
                    <Input placeholder="email" size="lg" onChange={HandleChangeEmail}/>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Enter password"
                            onChange={HandleChangePass}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <br/>
                    <Button colorScheme="blue" type="submit">Log in</Button>
                    <Button colorScheme="blue" onClick={SignInButton}>Sign in</Button>
                    <p>{email}</p>
                    <p>{password}</p>
                </ChakraProvider>
            </form>
        </div>
    )
};


export default Login;
