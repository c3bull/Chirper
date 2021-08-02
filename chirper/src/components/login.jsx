import {Button, ChakraProvider, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {useToast} from "@chakra-ui/react"
import React, {useState} from 'react';
import "../App.css"
import chirper3 from '../images/chirper3.png';

const axios = require('axios');
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)


    /////////////////////
    const toast = useToast()
    /////////////////////


    const Validate = () => {

        axios({
            method: 'post',
            url: 'http://localhost:3001/api/user/auth',
            data: {
                email: email,
                password: password
            }
        }).then((response) => {
            localStorage.setItem('token2', response.data.result);
            console.log(response.data.result);
            console.log('then');
        }).catch((error) => {
            console.log(error);
            console.log('catch');
        });

        if (email.trim() === '') {
            setEmail('Email is required!');
        }
        if (password.trim() === '') {
            setPassword('Password is required!');
        }

        return console.log({email});
    };

    //////////////////
    const Validate2 = () => {
        if (email.trim() === '' || password.trim() === '') {
            toast({
                title: "Błąd",
                description: "We sprawdź czy wszystko wpisałeś wariacie.",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Gituwa.",
                description: "Wszystkie dane zostały wpisane.",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }
    //////////////


    const HandleChangeEmail = (event) => {
        setEmail(event.currentTarget.value);
    };

    const HandleChangePass = (event) => {
        setPassword(event.currentTarget.value);
    };

    return (
        <div className="loginBackground">
            <img className="chirperLogo" src={chirper3}/>
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
                    <Button h="1.75rem" size="sm" onClick={(Validate2)}>Sprawdź</Button>
                </ChakraProvider>
            </form>
        </div>
    )
};


export default Login;
