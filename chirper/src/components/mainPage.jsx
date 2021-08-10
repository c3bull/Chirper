import React, {Component, useEffect, useState} from "react";
import chirper12 from '../images/chirper12.png';
import {Redirect} from "react-router-dom";
import axios from "axios";
import {Badge, Box, ChakraProvider, Image} from "@chakra-ui/react";

const MainPage = () => {
    const [count, setCount] = useState(0);
    const [posts, setPosts] = useState(5);

    useEffect(() => {
        // event.preventDefault();
        setCount(1);
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/feed/posts',
            data: {
                author: '1234@test.pl'
            }
        }).then((response) => {
            setPosts(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [count]);



    return (
        <div id="mainPageDiv">

            {/*<div>*/}
            {/*    {posts.map((item, key) =>*/}
            {/*        (*/}
            {/*            <tr key={key}>*/}
            {/*                <td>{item.author}</td>*/}
            {/*                <td>{item.content}</td>*/}
            {/*                <td><img style={{width: '50px', height: '50px'}} src={item.image} alt={key}/></td>*/}
            {/*            </tr>*/}
            {/*        ))}*/}
            {/*</div>*/}

            <ChakraProvider>
                <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Image src={chirper12} alt={chirper12} />
                    <Box p="6">
                        <Box d="flex" alignItems="baseline">
                            <Badge borderRadius="full" px="2" colorScheme="teal">
                                New
                            </Badge>
                            <Box
                                color="gray.500"
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                textTransform="uppercase"
                                ml="2"
                            >
                                {posts.author} beds &bull; {posts.content} baths
                            </Box>
                        </Box>

                        <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            {posts.author}
                        </Box>

                        <Box>
                            {posts.author}
                            <Box as="span" color="gray.600" fontSize="sm">
                                / wk
                            </Box>
                        </Box>

                        <Box d="flex" mt="2" alignItems="center">
                            <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                {posts.author} reviews
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ChakraProvider>
        </div>
    )
};

export default MainPage;
