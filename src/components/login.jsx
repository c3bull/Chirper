import {Button, ChakraProvider, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import React, {useState} from 'react';
import "../App.css"
import chirper8 from '../images/chirper8.png';
import {useHistory} from "react-router-dom";

const axios = require('axios');

/**
 * Functional component responsible for logging in.
 * @constructor
 * @returns {JSX.Element} Returns input fields and buttons to log in and sign up.
 */
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)

    /**
     * Sets the boolean hook to an opposite value.
     */
    const handleClick = () => setShow(!show)
    const history = useHistory();

    /**
     * Uses history variable to switch to another component.
     */
    const HandleChangeRoute = () => {
        history.push('/');
    };

    /**
     * Uses history variable to switch to another component.
     */
    const SignUpButton = () => {
        history.push('/signUp');
    };

    /**
     * Uses Axios' POST method to send log in information to a server.
     * If successful sets a local storage token value and switches component.
     * If POST fails then sets background to red.
     * @param {Event} event - Action or occurrence that happen.
     */
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
            localStorage.setItem('token', response.data.token.token);
            HandleChangeRoute();
        }).catch((error) => {
            document.getElementById('loginBackground').style.backgroundColor = '#A51010';
            setTimeout(function () {
                document.getElementById('loginBackground').style.backgroundColor = '#15202b';
            }, 400);
            console.log(error);
        });

        if (email.trim() === '') {
            alert("Email jest wymagany!")
        } else if (password.trim() === '') {
            alert("Hasło jest wymagane!")
        }

    };

    /**
     * Sets hook to correct value.
     * @param {Event} event - Action or occurrence that happen.
     */
    const HandleChangeEmail = (event) => {
        setEmail(event.currentTarget.value);
    };

    /**
     * Sets hook to correct value.
     * @param {Event} event - Action or occurrence that happen.
     */
    const HandleChangePass = (event) => {
        setPassword(event.currentTarget.value);
    };

    return (
        <div id="loginBackground">
            <img className="chirperLogo" src={chirper8} alt="chirperLogo"/>
            <form onSubmit={Validate}>
                <ChakraProvider>
                    <Input id="loginInput" placeholder="Email" size="lg" onChange={HandleChangeEmail}/>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Enter password"
                            onChange={HandleChangePass}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" color="black" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <br/>
                    <Button colorScheme="blue" type="submit">Log in</Button>&nbsp;&nbsp;
                    <Button colorScheme="blue" onClick={SignUpButton}>Sign up</Button>
                </ChakraProvider>
            </form>
        </div>
    )
};



export default Login;
