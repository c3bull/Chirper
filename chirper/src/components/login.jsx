import {Button, ChakraProvider, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import React, {useState} from 'react';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const Validate = () => {

        if (email.trim() === '') {
            setEmail('Email is required!');
        }
        if (password.trim() === '') {
            setPassword('Password is required!');
        }

        return console.log({email});
    };

    const HandleChangeEmail = (event) => {
        setEmail(event.currentTarget.value);
    };

    const HandleChangePass = (event) => {
        setPassword(event.currentTarget.value);
    };

    return (
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
    )
};


export default Login;
