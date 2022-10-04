import React, { useState, useEffect } from "react";
import { capsFirst } from "./utils";
import ReactDOM from "react-dom";
import theme from "./theme";

import {
    ChakraProvider,
    extendTheme,
    Container,
    Button,
    Text,
    Flex,
    Image,
    Center,
} from "@chakra-ui/react";

import ChakraCarousel from "./ChakraCarousel";

export default function Index({ flashcards, defaultFlashcardState }) {
    // if (defaultFlashcardState === true) {

    flashcards.forEach((e) => {
        [e.flashcardOnTerm, e.setFlashcardOnTerm] = useState(true);
    });

    // } else if (defaultFlashcardState === false) {
    //     flashcards.forEach((e) => {
    //         [e.flashcardOnTerm, e.setFlashcardOnTerm] = useState(false);
    //     });
    // } else {
    //     flashcards.forEach((e) => {
    //         [e.flashcardOnTerm, e.setFlashcardOnTerm] = useState(
    //             Math.random() < 0.5
    //         );
    //     });
    // }

    return (
        <ChakraProvider theme={extendTheme(theme)}>
            <Container
                py={8}
                px={0}
                maxW={{
                    base: "100%",
                    sm: "35rem",
                    md: "43.75rem",
                    lg: "57.5rem",
                    xl: "75rem",
                    xxl: "87.5rem",
                }}
            >
                <ChakraCarousel gap={32}>
                    {flashcards.map((e, index) => {
                        return (
                            <Flex
                                key={index}
                                boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
                                justifyContent="space-between"
                                flexDirection="column"
                                overflow="hidden"
                                color="gray.300"
                                bg="base.d100"
                                rounded={5}
                                flex={1}
                                p={5}
                                minH="222px"
                                background="black"
                            >
                                <Center>
                                    <Image
                                        // src={`https://via.placeholder.com/${
                                        //     Math.floor(Math.random() * 500) + 100
                                        // }x${
                                        //     Math.floor(Math.random() * 500) + 100
                                        // }`}
                                        objectFit="contain"
                                        maxW={"50vw"}
                                        maxH="70%"
                                        paddingTop={"0"}
                                    />
                                </Center>
                                <Text
                                    fontSize={"2xl"}
                                    w="full"
                                    align={"center"}

                                    // mt="auto"
                                    // mb="auto"
                                >
                                    {e.flashcardOnTerm ? e.term : e.definition}
                                </Text>

                                <Flex justifyContent="right">
                                    <Button
                                        onClick={() => {
                                            e.setFlashcardOnTerm(
                                                !e.flashcardOnTerm
                                            );
                                        }}
                                        colorScheme="green"
                                        backgroundColor={"white"}
                                        fontWeight="bold"
                                        color="gray.900"
                                        size="sm"
                                    >
                                        Flip
                                    </Button>
                                </Flex>
                            </Flex>
                        );
                    })}
                </ChakraCarousel>
            </Container>
        </ChakraProvider>
    );
}
