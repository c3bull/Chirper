import {Button, ChakraProvider, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import React, {useState} from 'react';
import "../App.css"
import chirper3 from '../images/chirper3.png';
import {useHistory} from "react-router-dom";

const axios = require('axios');
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const history = useHistory();

    const HandleChangeRoute = () => {
        history.push('/');
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
            console.log('tokeny ' + response.data.token)
            localStorage.setItem('token', response.data.token);
            HandleChangeRoute();
        }).catch((error) => {
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
        <div className="loginBackground">
            <img className="chirperLogo" src={chirper3} alt="chirperLogo"/>
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
                    <Button colorScheme="blue" type="submit">Button</Button>
                    <p>{email}</p>
                    <p>{password}</p>
                </ChakraProvider>
            </form>
        </div>
    )
};


export default Login;
