import React, {useState} from 'react';
import chirperbezotoczki from '../images/chirperbezotoczki2.png';
import {Button, ChakraProvider, Input, InputGroup, InputRightElement, Select} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";

const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const history = useHistory();

    const HandleChangeEmail = (event) => {
        setEmail(event.currentTarget.value);
    };
    const HandleChangePass = (event) => {
        setPassword(event.currentTarget.value);
    };

    const Check = () => {
        if(document.getElementById('password1').value === document.getElementById('password2').value){
            console.log('password1')
            history.push('/login')
        }else{
            document.getElementById('loginBackground').style.backgroundColor = '#A51010';
            setTimeout(function () {
                document.getElementById('loginBackground').style.backgroundColor = '#0356A8';
            }, 400);
            document.getElementById('password1').style.borderColor = '#A51010';
            document.getElementById('password2').style.borderColor = '#A51010';
        }
    };

    return (
        <div id="loginBackground">
            <img className="chirperLogo" src={chirperbezotoczki} alt="chirperLogo"/>
            <form id="formSign">
                <ChakraProvider>
                    <Input id="formInput" placeholder="First Name" size="lg" />
                    <Input id="formInput" placeholder="Surname" size="lg" />
                    <Input id="formInput" placeholder="email" size="lg" onChange={HandleChangeEmail}/>
                    <InputGroup id="formInput" size="md">
                        <Input id="password1"
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
                    <Input className="formInput" id="password2"
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Repeat password"
                        onChange={HandleChangePass}
                    />
                    <Select className="formInput" id="monthOptions" variant="outline">
                    <option value="optionJanuary">January</option>
                    <option value="optionFebruary">February</option>
                    <option value="optionMarch">March</option>
                    <option value="optionApril">April</option>
                    <option value="optionMay">May</option>
                    <option value="optionJune">June</option>
                    <option value="optionJuly">July</option>
                    <option value="optionAugust">August</option>
                    <option value="optionSeptember">September</option>
                    <option value="optionOctober">October</option>
                    <option value="optionNovember">November</option>
                    <option value="optionDecember">December</option>
                    </Select>

                    <Select className="formInput" id="dayOptions" variant="outline">
                        <option value="option1">1</option>
                        <option value="option2">2</option>
                        <option value="option3">3</option>
                        <option value="option4">4</option>
                        <option value="option5">5</option>
                        <option value="option6">6</option>
                        <option value="option7">7</option>
                        <option value="option8">8</option>
                        <option value="option9">9</option>
                        <option value="option10">10</option>
                        <option value="option11">11</option>
                        <option value="option12">12</option>
                        <option value="option13">13</option>
                        <option value="option14">14</option>
                        <option value="option15">15</option>
                        <option value="option16">16</option>
                        <option value="option17">17</option>
                        <option value="option18">18</option>
                        <option value="option19">19</option>
                        <option value="option20">20</option>
                        <option value="option21">21</option>
                        <option value="option22">22</option>
                        <option value="option23">23</option>
                        <option value="option24">24</option>
                        <option value="option25">25</option>
                        <option value="option26">26</option>
                        <option value="option27">27</option>
                        <option value="option28">28</option>
                        <option value="option29">29</option>
                        <option value="option30">30</option>
                        <option value="option31">31</option>
                    </Select>

                    <Select className="formInput" id="yearOptions" variant="outline">
                        <option value="option1">1999</option>
                        <option value="option2">2000</option>
                        <option value="option2">2001</option>
                        <option value="option2">2002</option>
                        <option value="option2">2003</option>
                        <option value="option2">2004</option>
                        <option value="option2">2005</option>
                        <option value="option2">2006</option>
                        <option value="option2">2007</option>
                        <option value="option2">2008</option>
                        <option value="option2">2009</option>
                        <option value="option2">2010</option>
                    </Select>
                    <br/>
                    <Button colorScheme="blue" onClick={Check}>Create an account!</Button>
                </ChakraProvider>
            </form>
        </div>
    )
};

export default SignIn;